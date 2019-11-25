import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor-payments-history',
  templateUrl: './mentor-payments-history.component.html',
  styleUrls: ['./mentor-payments-history.component.scss']
})
export class MentorPaymentsHistoryComponent implements OnInit {

  mentorEmail = localStorage.getItem('email');

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getHistory();
  }

  tableData;
  getHistory(){
    this.http.get("https://localhost:44319/mentorservice/paymentHistory/"+this.mentorEmail).subscribe(
      (result: any) => {
        this.tableData = result;
        console.log(result);

      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }

}
