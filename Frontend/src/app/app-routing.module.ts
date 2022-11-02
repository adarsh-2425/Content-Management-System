import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManageComponent } from './components/admin-manage/admin-manage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostcontentComponent } from './components/postcontent/postcontent.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateComponent } from './components/update/update.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
import { ViewComponent } from './components/view/view.component';
import { EdituserComponent } from './components/edituser/edituser.component';

const routes: Routes = [
  {
    path : '', component : HomeComponent
  },
  {
    path : 'register', component : RegisterComponent
  },
  {
    path : 'login', component : LoginComponent
  },
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
  {
  path : 'adminManage', 
  canActivate: [AuthGuard],
  component : AdminManageComponent
  },
  {
  path : 'postcontent', 
  canActivate: [AuthGuard],
  component : PostcontentComponent
  },
  {
    path : 'updatecontent',
    canActivate: [AuthGuard],
    component : UpdateComponent
  },
  
  {
    path : 'viewcontent',
    component : ViewComponent
  },
  {
    path : 'category',
    // Protecting routes with multiple AuthGuard conditions
    // https://codecraft.tv/courses/angular/routing/router-guards/
    canActivate: [AuthGuard, AdminGuard],
    component : CategoryComponent
  },
  {
    path: 'edituser',
    canActivate : [AuthGuard],
    component : EdituserComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
