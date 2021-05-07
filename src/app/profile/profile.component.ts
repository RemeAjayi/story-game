import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../services/player.service';
import{ Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id:string;
  player: any;
  constructor(private playerService: PlayerService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id)
    this.playerService.getPlayerDetails(this.id).subscribe(
      (response) => {
        // direct to write story component on success
        this.player = response;
      },
      (error) => {
        return console.log(error);
      }
    );
  }

goToWriteStory(){
  this.router.navigate(['/story/write']);
}

logout(){
  this.playerService.logout().subscribe(
    (res) =>{
     window.localStorage.clear();
    },
    (error)=>{
      return console.log(error);
    }
  );
}

}
