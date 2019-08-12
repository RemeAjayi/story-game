import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  // set current author
  setAuthor(email)
  {
    localStorage.setItem('currentUser', email);
  }
  getAuthor()
  {
    return localStorage.getItem('currentUser');
  }
}
