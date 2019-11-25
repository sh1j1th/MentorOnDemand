import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSliderChange } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ongoing-courses-student',
  templateUrl: './ongoing-courses-student.component.html',
  styleUrls: ['./ongoing-courses-student.component.scss']
})
export class OngoingCoursesStudentComponent implements OnInit {

  studentEmail = localStorage.getItem('email');

  constructor(
    private _router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listOngoingCourses();
  }

 
  tableData;

  listOngoingCourses = function () {
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.studentEmail = {"studentEmail":this.studentEmail}
    // this.studentEmail = JSON.stringify(this.studentEmail);
    this.http.get("https://localhost:44319/studentservice/ongoingCourses/"+this.studentEmail).subscribe(
      (result: any[]) => {
        this.tableData = result;
        console.log(result);
        

      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }
  onRatingChange(event: MatSliderChange,id: number,field: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("https://localhost:44319/studentservice/rating/" + id, event.value,
     { headers: headers, responseType: "text" }).subscribe(
      (result) => {
        console.log("new rating");
        this._router.navigateByUrl('studentDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['studentDashboard/ongoingCourses']);
        });
      },
      (error) => {
        alert("Error occured");
        console.log(error)
      }
    )
  }

  onProgressChange(event: MatSliderChange,id: number, field: string) {
    console.log("This is emitted as the thumb slides");
    console.log(event.value);
    console.log(id)
    console.log(field);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("https://localhost:44319/studentservice/progress/" + id, event.value,
     { headers: headers, responseType: "text" }).subscribe(
      (result) => {
        console.log("new rating");
        this._router.navigateByUrl('studentDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['studentDashboard/ongoingCourses']);
        });
      },
      (error) => {
        alert("Error occured");
        console.log(error)
      }
    )
  }
  

}
