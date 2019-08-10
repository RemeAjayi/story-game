import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinSessionComponent } from './join-session/join-session.component';
import { WriteStoryComponent } from './write-story/write-story.component';
import { ViewStoryComponent } from './view-story/view-story.component';

const routes: Routes = [
  { path: '', redirectTo: 'story/join', pathMatch:'full' },
  { path: 'story/join', component: JoinSessionComponent },
  {
    path: 'story/join/:id', component: JoinSessionComponent,
  },
  { path: 'story/:id', component: WriteStoryComponent },
  { path: 'story/:id/view', component: ViewStoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
