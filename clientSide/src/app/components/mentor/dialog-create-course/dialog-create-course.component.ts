import { Component, Output, EventEmitter, Inject, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-create-course',
  templateUrl: './dialog-create-course.component.html',
  styleUrls: ['./dialog-create-course.component.scss']
})
export class DialogCreateCourseComponent implements OnInit {

  mentorEmail: string;
  technologyId: number;
  @Output() submitClicked = new EventEmitter<any>();
  
  constructor(
    private _router: Router,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogCreateCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.mentorEmail = this.data.mentorEmail;
    this.technologyId = this.data.technologyId;
    console.log(this.technologyId);
  }

  createCourse(createForm) {
    createForm = JSON.stringify(createForm);
    console.log(createForm)

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post("http://localhost:9075/mentorservice/createCourse", createForm,
     { headers: headers, responseType: "text" }).subscribe(
      (result) => {

        console.log(result);
        this.dialogRef.close();
        this._router.navigateByUrl('mentorDashboard', { skipLocationChange: true }).then(() => {
          this._router.navigate(['mentorDashboard/allTechnologies']);
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

  closeDialog() {
    this.dialogRef.close();
  }
 

}
