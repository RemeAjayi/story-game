import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ValidationService} from "../services/validation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  email: string;
  errorMsg: string;
  constructor(private router: Router, public dataService: DataService, private validationService: ValidationService) { }

  ngOnInit() {
  }
  getStarted() {
    if (this.validationService.validateEmail(this.email)){
      this.dataService.setNewUserEmail(this.email);
      this.router.navigate(['/add-player']);
    }
    else{
        this.errorMsg = "Please enter a valid email";
    }
  }
}
