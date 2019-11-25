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
    this.http.get("https://localhost:44319/mentorservice/mentorNotifications/"+this.mentorEmail).subscribe(
      (result: any[]) => {
        this.tableData = result;
        console.log(this.tableData)
        this.notificationList = result;
        
      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }

  approveRequest(registrationId: number, isApproved: boolean){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("https://localhost:44319/mentorservice/courseRequestUpdate/"+registrationId,
     isApproved,{ headers: headers, responseType: "text" }).subscribe(
      (result: any) => {
        console.log(result);
      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }
  rejectRequest(registrationId: number, isApproved: boolean){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("https://localhost:44319/mentorservice/courseRequestUpdate/"+registrationId,
     isApproved,{ headers: headers, responseType: "text" }).subscribe(
      (result: any) => {
        console.log(result);
      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }
}
