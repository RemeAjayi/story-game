import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Endpoints} from '../endpoints';
import { throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import {StorageService} from '../services/storage.service';



@Injectable()
export class PlayerService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  // set current author
  setAuthor(email)
  {
    localStorage.setItem('currentUser', email);
  }
  getAuthor()
  {
    return localStorage.getItem('currentUser');
  }

  addNewPlayer(player: Player){
    return this.http.post<any>(Endpoints.NEW_PLAYER, player) 
    .pipe(
      catchError(this.handleError)
    );
  }

  login(email:string, pwd:string){
    return this.http.post<any>(Endpoints.LOGIN, {playerEmail: email, password: pwd})
    .pipe(
      catchError(this.handleError)
    );
  }

  getPlayerDetails(id:string){
    let headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.storageService.getAuthToken()}`
    );

    return this.http.get<any>(Endpoints.NEW_PLAYER + `/${id}`, {headers})
    .pipe(
      catchError(this.handleError)
    );
  }

 logout(){
    let headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.storageService.getAuthToken()}`
    );

    return this.http.post<any>(Endpoints.LOGOUT, {headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      alert(`An error occurred: ${error.error.message}`);
    } else {
     alert(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
