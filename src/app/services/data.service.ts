import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  email: string;
  constructor() {
   }
   public setNewUserEmail(email){
      this.email = email;
   }
   public getNewUserEmail(){
      return this.email;
   }
}
