import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-courses-student',
  templateUrl: './list-courses-student.component.html',
  styleUrls: ['./list-courses-student.component.scss']
})

export class ListCoursesStudentComponent implements OnInit {

  studentEmail = localStorage.getItem('email');

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listCourses();
  }

  tableData;
  listCourses = function () {
    this.http.get("http://localhost:9075/studentservice/searchCourses").subscribe(
      (result: any[]) => {
        this.tableData = result;
      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }

  //request access to course
  requestCourse(courseId: number) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var requestForm = JSON.stringify({
      courseId: courseId,
      regDate: date,
      studentEmail: this.studentEmail
    });

    console.log(requestForm)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post("http://localhost:9075/studentservice/requestCourse", requestForm,
      { headers: headers, responseType: 'text' }).subscribe(
        (result) => {
          console.log("Request successfull");
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
