import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';


import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JoinSessionComponent } from './join-session/join-session.component';
import { WriteStoryComponent } from './write-story/write-story.component';
import { ViewStoryComponent } from './view-story/view-story.component';
import { JoinSessionDialogComponent } from './join-session-dialog/join-session-dialog.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AllStoriesComponent } from './all-stories/all-stories.component';
import { PlayerService } from './services/player.service';
import { StoryService } from './services/story.service';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { AddStoryComponent } from './add-story/add-story.component';
import { AddPlayerComponent } from './add-player/add-player.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    JoinSessionComponent,
    WriteStoryComponent,
    ViewStoryComponent,
    JoinSessionDialogComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AllStoriesComponent,
    ComingSoonComponent,
    AddStoryComponent,
    AddPlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    PlayerService,
    StoryService
  ],
  bootstrap: [AppComponent],
  entryComponents: [JoinSessionDialogComponent]
})
export class AppModule { }
