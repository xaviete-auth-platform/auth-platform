import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import {PersonalComponent} from "./personal/personal.component";
import {EmailComponent} from "./email/email.component";
import {PasswordComponent} from "./password/password.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisterComponent, children: [
                { path:'', redirectTo: 'personal', pathMatch: 'full'},
                { path: 'personal', component: PersonalComponent },
                { path: 'email', component: EmailComponent },
                { path: 'password', component: PasswordComponent}
            ] }
    ])],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
