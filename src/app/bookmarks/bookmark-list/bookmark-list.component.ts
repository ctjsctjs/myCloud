import { Component, OnInit, Input } from '@angular/core';
import { BookmarksService } from '../bookmarks.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import { Bookmark } from '../bookmark.model';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})

export class BookmarkListComponent implements OnInit {

  bookmarks: Bookmark[] = []
  // @Input() editBookmarkSubject:Subject<any>;

  constructor(public bookmarksService: BookmarksService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.bookmarksService.getBookmarks();
    this.bookmarksService.getBookmarkUpdateListener()
    .subscribe((bookmarks: Bookmark[])=>{
      this.bookmarks = bookmarks
    });
  }

  deleteBookmark(bookmarkId: string){
    console.log(bookmarkId)
    this.bookmarksService.onDelete(bookmarkId);
  }
}
