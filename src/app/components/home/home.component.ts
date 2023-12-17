import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from '../hotel-list/hotel-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HotelListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
