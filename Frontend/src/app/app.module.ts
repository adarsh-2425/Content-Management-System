import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service'
import { UsersService } from './services/users.service';
import { ContentService } from './services/content.service';
import { AuthGuard } from './services/auth.guard';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminManageComponent } from './components/admin-manage/admin-manage.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PostcontentComponent } from './components/postcontent/postcontent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    AdminManageComponent,
    EditUserComponent,
    PostcontentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 1500,
      closeButton: true,
  
    }),
  ],
  providers: [
    ValidateService,
    AuthGuard,
    AuthService,
    UsersService,
    ContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
