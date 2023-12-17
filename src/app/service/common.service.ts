import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FormattedDate } from '../components/date-selector/date-selector.component';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  breakpointObserver = inject(BreakpointObserver);

  private selectedDate$: BehaviorSubject<FormattedDate> =
    new BehaviorSubject<FormattedDate>({
      day: 1,
      month: 1,
      monthName: 'Jan',
      year: 2024,
      numberOfSelectedMonth: 1,
    });

  private searchTriggered$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  get getSearch$() {
    return this.searchTriggered$;
  }

  updateSearch(random: number) {
    this.searchTriggered$.next(random);
  }
  // Getter for the current value
  get getSelectedDate$(): Observable<FormattedDate> {
    return this.selectedDate$;
  }

  //updating subject
  updateSelectedDate(obj: FormattedDate) {
    this.selectedDate$.next(obj);
  }

  //date range
  getDateString$ = this.getSelectedDate$.pipe(
    map((item: FormattedDate) =>
      this.getMonthRange(
        item.year,
        item.month,
        item.day,
        item.numberOfSelectedMonth
      )
    )
  );

  getMonthRange(
    startYear: number,
    startMonth: number,
    day: number,
    numberOfSelectedMonth: number
  ) {
    const monthNames = this.getMonthArray;

    // Ensure valid month indices
    if (
      startMonth < 1 ||
      startMonth > 12 ||
      numberOfSelectedMonth < 1 ||
      numberOfSelectedMonth > 12
    ) {
      return 'Invalid month indices or number of months';
    }

    const endMonthIndex = (startMonth - 1 + numberOfSelectedMonth) % 12;
    const startMonthName = monthNames[startMonth - 1]; // Adjusting for zero-based index
    const endMonthName = monthNames[endMonthIndex];

    // If it's 12 months, add the startYear and next year to the output
    const currentYear = numberOfSelectedMonth === 12 ? `, ${startYear}` : '';
    const nextYear = numberOfSelectedMonth === 12 ? `, ${startYear + 1}` : '';

    return `${startMonthName} ${day}${currentYear} - ${endMonthName} ${day}${nextYear}`;
  }

  getModalSize() {
    const size = {
      width: '50vw',
      height: 'auto',
    };
    const isMobileObser = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]);
    isMobileObser.subscribe((data) => {
      if (data.matches) {
        size.height = 'auto';
        size.width = '100vw';
      }
    });
    return size;
  }

  get getMonthArray() {
    return [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
  }
}
