import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    project_id!: string;

    constructor(public layoutService: LayoutService, private route: ActivatedRoute) { }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.project_id = params['id'];
        });

        this.model = [
            {
                label: 'Project',
                items: [
                    { label: 'Project 1', routerLink: ['/'] }
                ]
            },
            {
                label: 'Menu',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/' + this.project_id] },
                    { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['users'] },
                    { label: 'API', icon: 'pi pi-fw pi-key', routerLink: ['api'] },
                    { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['settings'] }
                ]
            }
        ];
    }
}
