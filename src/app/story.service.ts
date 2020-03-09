import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Story } from './models/story';
import * as io from 'socket.io-client';
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  observable: Observable<string>;
  private socket;

  private CREATE_STORY = environment.baseUrl + '/story';
  private join_session = environment.baseUrl + '/story/join/';
  private url = environment.baseUrl;
  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  addNewStory(story: Story): Observable<any> {
    return this.http.post<Story>(this.CREATE_STORY, story);
  }
  joinSession(story: Story, id): Observable<any> {
    return this.http.post<Story>(this.join_session + id, story);
  }

  addNewEntry(obj) {
    this.socket.emit('new entry', obj);
  }
  getMessages(): Observable<any> {
    return this.observable = new Observable((observer) => {
      this.socket.on('new entry', (data) => observer.next(data)
      );
    });
  }
getStoryByID(id) {
  return this.http.get<any>(this.CREATE_STORY + '/' +  id);
}
}
// POST: player joins story session
// joinStory
