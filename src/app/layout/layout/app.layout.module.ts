import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from '../menu/app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from '../topbar/app.topbar.component';
import { AppFooterComponent } from '../footer/app.footer.component';
import { AppConfigModule } from '../config/config.module';
import { AppSidebarComponent } from "../sidebar/app.sidebar.component";
import { AppDashboardLayoutComponent } from "./dashboard/app-dashboard-layout.component";
import {SplitButtonModule} from "primeng/splitbutton";
import {MenuModule} from "primeng/menu";
import {AppPanelLayoutComponent} from "./panel/app-panel-layout.component";

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppDashboardLayoutComponent,
        AppPanelLayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        SplitButtonModule,
        MenuModule
    ],
    exports: [AppDashboardLayoutComponent, AppPanelLayoutComponent]
})
export class AppLayoutModule { }
