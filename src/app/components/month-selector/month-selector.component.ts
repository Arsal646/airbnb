import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  inject,
  OnDestroy,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  DateSelectorComponent,
  FormattedDate,
} from '../date-selector/date-selector.component';
import { CommonService } from 'src/app/service/common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss'],
  standalone: true,
  imports: [MatDialogModule],
})
export class MonthSelectorComponent implements OnInit,OnDestroy {
  commonService = inject(CommonService);
  destroyed = new Subject();
  numberOfSelectedMonth = 1;

  //default value
  dateObj: FormattedDate = {
    monthName: 'Jan',
    month: 1,
    day: 1,
    year: 2024,
    numberOfSelectedMonth: 1,
  };

  dialog = inject(MatDialog);
  @ViewChild('dotsContainer', { static: true })
  dotsContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('progressCircle', { static: true })
  progressCircleRef!: ElementRef<SVGCircleElement>;
  @ViewChild('monthSpan', { static: true })
  monthSpanRef!: ElementRef<HTMLHeadingElement>;

  ngOnInit(): void {
    this.generateDots();
    this.getSelectedData();
  }

  getSelectedData() {
    this.commonService.getSelectedDate$
      .pipe(takeUntil(this.destroyed))
      .subscribe((selectedDate) => {

        this.dateObj = selectedDate;
        const totalMonths = 12; //dots
        const fromSubscribe = true;

        this.updateProgress(
          this.dateObj.numberOfSelectedMonth - 1,
          totalMonths,
          fromSubscribe
        );
      });
  }

  generateDots() {
    const dotsContainer = this.dotsContainerRef.nativeElement;
    const radius = 100;
    const numberOfDots = 12;

    for (let i = 0; i < numberOfDots; i++) {
      const angle = (i / numberOfDots) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const dot = document.createElement('div') as HTMLDivElement;
      dot.classList.add('dot');
      dot.style.transform = `translate(${x}px, ${y}px)`;

      const innerDot = document.createElement('div') as HTMLDivElement;
      innerDot.classList.add('inner-dot');

      dot.appendChild(innerDot);

      dot.addEventListener('click', () => this.updateProgress(i, numberOfDots));

      dotsContainer.appendChild(dot);
    }
  }

  updateProgress(dotIndex: number, totalDots: number, fromSubscribe?: boolean) {
    const progressCircle = this.progressCircleRef.nativeElement;
    const monthSpan = this.monthSpanRef.nativeElement;
    const circumference = 2 * Math.PI * 100;
    const progress = (dotIndex / totalDots) * circumference;

    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference - progress}`;

    const numberOfSelectedMonth = dotIndex + 1;
    monthSpan.textContent = `${numberOfSelectedMonth}`;
    this.numberOfSelectedMonth = numberOfSelectedMonth;

    //updating behaviour subject
    if (!fromSubscribe) {
      this.dateObj.numberOfSelectedMonth = numberOfSelectedMonth;
      this.commonService.updateSelectedDate(this.dateObj);
    }

    if (dotIndex === 0) {
      progressCircle.style.strokeDasharray = '867.08';
      progressCircle.style.strokeDashoffset = '867';
    }
  }

  openDataCalender() {
    const size = this.commonService.getModalSize()
    const dialogRef = this.dialog.open(DateSelectorComponent, {
      data: {},
      height: size.height,
      width: size.width,
    });

    dialogRef.afterClosed().subscribe((dateObj: FormattedDate) => {
      dateObj.numberOfSelectedMonth = this.numberOfSelectedMonth;
      this.dateObj = dateObj;
      this.commonService.updateSelectedDate(dateObj);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }
}
