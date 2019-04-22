import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewsService } from './news.service';
import { News } from './news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: News[] = [];
  private newsSub: Subscription;

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews();
    this.newsSub = this.newsService.getNewsUpdateListener().subscribe((news: News[])=>{
      this.news = news;
    });
    console.log;
  }
}
