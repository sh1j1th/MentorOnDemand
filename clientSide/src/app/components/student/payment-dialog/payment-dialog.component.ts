import { Component, Output, EventEmitter, Inject, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  registrationId: Number;
  price: Number;
 
  @Output() submitClicked = new EventEmitter<any>();

  studentEmail = localStorage.getItem('email');

  constructor(
    private _router: Router,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.registrationId = this.data.registrationId;
    this.price = this.data.price;
 
  }
  paymentTech(paymentForm) {
    console.log(paymentForm)
    paymentForm = JSON.stringify(paymentForm);
    console.log(paymentForm)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("http://localhost:9075/studentservice/paymentService/" + this.studentEmail, paymentForm,
     { headers: headers, responseType: "text" }).subscribe(
      (result) => {

        console.log(result);
        if(result){
          alert("Payment successfull");
        }
        else{
          alert("Payment failed, try again!!");
        }
        this.dialogRef.close();
        this._router.navigateByUrl('studentDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['studentDashboard/studentNotifications']);
        });
      },
      (error) => {
        alert("Error occured");
        console.log(error)
      }
    )
  }
}
