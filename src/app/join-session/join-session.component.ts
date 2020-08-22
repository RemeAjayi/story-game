import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {StoryService} from '../services/story.service';
import {Story} from '../models/story';
import {Player} from '../models/player';
import {JoinSessionDialogComponent} from '../join-session-dialog/join-session-dialog.component';
import {Router, ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";
import {Config} from '../models/Config';
import { PlayerService } from '../services/player.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnInit {
  inviteCode: any;
  story: Story;
  player: Player;
  storyOwner = true;
  storyId: string;
  form: FormGroup;
  formConfig = Config.CONTROLS;
  currentPage = 0 ;
  currentPageSubject = new BehaviorSubject<number>(0);
  formValues = [];
  isSubmitted: boolean;
  imageUrl: string;

  constructor(
    private storyService: StoryService,
    private playerService: PlayerService,
    private dataService: DataService,
    private dialog: MatDialog,
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
    this.getCurrentPage().subscribe((result) => {
       this.currentPage = result;
       this.form = this.toFormGroup(this.formConfig);
    });

    this.storyId = this.route.snapshot.paramMap.get('id');
    // hide story title input with this flag
    if (this.storyId) {
      this.storyOwner = false;
    }
  }

  // create formGroup
  toFormGroup(formConfig: any) {
     // if control is checkbox
     const group = {};
     formConfig[this.currentPage].controls.forEach(
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

  // go to next page
  next() {
    this.saveFormValues('one');
    this.setCurrentPage(this.currentPage + 1);
  }

  setCurrentPage(value: number) {
    // this.page = value;
    this.currentPageSubject.next(value);
  }

  getCurrentPage() {
    return this.currentPageSubject.asObservable();
  }
  toggleCheckedClass(obj) {
    obj.checked = !obj.checked;
  }
 
  saveFormValues(page) {

    if (this.form.valid) {
      let obj = this.form.getRawValue();
      obj = this.transformObj(obj);
      this.formValues.push({page, formData: obj});
    }
    console.log(this.formValues);

  }

  transformObj(obj) {
    debugger
    Object.keys(obj).forEach((key) => {

      // transform checkbox-group
      if (key.startsWith('category')) {
        obj[key] = this.transformCheckboxGroup(key, obj[key]);
        obj[key] = obj[key].toString();
      }
    });

    return obj;
  }

  transformCheckboxGroup(key, arr) {
    debugger
    let config = this.formConfig[1].controls[2];
    const values = [];

    if (config) {
      if (arr.length > 0) {
        arr.forEach((item, index) => {
          if (item) {
            values.push(config.options[index].label);
          }
        });
      }
    }
    return JSON.stringify(values);
  }

  // save story Image
  saveStoryImage(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('upload', file, file.name);
      console.log(JSON.stringify(formData));
      this.storyService.addStoryImage(formData).subscribe(
        (res) =>
        {
            this.imageUrl = res.url;
        },
        (error) => {
          alert(error);
        }
      );
    }
  }

  onSubmit() {
    this.saveFormValues('two');
   
    this.player = Object.assign({playerEmail: this.dataService.getNewUserEmail() }, this.formValues[0].formData);
    this.story = Object.assign({storyImageUrl: this.imageUrl}, this.formValues[1].formData);
    debugger;
    // this.player.playerEmail = ;
    console.log(this.formValues);
      //  create new player
  this.playerService.addNewPlayer(this.player).subscribe(
    (data: Player) =>{
      debugger;
     // if user navigated through invite code
    this.isSubmitted = true;
    },
    (error)=>{
      alert(error);
    }
  );
  if (this.storyId) {
    // call join session method
    this.storyService.joinSession(this.story, this.storyId).subscribe(
      (response) => {
        this.inviteCode = response._id;
        // direct to write story component on success
        this.router.navigate(['/story', this.inviteCode], {
          relativeTo: this.route,
          queryParams: {author: response.storyOwner}
        });
      },
      (error) => {
        return console.log(error);
      }
    );
  } else {
    this.storyService.addNewStory(this.story).subscribe(
      (res) => {
        this.inviteCode = res._id;
      },
      (error) => {
        return console.log(error);
      }
    );
  }
  }


}
