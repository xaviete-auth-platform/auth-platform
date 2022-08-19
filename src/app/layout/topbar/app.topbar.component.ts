import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import {Router} from "@angular/router";
import {logout} from "../../service/auth.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    constructor(public layoutService: LayoutService, private router: Router) { }

    ngOnInit() {

        this.items = [{
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    styleClass: 'logout-button',
                    command: () => {
                        this.logout();
                    }
                }
            ]},
        ];

    }

    logout(): void {
        logout();
        this.router.navigate(['/auth/login']);
    }
}
