import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {StoryService} from '../services/story.service';
import {Story} from '../models/story';
import {Player} from '../models/player';
import {Router, ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";
import {Config} from '../models/Config';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  inviteCode: any;
  story: Story;
  player: Player;
  storyOwner = true;
  storyId: string;
  form: FormGroup;
  formConfig = Config.PLAYERCONTROLS;
  currentPage = 0 ;
  currentPageSubject = new BehaviorSubject<number>(0);
  formValues = [];
  isSubmitted: boolean;
  imageUrl: string;

  constructor(
    private storyService: StoryService,
    private playerService: PlayerService,
    private dataService: DataService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute) {
    this.story = new Story('', '', '', '');
    this.player = new Player('', '', '', '', '');
  }

  /* keep the approach of making people supply names and email when they are invited.
    after they view they're story, if they don't have an account prompt them to a modal saying
    they should create a profile, to create their own stories or view others.
    Then it should take them to a profile page(v3) where they can finish up or move them to the register process
    with their details prepopulated(v2) - or not(v1).
  */

  ngOnInit() {
    // create form
    
       this.form = this.toFormGroup(this.formConfig);

    // this.storyId = this.route.snapshot.paramMap.get('id');
    // // hide story title input with this flag
    // if (this.storyId) {
    //   this.storyOwner = false;
    // }
  }

  // create formGroup
  toFormGroup(formConfig: any) {
     // if control is checkbox
     const group = {};
     formConfig.forEach(
       control => {
         if (control.type === 'checkbox-group') {
           const checkboxArr = new FormArray([]);
           control.options.forEach((item, index) => {
              checkboxArr.push(new FormControl(''));
           });
           group[control.name] = checkboxArr;
         }  else {
           group[control.name] = new FormControl('', this.getValidators(control) );
         }
       }
     );
     return new FormGroup(group);
  }
  // get validators from model
  getValidators(control){
    const validators = [];

    if (control.required) {
        validators.push(Validators.required);
    }
    return validators.length > 0 ? validators : [];

  }

   saveFormValues(page) {

    if (this.form.valid) {
      this.formValues.push({page, formData:this.form.getRawValue()});
    }
    console.log(this.formValues);
  }


  onSubmit() {
    this.saveFormValues('two');
   
    this.player = Object.assign({playerEmail: this.dataService.getNewUserEmail() }, this.formValues[0].formData);
    debugger;
    // this.player.playerEmail = ;
    console.log(this.formValues);
      //  create new player
  this.playerService.addNewPlayer(this.player).subscribe(
    (data) =>{
      debugger;
     this.storageService.setAuthToken(data.token);
     this.storageService.setCurrentUserId(data.player._id);
    },
    (error)=>{
      alert(error);
    }
  );

  this.router.navigate(['add-story']);
  }


}
