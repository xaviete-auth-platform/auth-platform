import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {RippleModule} from "primeng/ripple";
import {StepsModule} from "primeng/steps";
import {DividerModule} from "primeng/divider";
import { PersonalComponent } from './personal/personal.component';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';
import {RegisterService} from "../../../service/register.service";
import {ProgressBarModule} from "primeng/progressbar";

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        RippleModule,
        StepsModule,
        DividerModule,
        ReactiveFormsModule,
        ProgressBarModule
    ],
    declarations: [
        RegisterComponent,
        PersonalComponent,
        EmailComponent,
        PasswordComponent
    ],
    providers: [
        RegisterService
    ]
})
export class RegisterModule { }
