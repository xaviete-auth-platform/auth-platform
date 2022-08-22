import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {isAuthenticated} from "../../../service/auth.service";
import {getOwnerProjects} from "../../../service/owner.service";
import { HttpStatusCode as code } from "../../../config/status";
import {Project} from "../../../interfaces/Project";

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {

    ownerProjects!: Array<Project>;

    constructor(public router: Router) { }

    async ngOnInit(): Promise<void> {

        if (!isAuthenticated()) {
            this.router.navigate(['/login']);
        }

        const response = await getOwnerProjects();

        // Handle response
        // TODO: Pensar como hacerlo mejor como mostramos los errores en caso de que falle algo
        if (response.status !== code.OK) {
            return;
        }

        // Set projects
        this.ownerProjects = response.projects;

    }

}
