import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {inputErrorAnimation} from "../../../../../../service/animation.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../../../../../service/project.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    animations: [inputErrorAnimation()]
})
export class DetailsComponent implements OnInit {

    detailsForm!: any;
    detailsInformation: any;

    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {

        if (this.detailsForm.touched || this.detailsForm.dirty) {
            return false;
        }

        return !this.detailsForm.controls.name.value;

    }

    constructor(private router: Router, private fb: FormBuilder, public projectService: ProjectService) { }

    ngOnInit(): void {

        this.detailsInformation = this.projectService.getProjectInformation().detailsInformation;

        const { name } = this.detailsInformation;

        this.detailsForm = this.fb.group({
            name: new FormControl(name, [
                Validators.required
            ])
        });

    }

    nextPage() {

        if (this.detailsForm.valid) {
            this.projectService.projectInformation.detailsInformation = this.detailsForm.value;
            this.router.navigate(['/panel/project/new/settings']);
        }
    }

}
