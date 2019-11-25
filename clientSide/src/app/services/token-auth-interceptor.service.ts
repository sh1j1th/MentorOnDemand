import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
//import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next) {

    if (localStorage.getItem('token') === null) {
      return next.handle(req);
    }
    let token = JSON.parse(localStorage.getItem('token')).token;

    if (token) {
      let tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'bearer ' + token)
        }
      )
      return next.handle(tokenizedReq)
    }

  }

}
//   constructor(//private userService: UserService,
//     private router: Router) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//       const token = localStorage.getItem('token');

//       console.log('INTERCEPTOR');

//       let newHeaders = req.headers;
//       if (token) {
//          // If we have a token, we append it to our new headers
//          newHeaders = newHeaders.append('authtoken', token);
//       }
//       // Finally we have to clone our request with our new headers
//       // This is required because HttpRequests are immutable
//       const authReq = req.clone({headers: newHeaders});
//       console.log("test"+ authReq)
//       // Then we return an Observable that will run the request
//       // or pass it to the next interceptor if any
//       return next.handle(authReq);

//   }

