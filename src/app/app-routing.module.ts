import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinSessionComponent } from './join-session/join-session.component';
import { WriteStoryComponent } from './write-story/write-story.component';
import { ViewStoryComponent } from './view-story/view-story.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {AllStoriesComponent} from "./all-stories/all-stories.component";
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AddStoryComponent } from './add-story/add-story.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',  redirectTo: '', pathMatch: 'full'},
  { path: 'story/share/:id', component: JoinSessionComponent },
  {
    path: 'story/join/:id', component: JoinSessionComponent,
  },
  { path: 'story/write/:id', component: WriteStoryComponent },

  // { path: 'story/write', component: WriteStoryComponent },
  { path: 'story/view/:id', component: ViewStoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'explore', component: AllStoriesComponent},
  { path: 'coming-soon', component: ComingSoonComponent},
  { 
    path: 'add-player',
   component: AddPlayerComponent},
  {
    path: 'add-story', 
    component: AddStoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
