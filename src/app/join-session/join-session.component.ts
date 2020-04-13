import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {StoryService} from '../story.service';
import {Story} from '../models/story';
import {JoinSessionDialogComponent} from '../join-session-dialog/join-session-dialog.component';
import {Router, ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";
import {Config} from '../models/Config';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnInit {
  inviteCode: any;
  model: Story;
  storyOwner = true;
  storyId: string;
  form: FormGroup;
  formConfig = Config.CONTROLS;
  currentPage = 0 ;
  currentPageSubject = new BehaviorSubject<number>(0);

  constructor(
    private storyService: StoryService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.model = new Story('', '', '');
  }

  ngOnInit() {
    // create form
    this.getCurrentPage().subscribe((result) => {
       this.currentPage = result;
       this.form = this.toFormGroup(this.formConfig);
    });



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
     formConfig[this.currentPage].controls.forEach(
       control => {
         if (control.type === 'checkbox-group') {
           const checkboxArr = new FormArray([]);
           control.options.forEach((item, index) => {
             checkboxArr.push(new FormControl(''));
           });
           group[control.name] = checkboxArr;
         }  else {
           group[control.name] = new FormControl('');
         }
       }
     );
     return new FormGroup(group);
  }
  // go to next page
  next() {
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
  // openDialog() {
  //
  //   const dialogConfig = new MatDialogConfig();
  //
  //   // dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //
  //   dialogConfig.data = {
  //     code: this.inviteCode
  //   };
  //
  //   this.dialog.open(JoinSessionDialogComponent, dialogConfig);
  //   const dialogRef = this.dialog.open(JoinSessionDialogComponent, dialogConfig);
  //
  //   dialogRef.afterClosed().subscribe(
  //     data => this.router.navigate(['/story', this.inviteCode], {
  //       relativeTo: this.route,
  //       queryParams: {author: this.model.storyOwner}
  //     })
  //   );
  // }
  //
  //
  // onSubmit() {
  //   // if user navigated through invite code
  //   if (this.storyId) {
  //     // call join session method
  //     this.storyService.joinSession(this.model, this.storyId).subscribe(
  //       (data) => {
  //         this.inviteCode = data._id;
  //         // direct to write story component on success
  //         this.router.navigate(['/story', this.inviteCode], {
  //           relativeTo: this.route,
  //           queryParams: {author: this.model.storyOwner}
  //         });
  //       },
  //       (error) => {
  //         return console.log(error);
  //       }
  //     );
  //   } else {
  //     this.storyService.addNewStory(this.model).subscribe(
  //       (data) => {
  //         this.inviteCode = data._id;
  //         this.openDialog();
  //       },
  //       (error) => {
  //         return console.log(error);
  //       }
  //     );
  //   }
  // }


}
