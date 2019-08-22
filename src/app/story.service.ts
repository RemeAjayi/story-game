import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Story } from './models/story';
// import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  observable: Observable<string>;
  private socket;

  // private api = 'https://sgx-api.herokuapp.com/story';
  private create_story = 'http://localhost:3000/story';
  private join_session = 'http://localhost:3000/story/join/';
  private url ="http://localhost:3000";
  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  addNewStory(story: Story): Observable<any> {
    return this.http.post<Story>(this.create_story, story);
  }
  joinSession(story: Story, id): Observable<any> {
    return this.http.post<Story>(this.join_session + id, story);
  }

  addNewEntry(message)
  {
    debugger;
    this.socket.emit('new entry', message);
    // debugger;
    // this.socket.on('new entry', (message) => {
    //   debugger;
    //   console.log('runs');
    // });
  }

  // getMessages() {
  //   return this.socket
  //     .fromEvent<any>('new entry')
  //     .pipe(map(data => data.obj));
  // }
  getMessages(): Observable<any> {
    // return this.observable = new Observable((observer) => {
    //   this.socket.on('new entry', (data) => observer.next(data)
    //   );
    // })
    return Observable.create((observer) => {
      this.socket.on('new entry', (message) => {
        console.log('runs');
        observer.next(message);
      });
    });
  }

}
//POST: player joins story session
// joinStory
