import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-join-session-dialog',
  templateUrl: './join-session-dialog.component.html',
  styleUrls: ['./join-session-dialog.component.css']
})
export class JoinSessionDialogComponent implements OnInit {

  code: string;

  constructor(private dialogRef: MatDialogRef<JoinSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.code = data.code;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
