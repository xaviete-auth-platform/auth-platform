import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { AppDashboardLayoutComponent } from "./layout/layout/dashboard/app-dashboard-layout.component";
import {LandingComponent} from "./components/pages/landing/landing.component";
import {AppPanelLayoutComponent} from "./layout/layout/panel/app-panel-layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'panel', component: AppPanelLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./components/pages/panel/panel.module').then(m => m.PanelModule) },
                ],
            },
            {
                path: 'dashboard/:id', component: AppDashboardLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./components/pages/dashboard/homepage/dashboard.module').then(m => m.DashboardModule) },
                    { path: '', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'uikit', loadChildren: () => import('./components/uikit/uikit.module').then(m => m.UikitModule) }
                ],
            },
            { path: '', component: LandingComponent },
            { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
