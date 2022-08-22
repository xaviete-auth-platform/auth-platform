import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {

    constructor(public router: Router) { }

    ngOnInit(): void {
    }

}
