import { Component, inject } from '@angular/core';
import { MonthSelectorComponent } from '../month-selector/month-selector.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CommonService } from 'src/app/service/common.service';

export enum SearchableItemString {
  when = 'when',
  where = 'where',
  guest = 'guest',
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [MonthSelectorComponent, NgIf, MatIconModule, NgClass, AsyncPipe],
})
export class SearchBarComponent {
  commonService = inject(CommonService);
  getDateString$ = this.commonService.getDateString$;
  message = `Select your stay duration in the 'When' tab and start planning.`;
  activeSearchItem = '';
  isSearchClicked = false;
  searchableItemString = SearchableItemString;

  constructor() {
    //Enable 'when' tab on laod
    this.getSelectedItem(this.searchableItemString.when);
  }

  getSelectedItem(key: string) {
    this.activeSearchItem = key;

    if (key === this.searchableItemString.guest && this.isSearchClicked) {
      this.message = 'Loading...';

      //hide msg
      setTimeout(() => {
        this.message = '';
      }, 800);

      //set isSearchClicked false
      this.isSearchClicked = false;
    }
  }

  searchHotel() {
    this.isSearchClicked = true;
    this.commonService.updateSearch(Math.random())
  }
}
