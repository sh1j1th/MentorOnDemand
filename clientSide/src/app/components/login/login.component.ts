import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string[];

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  login(userLogin) {

    let Headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    this.http.post("http://localhost:9075/authservice/login", userLogin,
      { headers: Headers, responseType: 'text' }).subscribe(
        (result) => {
          localStorage.setItem('token', result);
          localStorage.setItem('email', userLogin.email);
          userLogin = JSON.stringify(userLogin);
          result = JSON.parse(result)
          if (result['role'] == 1)
          this._router.navigateByUrl('adminDashboard', { skipLocationChange: true }).then(() => {
            this._router.navigate(['adminDashboard/technologyCRUD']);});
          if (result['role'] == 2)
            this._router.navigateByUrl('mentorDashboard', { skipLocationChange: true }).then(() => {
              this._router.navigate(['mentorDashboard/allTechnologies']);
            });
          if (result['role'] == 3)
            this._router.navigateByUrl('studentDashboard', { skipLocationChange: true }).then(() => {
              this._router.navigate(['studentDashboard/allCourses']);
            });

        },
        (error) => {
          switch(error.status){
            case 400: alert("Invalid credentials");
            break;
            case 401: alert("Unauthorized access, contact support");
            break;
            case 404: alert("Page not found, redirecting to home");
            break;
            case 500: alert("Internal server error, retry after sometime");
            break;
            case 502: alert("Bad Gateway");
            break;
          }
        }
      )
  }
}
