import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSliderChange } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed-courses-student',
  templateUrl: './completed-courses-student.component.html',
  styleUrls: ['./completed-courses-student.component.scss']
})
export class CompletedCoursesStudentComponent implements OnInit {
  studentEmail = localStorage.getItem('email');

  constructor(
    private _router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listCompletedCourses();
  }

  
  tableData;

  listCompletedCourses = function () {
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.studentEmail = {"studentEmail":this.studentEmail}
    // this.studentEmail = JSON.stringify(this.studentEmail);
    // console.log(this.studentEmail);
    this.http.get("http://localhost:9075/studentservice/completedCourses/" + this.studentEmail).subscribe(
      (result: any[]) => {
        this.tableData = result;
      
      },
      (error) => {
        switch(error.status){
          case 400: alert("Invalid input");
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

  onRatingChange(event: MatSliderChange,id: number,field: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("http://localhost:9075/studentservice/rating/" + id, event.value,
     { headers: headers, responseType: "text" }).subscribe(
      (result) => {
        console.log("new rating");
        this._router.navigateByUrl('studentDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['studentDashboard/completedCourses']);
        });
      },
      (error) => {
        switch(error.status){
          case 400: alert("Invalid input");
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

