import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { CommonService } from 'src/app/service/common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [SearchBarComponent, MatIconModule, NgIf, AsyncPipe],
})
export class NavbarComponent implements OnInit,OnDestroy {
  commonService = inject(CommonService); 
  getDateString$ = this.commonService.getDateString$;
  showSecondSection = false;
  isTabClick = false
  destroyed = new Subject();

  ngOnInit(): void {
    this.getSearch()
  }

  getSearch(){
    this.commonService.getSearch$
    .pipe(takeUntil(this.destroyed))
    .subscribe(()=>{
      this.showSecondSection = false
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (window.scrollY > 100) {
      this.showSecondSection = false;
    }
  }

  toggleSections() {
    this.isTabClick = true
    this.showSecondSection = !this.showSecondSection;
  }

  searchHotel(){
    this.commonService.updateSearch(Math.random())
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  
}
