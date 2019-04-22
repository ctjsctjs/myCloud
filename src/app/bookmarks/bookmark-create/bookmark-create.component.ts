import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import { BookmarksService } from '../bookmarks.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Bookmark } from "../bookmark.model";

@Component({
  selector: 'app-bookmark-create',
  templateUrl: './bookmark-create.component.html',
  styleUrls: ['./bookmark-create.component.scss']
})
export class BookmarkCreateComponent implements OnInit {

  isLoading = false;
  bookmark: Bookmark;

  constructor(public bookmarksService: BookmarksService, public route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSaveBookmark(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;  
    this.bookmarksService.addBookmark(form.value.url, form.value.name)  
    this.isLoading = false;
    form.resetForm();
  }
}
