
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  o =false;

  constructor(  private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token:String = localStorage.getItem("token")!;
   
  
   
    let request = req;
   console.log(token);
   console.log(request);
    if (token) {
    
      request = req.clone({
        setHeaders: {
          "authorization": `Bearer ${token}`,
          
        },
      });
      console.log(request);
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('hola');
        if (err.status === 401) {
          this.router.navigateByUrl('/Login');
        }

        return throwError(err);
      })
    );
  }
}
