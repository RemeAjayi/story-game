import { Component, OnInit } from '@angular/core';
import {Config} from "../models/Config";

@Component({
  selector: 'app-all-stories',
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.scss']
})
export class AllStoriesComponent implements OnInit {
  categories = Config.CATEGORY_LIST;

  constructor() { }

  ngOnInit() {
  }
  toggleCheckedClass(obj) {
    obj.checked = !obj.checked;
  }
}
