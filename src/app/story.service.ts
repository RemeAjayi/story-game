import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Story } from './models/story';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  
  // private api = 'https://sgx-api.herokuapp.com/story';
  private create_story = 'http://localhost:3000/story';
  private join_session = 'http://localhost:3000/story/join/';
  constructor(private http: HttpClient, private socket: Socket) {

  }

  addNewStory(story: Story): Observable<any> {
    return this.http.post<Story>(this.create_story, story);
  }
  joinSession(story: Story, id): Observable<any> {
    return this.http.post<Story>(this.join_session + id, story);
  }

  //  this.socket.on('disconnect',() =>{
  //   console.log('disconnected from server');
  // });

  // setNewEntry(entry){
  //   return entry;
  // }

  // this.socket.on('new entry', (entry)=>{
  //    this.setNewEntry(entry)
  // });

  addNewEntry(id, entry)
  {
    this.socket.emit('new entry', { id, entry});
  }
}
//POST: player joins story session
// joinStory
