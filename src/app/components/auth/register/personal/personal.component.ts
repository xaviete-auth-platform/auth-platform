import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../../../../service/register.service";
import {inputErrorAnimation} from "../../../../service/animation.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    animations: [inputErrorAnimation()]
})
export class PersonalComponent implements OnInit {

    personalInformation: any;
    personalForm: any;

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {

        if (this.personalForm.touched || this.personalForm.dirty) {
            return false;
        }

        return !(this.personalForm.personalInformation.firstname ||
            this.personalForm.personalInformation.lastname ||
            this.personalForm.personalInformation.username);

    }

    constructor(private router: Router, private fb: FormBuilder, public registerService: RegisterService) {}

    ngOnInit(): void {

        this.personalInformation = this.registerService.getUserInformation().personalInformation;

        const { firstname, lastname, username } = this.personalInformation;

        this.personalForm = this.fb.group({
            firstname: new FormControl(firstname, [
                Validators.required
            ]),
            lastname: new FormControl(lastname, [
                Validators.required
            ]),
            username: new FormControl(username, [
                Validators.required
            ])
        });

    }

    nextPage() {

        if (this.personalForm.valid) {

            this.registerService.userInformation.personalInformation = this.personalForm.value;
            this.router.navigate(['/register/email']);

        }
    }

}
