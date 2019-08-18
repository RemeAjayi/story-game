import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry';
import { NgModel } from '@angular/forms';
import { StoryService } from '../story.service';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrls: ['./write-story.component.css']
})
export class WriteStoryComponent implements OnInit {

  model: Entry;
  storyId: string;
  messages: [];
  message: string;

  constructor(
    private storyService: StoryService,
    private playerService: PlayerService,
    private route: ActivatedRoute) {
    this.model = new Entry(' ', ' ', 2);
   }

  ngOnInit() {
    this.storyId = this.route.snapshot.paramMap.get('id');
    this.storyService.addNewEntry('hello');
    debugger
    this.storyService.getMessages().subscribe((data) => {
      console.log(data);
    });
  }

 onSubmit()
 {
  //  pass story details with a dataservice and retrieve author  and story id from there
   this.model.author = this.playerService.getAuthor();
   this.model.timestamp = Date.now();
   const obj = {
     id: this.storyId,
     data: this.model
   };
   this.storyService.addNewEntry(this.message);
   debugger;
  //  this.message = '';
 }
}
