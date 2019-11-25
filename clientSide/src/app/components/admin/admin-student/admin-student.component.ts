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
    this.http.get("https://localhost:44319/adminservice/users/3").subscribe(
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
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }

  modifyAccess(id: string){
    this.http.get("https://localhost:44319/adminservice/useraccess/"+id,{responseType: 'text'}).subscribe(
      (result) => {
        
        console.log(result);
        this._router.navigateByUrl('adminDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['adminDashboard/studentOps']);
      });
      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }
  
}
