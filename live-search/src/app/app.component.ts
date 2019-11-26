import {Component, OnInit} from '@angular/core';

import * as data from './source';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'live-search';
  media: ListItem[] = data.data;

  liveSearch = new Subject();

  initMedia: ListItem[] = [...data.data];
  filter = [
    'Videos',
    'Interactive Video',
    'Audio',
    'Images',
    'Documents'
  ];

  selectedFilter: string;
  sortDir: 'ASC' | 'DESC' = 'ASC';

  clear() {
    this.sortDir = 'ASC';
    this.media = [...this.initMedia];
  }

  filterByType(filterOption: string) {
    this.selectedFilter = filterOption;

    this.media = this.initMedia.filter((item) => {
      return item.type === filterOption;
    })
  }

  filterByKeyword(keyword: string) {
    this.media = this.media.filter(item => {
      return item.title.includes(keyword) === true;
    })
  }

  sortMedia(dir: 'ASC' | 'DESC') {
    this.media.sort(function (itemA: ListItem, itemB: ListItem) {
      const date1 = new Date(itemA.created);
      const date2 = new Date(itemB.created);
      if (dir === 'ASC') {
        return date1.getTime() - date2.getTime();
      } else {
        return date2.getTime() - date1.getTime();
      }
    })
  }

  ngOnInit(): void {
    this.liveSearch.subscribe((keyword:string) => {
      this.filterByKeyword(keyword);
    })
  }

  changeSortDir() {
    if (this.sortDir === 'ASC') {
      this.sortDir = 'DESC';

    } else {
      this.sortDir = 'ASC';
    }
    this.sortMedia(this.sortDir);
  }
}

export interface ListItem {
  title: string;
  type: string;
  created: string
}
