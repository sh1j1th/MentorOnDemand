import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminTechnologyComponent } from '../admin-technology/admin-technology.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dialog-create-tech',
  templateUrl: './admin-dialog-create-tech.component.html',
  styleUrls: ['./admin-dialog-create-tech.component.scss']
})
export class AdminDialogCreateTechComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminDialogCreateTechComponent>,
    private http: HttpClient,
    private _router: Router,
    private activeRoute: ActivatedRoute
    ) { }
  
    ngOnInit() { }
    
  //add technology
  createTech(cForm){
    cForm = JSON.stringify(cForm);
    console.log(cForm);
    let Headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    this.http.post("http://localhost:9075/adminservice", cForm,
      { headers: Headers, responseType: 'text' }).subscribe(
        (result) => {
          alert("Added technology successfully");
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
}

