import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTechnologyComponent } from './components/admin/admin-technology/admin-technology.component';
import { AdminDialogCreateTechComponent } from './components/admin/admin-dialog-create-tech/admin-dialog-create-tech.component';
import { AdminStudentComponent } from './components/admin/admin-student/admin-student.component';
import { AdminMentorComponent } from './components/admin/admin-mentor/admin-mentor.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditTechDialogComponent } from './components/admin/edit-tech-dialog/edit-tech-dialog.component';
import { MentorDashboardComponent } from './components/mentor/mentor-dashboard/mentor-dashboard.component';
import { ListTechnologiesComponent } from './components/mentor/list-technologies/list-technologies.component';
import { DialogCreateCourseComponent } from './components/mentor/dialog-create-course/dialog-create-course.component';
import { ListCoursesComponent } from './components/mentor/list-courses/list-courses.component';
import { ListCoursesStudentComponent } from './components/student/list-courses-student/list-courses-student.component';
import { OngoingTrainingsMentorComponent } from './components/mentor/ongoing-trainings-mentor/ongoing-trainings-mentor.component';
import { MentorNotificationsComponent } from './components/mentor/mentor-notifications/mentor-notifications.component';
import { CompletedTrainingsMentorComponent } from './components/mentor/completed-trainings-mentor/completed-trainings-mentor.component';
import { OngoingCoursesStudentComponent } from './components/student/ongoing-courses-student/ongoing-courses-student.component';
import { CompletedCoursesStudentComponent } from './components/student/completed-courses-student/completed-courses-student.component';
import { StudentNotificationComponent } from './components/student/student-notification/student-notification.component';
import { PaymentDialogComponent } from './components/student/payment-dialog/payment-dialog.component';
import { StudentPaymentsHistoryComponent } from './components/student/student-payments-history/student-payments-history.component';
import { MentorPaymentsHistoryComponent } from './components/mentor/mentor-payments-history/mentor-payments-history.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'technologyCRUD', component: AdminTechnologyComponent, canActivate: [AuthGuard] 
    },

      { path: 'createTech', component: AdminDialogCreateTechComponent, canActivate: [AuthGuard] },
      { path: 'studentOps', component: AdminStudentComponent, canActivate: [AuthGuard] },
      { path: 'mentorOps', component: AdminMentorComponent, canActivate: [AuthGuard] },
      { path: 'editTech', component: EditTechDialogComponent, canActivate: [AuthGuard] }

    ]
  },
  { path: 'studentDashboard', component: StudentDashboardComponent,
    children: [
      {path: 'allCourses', component: ListCoursesStudentComponent, canActivate: [AuthGuard]},
      {path: 'ongoingCourses', component: OngoingCoursesStudentComponent, canActivate: [AuthGuard]},
      {path: 'completedCourses', component: CompletedCoursesStudentComponent, canActivate: [AuthGuard]},
      {path: 'studentNotifications', component: StudentNotificationComponent, canActivate: [AuthGuard]},
      {path: 'paymentDialog', component: PaymentDialogComponent, canActivate: [AuthGuard]},
      {path: 'studentPaymentHistory', component: StudentPaymentsHistoryComponent, canActivate: [AuthGuard]}
      
    ]
  },
  { path: 'mentorDashboard', component: MentorDashboardComponent, canActivate: [AuthGuard],
    children: [
      {path: 'allTechnologies', component: ListTechnologiesComponent, canActivate: [AuthGuard]},
      {path: 'dialogCreateCourse', component: DialogCreateCourseComponent, canActivate: [AuthGuard]},
      {path: 'myCourses', component: ListCoursesComponent, canActivate: [AuthGuard]},
      {path: 'ongoingTrainings', component: OngoingTrainingsMentorComponent, canActivate: [AuthGuard]},
      {path: 'mentorNotifications', component: MentorNotificationsComponent, canActivate: [AuthGuard]},
      {path: 'completedTrainings', component: CompletedTrainingsMentorComponent, canActivate: [AuthGuard]},
      {path: 'mentorPaymentHistory', component: MentorPaymentsHistoryComponent, canActivate: [AuthGuard]}

    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
