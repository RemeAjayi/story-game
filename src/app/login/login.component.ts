import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from '../services/player.service';
import{ Router} from '@angular/router';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(private playerService: PlayerService, private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.playerService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response) => {
        // direct to write story component on success
        this.storageService.setAuthToken(response.token);
        this.storageService.setCurrentUserId(response.player._id);

        this.router.navigate([`/profile/${response.player._id}`], {
        });
      },
      (error) => {
        alert("Login Failed. Check Login Details")
      }
    );
  }

}
