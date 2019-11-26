import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-completed-trainings-mentor',
  templateUrl: './completed-trainings-mentor.component.html',
  styleUrls: ['./completed-trainings-mentor.component.scss']
})
export class CompletedTrainingsMentorComponent implements OnInit {
  mentorEmail = localStorage.getItem('email');

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listCompletedTrainings();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
tableData;
  displayedColumns = [];
  dataSource;
  listCompletedTrainings = function () {
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.mentorEmail = {"mentorEmail":this.mentorEmail}
    // this.mentorEmail = JSON.stringify(this.mentorEmail);
    // console.log(this.mentorEmail);
    this.http.get("http://localhost:9075/mentorservice/completedTrainings/"+this.mentorEmail,
    {  responseType: "text" }).subscribe(
      (result: any) => {
        this.tableData = JSON.parse(result);
        this.completedTrainings = result;
        //console.log(JSON.parse(result))
        this.displayedColumns = Object.keys(this.completedTrainings[0]);
        this.dataSource = new MatTableDataSource(this.completedTrainings);

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

