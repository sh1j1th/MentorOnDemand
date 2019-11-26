import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-mentor-notifications',
  templateUrl: './mentor-notifications.component.html',
  styleUrls: ['./mentor-notifications.component.scss']
})
export class MentorNotificationsComponent implements OnInit {

  mentorEmail = localStorage.getItem('email');

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getNotifications();
  }
  
tableData;

  getNotifications = function () {
    this.http.get("http://localhost:9075/mentorservice/mentorNotifications/"+this.mentorEmail).subscribe(
      (result: any[]) => {
        this.tableData = result;
        console.log(this.tableData)
        this.notificationList = result;
        
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

  approveRequest(registrationId: number, isApproved: boolean){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("http://localhost:9075/mentorservice/courseRequestUpdate/"+registrationId,
     isApproved,{ headers: headers, responseType: "text" }).subscribe(
      (result: any) => {
        console.log(result);
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
  rejectRequest(registrationId: number, isApproved: boolean){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("http://localhost:9075/mentorservice/courseRequestUpdate/"+registrationId,
     isApproved,{ headers: headers, responseType: "text" }).subscribe(
      (result: any) => {
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
