import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import {RouterModule} from "@angular/router";
import {PanelRoutingModule} from "./panel-routing.module";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {StepsModule} from "primeng/steps";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PanelRoutingModule,
        CardModule,
        ButtonModule,
        RippleModule,
        StepsModule
    ],
    declarations: [
        PanelComponent
    ],
})
export class PanelModule { }
