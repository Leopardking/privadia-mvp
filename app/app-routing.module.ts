import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'signup', loadChildren: 'app/signup/signup.module#SignupModule' },
    { path: 'not-found', loadChildren: 'app/not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
