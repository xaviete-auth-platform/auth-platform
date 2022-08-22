import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/layout/app.layout.module';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { ProductService } from './service/product.service';
import { CountryService } from './service/country.service';
import { CustomerService } from './service/customer.service';
import { EventService } from './service/event.service';
import { IconService } from './service/icon.service';
import { NodeService } from './service/node.service';
import { PhotoService } from './service/photo.service';
import {LandingComponent} from "./components/pages/landing/landing.component";
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, LandingComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        RippleModule,
        StyleClassModule,
        DividerModule,
        ButtonModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
