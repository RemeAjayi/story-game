import { TestBed } from '@angular/core/testing';

import { StoryService } from './story.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('StoryService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: StoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(StoryService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Angular default test added when you generate a service using the CLI
  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  // describe('#addCourse()', () => {
  //   // We declare the variables that we'll use for the Test Controller and for our Service
  //   const httpTestingController: HttpTestingController;
  //   const service: StoryService;
  it('returned Observable should match the right data', () => {
    const mockStory = {
      title: 'my story',
      name: 'reme',
      email: 'oajayi@google.com'
    };
    const model = {
      title: 'my story',
      playerName: 'reme',
      playerEmail: 'oajayi@google.com'
    };

    const req = httpTestingController.expectOne('https://sgx-api.herokuapp.com/story');
    service.addNewStory(model)
      .subscribe(storyData => {
        expect(storyData.name).toEqual(mockStory.name);
      });

    expect(req.request.method).toEqual('POST');

    req.flush(mockStory);
  });
});
