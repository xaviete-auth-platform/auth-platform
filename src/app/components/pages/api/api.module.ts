import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ChipModule} from "primeng/chip";
import {ApiRoutingModule} from "./api-routing.module";

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        ChipModule,
        ApiRoutingModule
    ],
    declarations: [ApiComponent]
})
export class ApiModule { }
