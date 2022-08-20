import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    steps!: MenuItem[];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {

        this.steps = [
            {
                label: 'Personal',
                routerLink: 'personal'
            },
            {
                label: 'Email',
                routerLink: 'email'
            },
            {
                label: 'Password',
                routerLink: 'password'
            }
        ];

    }
}
