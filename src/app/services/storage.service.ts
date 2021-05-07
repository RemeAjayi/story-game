import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

    //Store login auth token in local storage
  setAuthToken(token) {
      window.localStorage.setItem("auth", token);
    }

      //retrieve login auth token from local storage
  getAuthToken(): any {
    return window.localStorage.getItem("auth");
  }
    //Store login auth token in local storage
    setCurrentUserId(id) {
      window.localStorage.setItem("id", id);
    }

      //retrieve login auth token from local storage
  getCurrentUserId(): any {
    return window.localStorage.getItem("id");
  }
}
