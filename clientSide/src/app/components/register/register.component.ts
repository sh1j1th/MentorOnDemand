import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _router : Router
  ) { }
 
  ngOnInit() { 
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  //register 
  register(userReg){
    console.log(userReg);
    userReg = JSON.stringify(userReg);
    console.log(userReg);

    let Headers = new HttpHeaders({ 'Content-Type': 'application/json'})

      this.http.post("http://localhost:9075/authservice/register", userReg,
        { headers: Headers, responseType: 'text' }).subscribe(
          (result) => {
            console.log(result)
            // alert("Please login to continue")
            // this._router.navigate(['/login'])
            this._router.navigateByUrl('login', { skipLocationChange: true }).then(() => {
              this._router.navigate(['login']);
            });
          },
          (error) => {
            console.log(error)
            alert("Error occured, check whether Backend is running!");
          }
        )
  }
}


