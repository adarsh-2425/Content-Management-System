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
import { CategoryService } from './services/category.service';
import { AuthGuard } from './services/auth.guard';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminManageComponent } from './components/admin-manage/admin-manage.component';
import { PostcontentComponent } from './components/postcontent/postcontent.component';
import { UpdateComponent } from './components/update/update.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryupdateComponent } from './dialogs/categoryupdate/categoryupdate.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { FooterComponent } from './components/footer/footer.component';
import { PromoteDialogComponent } from './dialogs/promote-dialog/promote-dialog.component';
import { ViewComponent } from './components/view/view.component';
import { DeleteuserDialogComponent } from './dialogs/deleteuser-dialog/deleteuser-dialog.component';
import { EdituserComponent } from './components/edituser/edituser.component';

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
    PostcontentComponent,
    UpdateComponent,
    CategoryComponent,
    CategoryupdateComponent,
    FooterComponent,
    PromoteDialogComponent,
    ViewComponent,
    DeleteuserDialogComponent,
    EdituserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true,
      "positionClass": "toast-top-center",
      timeOut: 1500,
      closeButton: true,
  
    }),
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule
  ],
  providers: [
    ValidateService,
    AuthGuard,
    AuthService,
    UsersService,
    ContentService,
    CategoryService,
    CategoryupdateComponent,
    PromoteDialogComponent,
    DeleteuserDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
