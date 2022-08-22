import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ProjectService} from "../../../../../../service/project.service";
import {HttpStatusCode as code} from "../../../../../../config/status";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

    settingsForm!: any;
    settingsInformation: any;

    backendResponse: boolean = false;
    backendResponseMessage: string = '';

    constructor(private router: Router, private fb: FormBuilder, public projectService: ProjectService) { }

    ngOnInit(): void {

        this.settingsInformation = this.projectService.getProjectInformation().settingsInformation;
        this.settingsForm = this.fb.group({});

    }

    async nextPage() {

        if (this.settingsForm.valid) {
            this.projectService.projectInformation.settingsInformation = this.settingsForm.value;

            const response = await this.projectService.saveProject();

            if (response.status !== code.CREATED) {
                this.backendResponse = true;
                this.backendResponseMessage = response.message;
                return;
            }

            this.backendResponse = false;
            this.backendResponseMessage = '';

            this.router.navigate(['/panel/project/new/confirmation']);
        }

    }

}
