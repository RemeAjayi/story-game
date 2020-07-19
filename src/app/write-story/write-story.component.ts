import {Component, HostListener, OnInit, Renderer2, ViewChild, ElementRef} from '@angular/core';
import {Entry} from '../models/entry';
import {NgModel} from '@angular/forms';
import {StoryService} from '../story.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  private storyListVisible = true;
  private isVisible: boolean;
  private screenSize: number;
  @ViewChild('paragraphs', {static: false}) paragraphs: ElementRef;

  constructor(
    private renderer: Renderer2,
    private storyService: StoryService,
    private route: ActivatedRoute,
    private router: Router) {
    this.model = new Entry(' ', ' ', 2);
  }
  @HostListener('window:resize', [])


  ngOnInit() {
    this.screenSize = window.innerWidth;
    console.log(this.screenSize)
    //   this.storyId = this.route.snapshot.paramMap.get('id');
  //   // retrieve author for this url
  //   this.route.queryParams.subscribe(params => {
  //       this.author = params.author;
  //     });
  //   // retrieve story title from backend
  //   this.storyService.getStoryByID(this.storyId).subscribe((data) => {
  //     this.title = data.storyTitle;
  //   });
  //   // retrieve messages emitted
  //   this.storyService.getMessages().subscribe((data) => {
  //     this.messages.push(data.data);
  //   });
  }

  // onSubmit() {
  //   //  pass story details with a dataservice and retrieve author  and story id from there
  //   this.model.author = this.author;
  //   this.model.timestamp = Date.now();
  //   this.model.message = this.message;
  //   const obj = {
  //     id: this.storyId,
  //     data: this.model
  //   };
  //   this.storyService.addNewEntry(obj);
  // }
  // finishStory() {
  //   this.router.navigate(['/story', this.storyId, 'view'], {
  //     relativeTo: this.route});
  // }
  showStoryContent() {
   this.screenSize < 768 ? this.isVisible = true : this.isVisible = false;
   console.log(this.isVisible);
   if (this.isVisible) {
       this.storyListVisible = false;
    // set display of paragraph to block
       this.renderer.setStyle(this.paragraphs.nativeElement, 'display', 'block');
   }


  }
  showStoryList() {
     this.storyListVisible = true;
     this.renderer.setStyle(this.paragraphs.nativeElement, 'display', 'none');
  }
}
