import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Endpoints} from '../endpoints';
import { throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';



@Injectable()
export class PlayerService {

  constructor(private http: HttpClient) { }

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
    return this.http.post<Player>(Endpoints.NEW_PLAYER, player) 
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
