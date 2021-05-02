import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {StoryService} from '../services/story.service';
import {Story} from '../models/story';
import {Player} from '../models/player';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";
import {Config} from '../models/Config';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnInit {
  id: any;
  story: Story;
  player: Player;
  storyOwner = true;
  storyId: string;
  form: FormGroup;
  // formConfig = Config.CONTROLS;
  currentPage = 0 ;
  currentPageSubject = new BehaviorSubject<number>(0);
  formValues = [];
  isSubmitted: boolean;
  imageUrl: string;
  home: string;
  base: string;
  value: string;

  constructor(
    private storyService: StoryService,
    private playerService: PlayerService,
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    
  }

  /* keep the approach of making people supply names and email when they are invited.
    after they view they're story, if they don't have an account prompt them to a modal saying
    they should create a profile, to create their own stories or view others.
    Then it should take them to a profile page(v3) where they can finish up or move them to the register process
    with their details prepopulated(v2) - or not(v1).
  */

 ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params['id'];
  });
  this.home = this.router.url;
  this.base = environment.devUrl;
  this.value = `Hi, I started a short story on moments and would like you to write with me. Click this link to join ${this.base}${this.home}`;
}


takeToWriteStory()
{
  this.router.navigate([`story/write/${this.id}`]);
}
copyToClipboard(val:string){
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}
}
