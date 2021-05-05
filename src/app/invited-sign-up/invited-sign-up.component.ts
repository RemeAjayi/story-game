import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Player} from '../models/player';
import { PlayerService } from '../services/player.service';
import { StorageService} from '../services/storage.service';
import {Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-invited-sign-up',
  templateUrl: './invited-sign-up.component.html',
  styleUrls: ['./invited-sign-up.component.scss']
})
export class InvitedSignUpComponent implements OnInit {
  iForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  player: Player;
  id: string;

  constructor(private playerService: PlayerService, 
    private storageService: StorageService, 
    private router: Router,
    private route: ActivatedRoute ) { 
    this.player = new Player('', '', '', '', '');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  onSubmit(){
    console.log(this.iForm.value); 
    // if player is successfully created direct to write story directly
    this.player = {
      playerEmail: this.iForm.value.email,
      playerName: this.iForm.value.name,
      countryCode: '',
      password: this.iForm.value.password,
      phone: ''
     };
   
     this.playerService.addNewPlayer(this.player).subscribe(
      (data) =>{
       this.storageService.setAuthToken(data.token);
       this.router.navigate([`story/write/${this.id}`]);
      },
      (error)=>{
        alert(error);
      }
    );

  }
}
