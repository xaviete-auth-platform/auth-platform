import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiComponent } from "./api.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ApiComponent }
    ])],
    exports: [RouterModule]
})
export class ApiRoutingModule { }
