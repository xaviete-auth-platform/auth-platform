import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RegisterService} from "../../../../service/register.service";
import { HttpStatusCode as code } from "../../../../config/status";
import {inputErrorAnimation} from "../../../../service/animation.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    animations: [inputErrorAnimation()]
})
export class EmailComponent implements OnInit {

    emailInformation: any;
    emailForm: any;
    userEmail!: string;

    verificationCodeForm: any;
    verifyValidation: boolean = false;
    verifyValidationMessage!: string;

    verifyCodeValidation: boolean = false;
    verifyCodeMessage!: string;

    emailSent: boolean = false;

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return false;
    }

    constructor(private router: Router, private fb: FormBuilder, public registerService: RegisterService) {}

    ngOnInit(): void {

        if (this.registerService.validateEmailInformationStep()) {
            this.router.navigate(['/auth/register/personal']);
            return;
        }

        this.emailInformation = this.registerService.getUserInformation().emailInformation;

        const { email } = this.emailInformation;

        this.emailForm = this.fb.group({
            email: new FormControl(email, [
                Validators.required,
                Validators.email
            ])
        });

        this.verificationCodeForm = this.fb.group({
            code: new FormControl('', [
                Validators.required
            ]),
        });

    }

    verifyEmail() {

        const emailControl = this.emailForm.controls.email;

        if (!emailControl.value) {

            this.verifyValidation = true;
            this.verifyValidationMessage = 'Email is required';

            setInterval(() => {
                this.verifyValidation = false;
                this.verifyValidationMessage = '';
            }, 5000);

            return;
        }

        // Show error message if email is not valid
        if (emailControl.invalid) {
            console.log('Email is not valid');

            this.verifyValidation = true;
            this.verifyValidationMessage = 'Email is invalid';

            setInterval(() => {
                this.verifyValidation = false;
                this.verifyValidationMessage = '';
            }, 5000);

            return;
        }

        const { email } = this.emailForm.value;

        this.registerService.validateEmail(email)
            .then(response => {

                if (response.status !== code.OK) {
                    this.verifyValidation = true;
                    this.verifyValidationMessage = response.message;
                    return;
                }

                if (this.verifyValidation) {
                    this.verifyValidation = false;
                    this.verifyValidationMessage = '';
                }

                // Display verification code form
                this.emailSent = true;
                this.userEmail = this.emailForm.controls.email.value;

            })
            .catch(error => {
                this.verifyValidation = true;
                this.verifyValidationMessage = error.message;
            });

    }

    async validateVerificationCode() {

        const {code} = this.verificationCodeForm.value;
        const {email} = this.emailForm.value;

        const response = await this.registerService.verifyCode(code, email);
        return response.status === 200;

    }

    async nextPage() {

        if (this.emailForm.valid && this.verificationCodeForm.valid) {

            if (!await this.validateVerificationCode()) {

                this.verifyCodeValidation = true;
                this.verifyCodeMessage = 'Verification code is invalid. Try again or send another code.';

                setInterval(() => {
                    this.verifyCodeValidation = false;
                    this.verifyCodeMessage = '';
                } , 5000);

                return;

            }

            // Hide validation code error message
            this.verifyCodeValidation = false;
            this.verifyCodeMessage = '';

            this.registerService.userInformation.emailInformation = this.emailForm.value;
            console.log(this.registerService.userInformation);
            this.router.navigate(['/auth/register/password']);

        }
    }

}
