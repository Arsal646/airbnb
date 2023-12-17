import { Component, inject } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/service/common.service';
import { MatNativeDateModule } from '@angular/material/core';

export interface FormattedDate {
  day: number;
  month: number;
  monthName: string;
  year: number;
  numberOfSelectedMonth: number;
}

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  standalone:true,
  imports: [MatDatepickerModule,MatNativeDateModule],
})
export class DateSelectorComponent {
  commonService = inject(CommonService)
  constructor(
    public dialogRef: MatDialogRef<DateSelectorComponent>
  ) {}

  selectedDate!: Date;
  nextMonthDate = new Date(new Date().setMonth(new Date().getMonth() + 1));

  onSelect(dateString: Date) {
    this.selectedDate = dateString;
    //this.dialogRef.close(this.selectedDate)
  }

  apply() {
    const months = this.commonService.getMonthArray
    const formattedDate: FormattedDate = {
      day: new Date(this.selectedDate).getDate(),
      month: new Date(this.selectedDate).getMonth() + 1,
      monthName: months[new Date(this.selectedDate).getMonth()],
      year: new Date(this.selectedDate).getFullYear(),
      numberOfSelectedMonth: 1,
    };
    this.dialogRef.close(formattedDate);
  }
}
