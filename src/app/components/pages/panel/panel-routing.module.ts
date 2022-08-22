import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {PanelComponent} from "./panel.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PanelComponent },
        { path: 'project/new', loadChildren: () => import('./project/new-projects/new-project.module').then(m => m.NewProjectModule) },
    ])],
    exports: [RouterModule]
})
export class PanelRoutingModule { }
