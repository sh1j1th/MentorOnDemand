import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { empty } from 'rxjs';

@Component({
  selector: 'app-ongoing-trainings-mentor',
  templateUrl: './ongoing-trainings-mentor.component.html',
  styleUrls: ['./ongoing-trainings-mentor.component.scss']
})
export class OngoingTrainingsMentorComponent implements OnInit {

  mentorEmail = localStorage.getItem('email');

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listOngoingTrainings();
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  tableData;
show = false;
  listOngoingTrainings = function () {
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.mentorEmail = {"mentorEmail":this.mentorEmail}
    // this.mentorEmail = JSON.stringify(this.mentorEmail);
    // console.log(this.mentorEmail);

    this.http.get("http://localhost:9075/mentorservice/ongoingTrainings/"+this.mentorEmail,
    //{responseType: "text" }
    ).subscribe(
      (result: any[]) => {
        //result = JSON.parse(result);
        //console.log(result)
        this.tableData = result;
        if(this.tableData === empty)
          this.show = false;
        else
        this.show = true

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
