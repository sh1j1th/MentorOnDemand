import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-payments-history',
  templateUrl: './student-payments-history.component.html',
  styleUrls: ['./student-payments-history.component.scss']
})
export class StudentPaymentsHistoryComponent implements OnInit {

  studentEmail = localStorage.getItem('email');

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getHistory();
  }

  tableData;
  getHistory(){
    this.http.get("http://localhost:9075/studentservice/paymentHistory/"+this.studentEmail).subscribe(
      (result: any[]) => {
        this.tableData = result;
        console.log(result);

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
