import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-new-projects',
    templateUrl: './new-projects.component.html'
})
export class NewProjectComponent implements OnInit {

    steps!: MenuItem[];

    constructor() { }

    ngOnInit(): void {

        this.steps = [
            {
                label: 'Details',
                routerLink: 'details'
            },
            {
                label: 'Settings',
                routerLink: 'settings'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];

    }

}
