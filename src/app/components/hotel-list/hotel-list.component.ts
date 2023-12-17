import { Component, OnInit, inject } from '@angular/core';
import { HotelListCardComponent } from '../hotel-list-card/hotel-list-card.component';
import { NgFor, NgIf } from '@angular/common';
import { CommonService } from 'src/app/service/common.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
  standalone: true,
  imports: [HotelListCardComponent, NgFor, MatProgressSpinnerModule, NgIf],
})
export class HotelListComponent implements OnInit {
  commonService = inject(CommonService);
  isLoading = false;
  hotelList: number[] = Array.from({ length: 6 }).fill(0) as number[]; // adding length 6

  ngOnInit(): void {
    this.commonService.getSearch$.subscribe(() => {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }
}
