import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { DialogCreateCourseComponent } from '../dialog-create-course/dialog-create-course.component';

@Component({
  selector: 'app-list-technologies',
  templateUrl: './list-technologies.component.html',
  styleUrls: ['./list-technologies.component.scss']
})
export class ListTechnologiesComponent implements OnInit {

  mentorEmail = localStorage.getItem('email'); 

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listTechnology();
  }

  showDialog() {
    const dialogRef = this.dialog.open(DialogCreateCourseComponent, {
      width: 'auto',
      height: 'auto'
    });
  }

tableData;

  listTechnology = function () {
    this.http.get("http://localhost:9075/mentorservice/listTech",
    {Authorization: 'Bearer ' + localStorage.getItem('token')}).subscribe(
      (result: any[]) => {
        this.tableData = result;
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

  openDialog(technologyId:number): void {
 
      
   const dialogRef = this.dialog.open(DialogCreateCourseComponent, {
     width: 'auto',
     data: { mentorEmail: this.mentorEmail, technologyId: technologyId}
   });
   dialogRef.afterClosed().subscribe(result => {
   });

   const dialogSubmitSubscription =
     dialogRef.componentInstance.submitClicked.subscribe(result => {
       dialogSubmitSubscription.unsubscribe();
     });
 }

}
