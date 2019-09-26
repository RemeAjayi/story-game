import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {StoryService} from '../story.service';
import {Story} from '../models/story';
import {JoinSessionDialogComponent} from '../join-session-dialog/join-session-dialog.component';
import {Router, ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from "rxjs";

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.css']
})
export class JoinSessionComponent implements OnInit {
  inviteCode: any;
  model: Story;
  storyOwner = true;
  storyId: string;

  constructor(
    private storyService: StoryService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.model = new Story('', '', '');
  }

  ngOnInit() {
    this.storyId = this.route.snapshot.paramMap.get('id');
    // hide story title input with this flag
    if (this.storyId) {
      this.storyOwner = false;
    }
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      code: this.inviteCode
    };

    this.dialog.open(JoinSessionDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(JoinSessionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.router.navigate(['/story', this.inviteCode], {
        relativeTo: this.route,
        queryParams: {author: this.model.storyOwner}
      })
    );
  }


  onSubmit() {
    // if user navigated through invite code
    if (this.storyId) {
      // call join session method
      this.storyService.joinSession(this.model, this.storyId).subscribe(
        (data) => {
          this.inviteCode = data._id;
          // direct to write story component on success
          this.router.navigate(['/story', this.inviteCode], {
            relativeTo: this.route,
            queryParams: {author: this.model.storyOwner}
          });
        },
        (error) => {
          return console.log(error);
        }
      );
    } else {
      this.storyService.addNewStory(this.model).subscribe(
        (data) => {
          this.inviteCode = data._id;
          this.openDialog();
        },
        (error) => {
          return console.log(error);
        }
      );
    }
  }


}
