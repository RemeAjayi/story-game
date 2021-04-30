import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent implements OnInit {

  inviteCode: any;
  story: Story;
  player: Player;
  storyOwner = true;
  storyId: string;
  form: FormGroup;
  formConfig = Config.STORYCONTROLS;
  currentPage = 0 ;
  currentPageSubject = new BehaviorSubject<number>(0);
  formValues = [];
  isSubmitted: boolean;
  imageUrl: string;

  constructor(
    private storyService: StoryService,
    private playerService: PlayerService,
    private dataService: DataService,
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

  toggleCheckedClass(obj) {
    obj.checked = !obj.checked;
  }
 
  saveFormValues(page) {

    if (this.form.valid) {
      let obj = this.form.getRawValue();
      obj = this.transformObj(obj);
      this.formValues.push({page, formData: obj});
    }

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
    let config = this.formConfig[2];
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
    debugger;
    this.story = Object.assign({storyImage: this.imageUrl}, this.formValues[0].formData);
    console.log(this.story)
      //  create new player
  if (this.storyId) {
    // call join session method
    this.storyService.joinSession(this.story, this.storyId).subscribe(
      (response) => {
        debugger;
        this.inviteCode = response._id;
        // direct to write story component on success
        this.router.navigate(['/story', this.inviteCode], {
          relativeTo: this.route,
          queryParams: {author: response.storyOwner}
        });
      },
      (error) => {
        debugger;
        return console.log(error);
      }
    );
  } else {
    this.storyService.addNewStory(this.story).subscribe(
      (res) => {
        debugger;
        this.inviteCode = res._id;
        this.router.navigate(['/story/join']);
      },
      (error) => {
        debugger;
        return console.log(error);
      }
    );
  }
  


}

}
