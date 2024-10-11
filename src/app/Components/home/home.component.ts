import { Component, inject } from '@angular/core';
import { TrainApiSerService } from '../../Services/Train/train-api-ser.service';
import { IStation } from '../../Classes_Interfaces/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private _router = inject(Router);
  private _TrainSer = inject(TrainApiSerService);
  stationList: IStation[] = [];

  fromStationId: number = 0;
  toStationId: number = 0;
  dateOfTravel: string = '';

  ngOnInit() {
    this.loadAllStation();
  }

  loadAllStation() {
    this._TrainSer.getAllStations().subscribe((res: any) => {
      this.stationList = res.data;
    });
  }

  onSearch() {
    if (
      this.fromStationId == 0 ||
      this.toStationId == 0 ||
      this.dateOfTravel == ''
    ) {
      alert('Select all Booking Details');
    } else {
      if (this.fromStationId == this.toStationId) {
        alert('From & To station cannot be the same');
      } else
        this._router.navigate([
          '/search',
          this.fromStationId,
          this.toStationId,
          this.dateOfTravel,
        ]);
    }
  }
}
