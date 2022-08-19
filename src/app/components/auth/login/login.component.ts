import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {login} from "../../../service/login.service";
import { HttpStatusCode as code } from "../../../config/status";
import {Router} from "@angular/router";
import {isAuthenticated} from "../../../service/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    loginForm = this.fb.group({
        email: new FormControl(null, [
            Validators.required,
            Validators.email
        ]),
        password: new FormControl(null, [
            Validators.required
        ]),
        remember: new FormControl(null)
    });

    responseError!: string;

    ngOnInit(): void {

        if (isAuthenticated()) {
            this.router.navigate(['/']);
        }

    }

    async handleSubmit(): Promise<void> {

        if (!this.loginForm.valid) {
            return;
        }

        const response = await login(this.loginForm.value);

        // Show response error
        if (response.status !== code.OK) {
            this.responseError = response.message;
            return;
        }

        // Redirect to home page
        this.router.navigate(['/']);
    }


}
