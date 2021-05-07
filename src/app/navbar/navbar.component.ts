import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  id: string;
  isId: boolean;
  constructor(private storageService: StorageService) { }

  ngOnInit() {
   this.id = this.storageService.getCurrentUserId();
   this.isId = this.storageService.getAuthToken();
  }

}
