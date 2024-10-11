import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AllTrains } from 'app/Classes_Interfaces/train';
import { TrainApiSerService } from 'app/Services/Train/train-api-ser.service';

@Component({
  selector: 'app-trains',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.css',
})
export class TrainsComponent {
  private trainSer = inject(TrainApiSerService);

  allTrainData: AllTrains[] = [];

  constructor() {
    this.getAllTrains();
  }

  getAllTrains() {
    this.trainSer.allTrains().subscribe((res) => {
      this.allTrainData = res.data;
    });
  }
}
