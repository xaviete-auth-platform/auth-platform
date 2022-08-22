import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'users', loadChildren: () => import('./dashboard/users/users.module').then(m => m.UsersModule) },
        { path: 'settings', loadChildren: () => import('./dashboard/settings/settings.module').then(m => m.SettingsModule) },
        { path: 'api', loadChildren: () => import('./dashboard/api/api.module').then(m => m.ApiModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
