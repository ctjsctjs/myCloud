import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { NewsComponent } from './news/news.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkListComponent } from './bookmarks/bookmark-list/bookmark-list.component';
import { BookmarkCreateComponent } from './bookmarks/bookmark-create/bookmark-create.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    SidenavComponent,
    TasksComponent,
    TaskCreateComponent,
    TaskListComponent,
    NewsComponent,
    BookmarksComponent,
    BookmarkListComponent,
    BookmarkCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
