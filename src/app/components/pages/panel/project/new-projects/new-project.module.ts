import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailsComponent} from "./details/details.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {SettingsComponent} from "./settings/settings.component";
import {NewProjectComponent} from "./new-project.component";
import {StepsModule} from "primeng/steps";
import {NewProjectRoutingModule} from "./new-project-routing.module";
import {DividerModule} from "primeng/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ProjectService} from "../../../../../service/project.service";

@NgModule({
    declarations: [
        NewProjectComponent,
        DetailsComponent,
        SettingsComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        StepsModule,
        NewProjectRoutingModule,
        DividerModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        InputTextModule
    ],
    providers: [ProjectService]
})
export class NewProjectModule { }
