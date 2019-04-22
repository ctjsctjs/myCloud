import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router"

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bookmark } from './bookmark.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/bookmarks/";

@Injectable({ providedIn: 'root'})
export class BookmarksService {
    private bookmarks: Bookmark[] = [];
    private bookmarksUpdated = new Subject<Bookmark[]>();

    constructor(private http: HttpClient, private router: Router) { }

    addBookmark(url: string, name: string) {
        console.log(url)
        console.log(name)
        const bookmark: Bookmark = { id: null, url: url, name: name };
        this.http
        .post<{ message: string, bookmarkId: string }>(BACKEND_URL, bookmark)
        .subscribe((responseData) => {
            const bookmarkId = responseData.bookmarkId;
            bookmark.id = bookmarkId;
            this.bookmarks.push(bookmark);
            this.bookmarksUpdated.next([...this.bookmarks]);
            console.log(responseData)
        });
    }
    
    getBookmarks() {
        this.http
          .get<{ message: string, bookmarks: any }>(
            BACKEND_URL
          )
          .pipe(
            map((data) => {
              return data.bookmarks.map(data => {
                return {
                  url: data.url,
                  name: data.name,
                  id: data._id,
                  creator: data.creator
                }
              });
            }))
          .subscribe((transformedtasks) => {
            console.log(transformedtasks);
            this.bookmarks = transformedtasks;
            this.bookmarksUpdated.next([...this.bookmarks]);
          });
      }

      getBookmarkUpdateListener() {
        return this.bookmarksUpdated.asObservable();
      }

      onDelete(bookmarkId: string) {
        this.http.delete(BACKEND_URL + bookmarkId)
          .subscribe(() => {
            const updateBookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
            this.bookmarks = updateBookmarks;
            this.bookmarksUpdated.next([...this.bookmarks]);
          })
      }
}