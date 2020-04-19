import { Injectable, OnInit } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {

  constructor(private authServise: AuthService) {}

  validate = (control: FormControl) => {
    return this.authServise.usernameAvailable(control.value)
      .pipe(map( val => {
        if (val.available) { return null; }
        }),
        catchError( err => {
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  }
}
