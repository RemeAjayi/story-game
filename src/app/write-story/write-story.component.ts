import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry';
import { NgModel } from '@angular/forms';
import { StoryService } from '../story.service';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrls: ['./write-story.component.css']
})
export class WriteStoryComponent implements OnInit {

  model: Entry;

  constructor(private storyService: StoryService, private playerService: PlayerService) {
    this.model = new Entry('', '', 2);
   }

  ngOnInit() {
  }
 onSubmit()
 {
  //  pass story details with a dataservice and retrieve author  and story id from there
   this.model.author = this.playerService.getAuthor();
   this.model.timestamp = Date.now();
   this.storyService.addNewEntry('5d4ee6cd0312902f646794dc',this.model);
 }
}
