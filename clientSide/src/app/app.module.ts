import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChildren } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatNativeDateModule,
  MatSelectModule,
  MatListModule,
  MatDialogModule,
  MatTableModule,
  MatSliderModule,
  MatGridListModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTechnologyComponent } from './components/admin/admin-technology/admin-technology.component';
import { AdminStudentComponent } from './components/admin/admin-student/admin-student.component';
import { AdminMentorComponent } from './components/admin/admin-mentor/admin-mentor.component';
import { AdminDialogCreateTechComponent } from './components/admin/admin-dialog-create-tech/admin-dialog-create-tech.component';
import { EditTechDialogComponent } from './components/admin/edit-tech-dialog/edit-tech-dialog.component';
import { MentorDashboardComponent } from './components/mentor/mentor-dashboard/mentor-dashboard.component';
import { ListTechnologiesComponent } from './components/mentor/list-technologies/list-technologies.component';
import { DialogCreateCourseComponent } from './components/mentor/dialog-create-course/dialog-create-course.component';
import { ListCoursesComponent } from './components/mentor/list-courses/list-courses.component';
import { ListCoursesStudentComponent } from './components/student/list-courses-student/list-courses-student.component';
import { MentorNotificationsComponent } from './components/mentor/mentor-notifications/mentor-notifications.component';
import { OngoingTrainingsMentorComponent } from './components/mentor/ongoing-trainings-mentor/ongoing-trainings-mentor.component';
import { CompletedTrainingsMentorComponent } from './components/mentor/completed-trainings-mentor/completed-trainings-mentor.component';
import { OngoingCoursesStudentComponent } from './components/student/ongoing-courses-student/ongoing-courses-student.component';
import { CompletedCoursesStudentComponent } from './components/student/completed-courses-student/completed-courses-student.component';
import { PaymentDialogComponent } from './components/student/payment-dialog/payment-dialog.component';
import { StudentNotificationComponent } from './components/student/student-notification/student-notification.component';
import { StudentPaymentsHistoryComponent } from './components/student/student-payments-history/student-payments-history.component';
import { MentorPaymentsHistoryComponent } from './components/mentor/mentor-payments-history/mentor-payments-history.component';
import { TokenAuthInterceptorService } from './services/token-auth-interceptor.service';
import { MentorProfileComponent } from './components/mentor/mentor-profile/mentor-profile.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    StudentDashboardComponent,
    AdminDashboardComponent,
    AdminTechnologyComponent,
    AdminStudentComponent,
    AdminMentorComponent,
    AdminDialogCreateTechComponent,
    EditTechDialogComponent,
    MentorDashboardComponent,
    ListTechnologiesComponent,
    DialogCreateCourseComponent,
    ListCoursesComponent,
    ListCoursesStudentComponent,
    MentorNotificationsComponent,
    OngoingTrainingsMentorComponent,
    CompletedTrainingsMentorComponent,
    OngoingCoursesStudentComponent,
    CompletedCoursesStudentComponent,
    PaymentDialogComponent,
    StudentNotificationComponent,
    StudentPaymentsHistoryComponent,
    MentorPaymentsHistoryComponent,
    MentorProfileComponent,
    StudentProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatGridListModule,
    MatSliderModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenAuthInterceptorService, multi: true },
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditTechDialogComponent]
})
export class AppModule { }

