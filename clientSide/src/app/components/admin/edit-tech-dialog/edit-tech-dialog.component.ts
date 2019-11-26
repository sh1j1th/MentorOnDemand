import { Component, Output, EventEmitter, Inject, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-edit-tech-dialog',
  templateUrl: './edit-tech-dialog.component.html',
  styleUrls: ['./edit-tech-dialog.component.scss']
})
export class EditTechDialogComponent implements OnInit {

  id: number;
  technologyName: string;
  status: string;
  description: string;
  commission: string;
  imageURL: string;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(
    private _router: Router,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<EditTechDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.id = this.data.id;
    this.technologyName = this.data.technologyName;
    this.commission = this.data.commission;
    this.imageURL = this.data.imageURL;
    this.status = this.data.status;
    this.description = this.data.description;

  }
  editTech(editForm) {
    console.log(editForm)
    editForm = JSON.stringify(editForm);
    console.log(editForm)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put("http://localhost:9075/adminservice/" + this.id, editForm, { headers: headers, responseType: "text" }).subscribe(
      (result) => {

        console.log(result);
        this.dialogRef.close();
        this._router.navigateByUrl('adminDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['adminDashboard/technologyCRUD']);
        });
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

  // saveMessage() {
  //   const data = 'Your data';
  //   this.submitClicked.emit(data);
  //   this.dialogRef.close();
  // }

  closeDialog() {
    this.dialogRef.close();
  }
}
