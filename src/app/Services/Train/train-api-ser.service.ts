import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomerLogin, CustomerReg, postApiRegRes } from 'app/Classes_Interfaces/train';

@Injectable({
  providedIn: 'root'
})
export class TrainApiSerService {

  private http=inject(HttpClient)

  apiUrl="https://freeapi.miniprojectideas.com/api/TrainApp/"

  constructor() { }

  getAllStations(){
    return this.http.get(`${this.apiUrl}GetAllStations`)
  }

  getSearchTrain(From:number,To:number,Date:string){
    return this.http.get(`${this.apiUrl}GetTrainsBetweenStations?departureStationId=${From}&arrivalStationId=${To}&departureDate=${Date}`)
  }

  createNewCustomer(obj:CustomerReg){
    return this.http.post<postApiRegRes>(`${this.apiUrl}AddUpdatePassengers`,obj)
  }

  loginCustomer(obj:CustomerLogin){
    return this.http.post<postApiRegRes>(`${this.apiUrl}Login`,obj)
  }

  bookTrain(obj:any){
    return this.http.post<postApiRegRes>(`${this.apiUrl}BookTrain`,obj)
  }

  allTrains(){
    return this.http.get<postApiRegRes>(`${this.apiUrl}GetAllTrains`)
  }

}
