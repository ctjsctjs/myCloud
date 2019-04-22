import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router"

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { News } from './news.model';

const API_KEY = "622fd11ecbfb4e779386ebb8dc2df450";
const API_URL = "https://newsapi.org/v2/top-headlines?country=sg&apiKey=" + API_KEY;

@Injectable({ providedIn: 'root' })
export class NewsService {
    private news: News[] = [];
    private newsUpdated = new Subject<News[]>();

    constructor(private http: HttpClient, private router: Router) { }

    getNews() {
        this.http
            .get<{ articles: any }>(API_URL)
            .pipe(
                map((newsData) => {
                    return newsData.articles.map(article => {
                        return {
                            author: article.author,
                            description: article.description,
                            publishedAt: article.publishedAt,
                            source: article.source,
                            title: article.title,
                            url: article.url,
                            urlToImage: article.urlToImage
                        }
                    });
                }))
            .subscribe((data) => {
                console.log(data);
                this.news = data;
                this.newsUpdated.next([...this.news]);
            });
    }

    getNewsUpdateListener() {
        return this.newsUpdated.asObservable();
    }
}