import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-mentor',
  templateUrl: './admin-mentor.component.html',
  styleUrls: ['./admin-mentor.component.scss']
})
export class AdminMentorComponent implements OnInit {

  constructor(
    private _router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.listMentors();
  } 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableData;
  displayedColumns = [];
  dataSource;
  listMentors = function () {
    this.http.get("http://localhost:9075/adminservice/users/2").subscribe(
      (result: any[]) => {
        this.tableData = result;
        this.mentorList = result;
        //console.log(JSON.stringify(this.mentorList));
        // this.displayedColumns = Object.keys(this.mentorList[0]).concat(['Actions']);;
        // this.dataSource = new MatTableDataSource(this.mentorList);

        // console.log("mentorList given below");
        // console.log(this.mentorList);
        // console.log("dataSource given below");
        // console.log(this.dataSource)
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

  modifyAccess(id: string){
    this.http.get("http://localhost:9075/adminservice/useraccess/"+id,{responseType: 'text'}).subscribe(
      (result) => {
        
        console.log(result);
        this._router.navigateByUrl('adminDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['adminDashboard/mentorOps']);
      });
      },
      (error) => {
        alert("Error occured");
        console.log(error)
      }
    )
  }
  
}
