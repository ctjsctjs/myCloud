import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Authguard } from './auth/auth.guard';
import { HomeRedirect } from './home/home.redirect';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [HomeRedirect] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [Authguard] },
    { path: 'create', component: PostCreateComponent, canActivate: [Authguard] },
    { path: 'edit/:postId', component: PostCreateComponent, canActivate: [Authguard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [Authguard, HomeRedirect]
})
export class AppRoutingModule {}
