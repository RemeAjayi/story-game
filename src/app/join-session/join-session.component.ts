import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { StoryService } from '../story.service';
import { Story } from '../models/story';
import { JoinSessionDialogComponent } from '../join-session-dialog/join-session-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
    this.model = new Story('', '');
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
      data => this.router.navigate(['/story', this.inviteCode], { relativeTo: this.route })
    );
  }


  onSubmit() {
    console.log('Form Has Been Submitted');
    console.log(JSON.stringify(this.model));
    // if user navigated through invite code
    if (this.storyId) {
      // call join session method
      this.storyService.joinSession(this.model, this.storyId).subscribe(
        (data) => {
          // direct to write story component on success
          this.router.navigate(['/story', this.inviteCode], { relativeTo: this.route })
        },
        (error) => {
          return console.log(error);
        }
      );
    }
    // if user is the story owner
    else {
      this.storyService.addNewStory(this.model).subscribe(
        (data) => {
          console.log(data);
        this.inviteCode = data._id;

          this.openDialog();
          return console.log(this.inviteCode);
        },
        (error) => {
          return console.log(error);
        }
      );
    }
  }


}
