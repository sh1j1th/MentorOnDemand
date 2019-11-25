import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';


@Component({
  selector: 'app-student-notification',
  templateUrl: './student-notification.component.html',
  styleUrls: ['./student-notification.component.scss']
})
export class StudentNotificationComponent implements OnInit {

  studentEmail = localStorage.getItem('email');

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.approveNotifications();
    this.rejectNotifications();
  }
  showDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: 'auto',
      height: 'auto'
    });
  }
  approveData;
  rejectData;
  approveNotifications = function () {

    this.http.get("http://localhost:9075/studentservice/approved/"+this.studentEmail).subscribe(
      (result: any[]) => {
        this.approveData = result;

      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }
  rejectNotifications = function () {
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // this.studentEmail = {"studentEmail":this.studentEmail}
    // this.studentEmail = JSON.stringify(this.studentEmail);
    this.http.get("http://localhost:9075/studentservice/rejected/"+this.studentEmail).subscribe(
      (result: any[]) => {
        this.rejectData = result;
      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }

  openDialog(registrationId: Number,
    price: Number,
    paymentId: Number): void {
 
   const dialogRef = this.dialog.open(PaymentDialogComponent, {
     width: 'auto',
     data: { registrationId: registrationId,
              price: price}
   });
   dialogRef.afterClosed().subscribe(result => {
   });

   const dialogSubmitSubscription =
     dialogRef.componentInstance.submitClicked.subscribe(result => {
       dialogSubmitSubscription.unsubscribe();
     });
 }


}
