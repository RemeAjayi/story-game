import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StoryService} from "../story.service";

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.scss']
})
export class ViewStoryComponent implements OnInit {
  storyId: string;
  content: string;
  story: string[];
  storyTitle: string;
  url = window.location.href;
  player1: string;
  player2: string;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService
  ) {
  }

  ngOnInit() {
    this.storyId = this.route.snapshot.paramMap.get('id');
    this.getStory(this.storyId);
  }

  getStory(id) {
    this.storyService.getStoryByID(id).subscribe(
      (data) => {
        console.log(data);
        this.story = data.content;
        this.storyTitle = data.storyTitle;
        this.player1 = data.storyOwnerName;
        this.player2 = data.otherPlayerName;
        this.content = this.story.join(' ');
      },
      (error) => {
        return console.log(error);
      }
    );
  }
}
