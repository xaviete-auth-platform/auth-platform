import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RegisterService} from "../../../../service/register.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {

    passwordInformation: any;
    passwordForm: any;

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return false;
    }

    constructor(private router: Router, private fb: FormBuilder, public registerService: RegisterService) {}

    ngOnInit(): void {

        if (this.registerService.validatePasswordInformationStep()) {
            this.router.navigate(['/auth/register/email']);
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

    async completeRegistration() {

        if (this.passwordForm.valid) {

            this.registerService.userInformation.passwordInformation = this.passwordForm.value;

            // TODO: Complete registration validation
            const response = await this.registerService.saveUser();

            console.log("Complete registration");

            console.log(this.registerService.userInformation);


        }


    }

}
