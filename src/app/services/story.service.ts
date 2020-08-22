import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Story } from '../models/story';
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";
import { Endpoints } from "../endpoints";

@Injectable()
export class StoryService {
  observable: Observable<string>;
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(Endpoints.BASE);
  }

  addNewStory(story: Story): Observable<any> {
    return this.http.post<Story>(Endpoints.CREATE_STORY, story);
  }
  joinSession(story: Story, id): Observable<any> {
    return this.http.post<Story>(Endpoints.JOIN_SESSION + id, story);
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
  return this.http.get<any>(Endpoints.CREATE_STORY + '/' +  id);
}

 addStoryImage(formData){
  // let headers = new Headers();
  // headers.append('Content-Type', 'multipart/form-data');
  // headers.append('Accept', 'application/json');
  // let options = new RequestOptions({ headers: headers });
   return this.http.post<any>(Endpoints.UPLOAD_STORY_IMAGE, formData);
 }
}


