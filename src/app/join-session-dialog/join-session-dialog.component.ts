import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-join-session-dialog',
  templateUrl: './join-session-dialog.component.html',
  styleUrls: ['./join-session-dialog.component.css']
})
export class JoinSessionDialogComponent implements OnInit {

  code: string;
  url: string;
  constructor(private dialogRef: MatDialogRef<JoinSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    // get current url
    this.url = window.location.href;
    this.code = data.code;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
