import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NewProjectComponent} from "./new-project.component";
import {DetailsComponent} from "./details/details.component";
import {SettingsComponent} from "./settings/settings.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: NewProjectComponent, children: [
                { path: '', redirectTo: 'details', pathMatch: 'full'},
                { path: 'details', component: DetailsComponent },
                { path: 'settings', component: SettingsComponent },
                { path: 'confirmation', component: ConfirmationComponent }
            ]}
    ])],
    exports: [RouterModule]
})
export class NewProjectRoutingModule { }
