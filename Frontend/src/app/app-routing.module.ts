import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {
    path : 'dashboard',
    canActivate: [AuthGuard],
    component : DashboardComponent
  },
  {
  path : 'profile', 
  canActivate: [AuthGuard],
  component : ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
