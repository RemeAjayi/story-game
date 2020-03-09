import {Component, OnInit} from '@angular/core';
import {Entry} from '../models/entry';
import {NgModel} from '@angular/forms';
import {StoryService} from '../story.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrls: ['./write-story.component.scss']
})
export class WriteStoryComponent implements OnInit {

  model: Entry;
  storyId: string;
  title: string;
  author: string;
  messages = [];
  message: string;
  date = new Date();

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute,
    private router: Router) {
    this.model = new Entry(' ', ' ', 2);
  }

  ngOnInit() {
    this.storyId = this.route.snapshot.paramMap.get('id');
    // retrieve author for this url
    this.route.queryParams.subscribe(params => {
        this.author = params.author;
      });
    // retrieve story title from backend
    this.storyService.getStoryByID(this.storyId).subscribe((data) => {
      this.title = data.storyTitle;
    });
    // retrieve messages emitted
    this.storyService.getMessages().subscribe((data) => {
      this.messages.push(data.data);
    });
  }

  onSubmit() {
    //  pass story details with a dataservice and retrieve author  and story id from there
    this.model.author = this.author;
    this.model.timestamp = Date.now();
    this.model.message = this.message;
    const obj = {
      id: this.storyId,
      data: this.model
    };
    this.storyService.addNewEntry(obj);
  }
  finishStory() {
    this.router.navigate(['/story', this.storyId, 'view'], {
      relativeTo: this.route});
  }
}
