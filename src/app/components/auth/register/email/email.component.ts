import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RegisterService} from "../../../../service/register.service";
import { HttpStatusCode as code } from "../../../../config/status";
import {inputErrorAnimation} from "../../../../service/animation.service";
import {Observable} from "rxjs";
import {CountdownComponent, CountdownConfig} from "ngx-countdown";

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    animations: [inputErrorAnimation()]
})
export class EmailComponent implements OnInit {

    @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;

    emailInformation: any;
    emailForm: any;
    emailVerified: boolean = false;
    userEmail!: string;

    verificationCodeForm: any;
    verifyValidation: boolean = false;
    verifyValidationMessage!: string;

    verifyCodeValidation: boolean = false;
    verifyCodeMessage!: string;

    verifyCodeForm: boolean = false;

    disableResendLink: boolean = true;
    resendLinkClass: string = 'disabled-link';

    successMessage: boolean = false;

    config: CountdownConfig = {
        leftTime: 120,
        format: 'mm:ss',
        prettyText: (text) => {

            const minutes = parseInt(text.split(':')[0]);
            const seconds = parseInt(text.split(':')[1]);
            let singleMinute, singleSecond;

            minutes == 1 ? singleMinute = true : singleMinute = false;
            seconds == 1 ? singleSecond = true : singleSecond = false;

            if (minutes === 0 && seconds === 0) {
                this.disableResendLink = false;
                return `.`;
            }
            if (minutes === 0) { return ` in ${seconds} ${singleSecond ? 'second' : 'seconds'}.`; }
            return ` in ${minutes} ${singleMinute ? 'minute' : 'minutes'} and ${seconds} ${singleSecond ? 'second' : 'seconds'}.`;

        },
    };

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return false;
    }

    constructor(private router: Router, private fb: FormBuilder, public registerService: RegisterService) {}

    ngOnInit(): void {

        if (this.registerService.validateEmailInformationStep()) {
            this.router.navigate(['/register/personal']);
            return;
        }

        this.emailInformation = this.registerService.getUserInformation().emailInformation;

        const { email } = this.emailInformation;

        // Create email form
        this.emailForm = this.fb.group({
            email: new FormControl(email, [
                Validators.required,
                Validators.email
            ])
        });

        // Disable email field if email is already saved
        if (email) {
            this.emailForm.controls.email.disable();
            this.successMessage = true;
            this.emailVerified = true;
        }

        this.verificationCodeForm = this.fb.group({
            code: new FormControl('', [
                Validators.required
            ]),
        });

    }

    verifyEmail() {

        // Disable resend link
        if (this.disableResendLink) { return; }
        this.disableResendLink = true;
        this.resendLinkClass = 'disabled-link';

        const { email } = this.emailForm.value;

        this.registerService.validateEmail(email)
            .then(response => {

                if (response.status !== code.OK) {

                    // Show request error message
                    this.verifyValidation = true;
                    this.verifyValidationMessage = response.message;

                    // Enable resend link
                    this.disableResendLink = false;
                    this.resendLinkClass = '';

                    return;
                }

                // Hide request error message if any
                if (this.verifyValidation) {
                    this.verifyValidation = false;
                    this.verifyValidationMessage = '';
                }

                // Display verification code form
                this.verifyCodeForm = true;

                // Restart countdown
                if (this.countdown) {
                    this.countdown.restart();
                }

                // Store user email
                this.userEmail = this.emailForm.controls.email.value;

            })
            .catch(error => {
                this.verifyValidation = true;
                this.verifyValidationMessage = error.message;
            });

    }

    async validateVerificationCode() {

        const { code } = this.verificationCodeForm.value;
        const { email } = this.emailForm.value;

        const response = await this.registerService.verifyCode(code, email);
        return response.status === 200;

    }

    disableVerification() {

        const emailControl = this.emailForm.controls.email;

        if (emailControl.value && emailControl.valid && !this.verifyCodeForm) {

            this.disableResendLink = false;
            this.resendLinkClass = '';
            return;

        }

        this.disableResendLink = true;
        this.resendLinkClass = 'disabled-link';

    }

    async nextPage() {

        if (this.emailVerified) {
            // Redirect to the next step
            this.router.navigate(['/register/password']);
        }

        if (this.emailForm.valid && this.verificationCodeForm.valid) {

            if (!await this.validateVerificationCode()) {

                this.verifyCodeValidation = true;
                this.verifyCodeMessage = 'Verification code is invalid. Try again or send another code.';

                setInterval(() => {
                    this.verifyCodeValidation = false;
                    this.verifyCodeMessage = '';
                },5000);

                return;
            }

            // Hide validation code error message
            this.verifyCodeValidation = false;
            this.verifyCodeMessage = '';

            this.registerService.userInformation.emailInformation = this.emailForm.value;

            // Disable input fields and show success message
            this.emailForm.controls.email.disable();
            this.disableResendLink = true;
            this.verifyCodeForm = false;
            this.successMessage = true;
            this.emailVerified = true;

            // Redirect to the next step
            this.router.navigate(['/register/password']);
        }
    }

}
