import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent implements OnInit {

  constructor(private http: HttpClient,
    private _router: Router) { }

  ngOnInit() {
    this.listStudents();
  } 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  tableData;
  displayedColumns = [];
  dataSource;
  listStudents = function () {
    this.http.get("http://localhost:9075/adminservice/users/3").subscribe(
      (result: any[]) => {
        this.tableData = result;
        // this.studentList = result;
        // console.log(result);
        // //console.log(JSON.stringify(this.studentList));
        // this.displayedColumns = Object.keys(this.studentList[0]).concat(['Actions']);;
        // this.dataSource = new MatTableDataSource(this.studentList);
        // console.log(this.displayedColumns);
        // console.log("studentList given below");
        // console.log(this.studentList);
        // console.log("dataSource given below");
        // console.log(this.dataSource)
        
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

  modifyAccess(id: string){
    this.http.get("http://localhost:9075/adminservice/useraccess/"+id,{responseType: 'text'}).subscribe(
      (result) => {
        
        console.log(result);
        this._router.navigateByUrl('adminDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['adminDashboard/studentOps']);
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
