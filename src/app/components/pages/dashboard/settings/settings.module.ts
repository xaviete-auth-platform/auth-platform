import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {ChipModule} from "primeng/chip";
import {SettingsRoutingModule} from "./settings-routing.module";
import {InplaceModule} from "primeng/inplace";
import {RippleModule} from "primeng/ripple";

@NgModule({
    imports: [
        CommonModule,
        ChipModule,
        SettingsRoutingModule,
        InplaceModule,
        RippleModule
    ],
    declarations: [SettingsComponent]
})
export class SettingsModule { }
