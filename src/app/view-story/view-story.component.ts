import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StoryService} from "../story.service";

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.css']
})
export class ViewStoryComponent implements OnInit {
  storyId: string;
  content: string;
  story: string[];

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
        this.content = this.story.join(', ');
      },
      (error) => {
        return console.log(error);
      }
    );
  }
}
