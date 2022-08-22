import {Component, HostListener, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RegisterService} from "../../../../service/register.service";
import {Observable} from "rxjs";
import {inputErrorAnimation} from "../../../../service/animation.service";
import { HttpStatusCode as code } from "../../../../config/status";
import {setUser} from "../../../../service/auth.service";

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    animations: [inputErrorAnimation()]
})
export class PasswordComponent implements OnInit {

    passwordInformation: any;
    passwordForm: any;

    progressValue!: number;
    progressLabel: string = 'Weak';

    passwordStrength = [
        { icon: 'pi-times-circle', class: 'red', text: 'At least one lowercase', regex: "(.*[a-z].*)", valid: false  },
        { icon: 'pi-times-circle', class: 'red', text: 'At least one uppercase or one number', regex: "(?=.*\\d)|(?=.*[A-Z])", valid: false },
        { icon: 'pi-times-circle', class: 'red', text: 'Minimum 6 characters', regex: "(.{6,})", valid: false }
    ];

    backendResponse: boolean = false;
    backendResponseMessage: string = '';

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return false;
    }

    constructor(private router: Router, private fb: FormBuilder, public registerService: RegisterService) {}

    ngOnInit(): void {

        if (this.registerService.validatePasswordInformationStep()) {
            this.router.navigate(['/register/email']);
            return;
        }

        this.passwordInformation = this.registerService.getUserInformation().passwordInformation;

        const { password } = this.passwordInformation;

        this.passwordForm = this.fb.group({
            password: new FormControl(password, [
                Validators.required
            ])
        });

    }

    validatePasswordStrength() {

        const { password } = this.passwordForm.value;

        let counter = 0;

        for (let i = 0; i < this.passwordStrength.length; i++) {

            const { regex } = this.passwordStrength[i];

            if (password.match(regex)) {
                this.passwordStrength[i].icon = 'pi-check';
                this.passwordStrength[i].class = 'green';
                this.passwordStrength[i].valid = true;
                counter++;
            } else {
                this.passwordStrength[i].icon = 'pi-times-circle';
                this.passwordStrength[i].class = 'red';
                this.passwordStrength[i].valid = false;
            }
        }

        this.progressValue = (counter / this.passwordStrength.length) * 100;

        if (this.progressValue >= 67) {
            this.changeProgressColor('#00a65a');
            this.progressLabel = 'Strong';
        } else if (this.progressValue >= 34) {
            this.changeProgressColor('#f39c12');
            this.progressLabel = 'Medium';
        } else {
            this.changeProgressColor('#e24c4c');
            this.progressLabel = 'Weak';
        }

    }

    async completeRegistration() {

        if (this.passwordForm.valid) {

            this.registerService.userInformation.passwordInformation = this.passwordForm.value;

            const response = await this.registerService.saveUser();

            if (response.status !== code.CREATED) {

                this.backendResponse = true;
                this.backendResponseMessage = response.message;
                return;
            }

            this.backendResponse = false;
            this.backendResponseMessage = '';

            // Auto login user
            await setUser(response.user);

            this.router.navigate(['/panel']);

        }
    }

    validateRegex() {
        const { password } = this.passwordForm.value;
        return !(password.match("(.*[a-z].*)") && password.match("(?=.*\\d)|(?=.*[A-Z])") && password.match("(.{6,})"));
    }

    changeProgressColor(color: string) {

    }

}
