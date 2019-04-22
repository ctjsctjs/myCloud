import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  createBookmark = false;
  
  constructor() { }

  ngOnInit() {
  }

  toggleCreate(){
    this.createBookmark = !this.createBookmark;
  }
}
