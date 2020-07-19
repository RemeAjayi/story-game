import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinSessionComponent } from './join-session/join-session.component';
import { WriteStoryComponent } from './write-story/write-story.component';
import { ViewStoryComponent } from './view-story/view-story.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {AllStoriesComponent} from "./all-stories/all-stories.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'story/join', component: JoinSessionComponent },
  {
    path: 'story/join/:id', component: JoinSessionComponent,
  },
  { path: 'story/:id', component: WriteStoryComponent },

  { path: 'story', component: WriteStoryComponent },
  { path: 'story/:id/view', component: ViewStoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'explore', component: AllStoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
