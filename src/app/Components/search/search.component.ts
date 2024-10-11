import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iTrain, Search ,IStation, passenger, CustomerReg, postApiRegRes} from 'app/Classes_Interfaces/train';
import { TrainApiSerService } from 'app/Services/Train/train-api-ser.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe,FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private _router= inject(Router)
 private _trainSer=inject(TrainApiSerService)
  private _aRoute=inject(ActivatedRoute)

  searchData:Search=new Search()
  TrainList:iTrain[]=[]
  stationList: IStation[] = [];
  selectedTrain?:iTrain
  passenger:passenger=new passenger()
  passengerList:passenger[]=[]
  loggedUserData:CustomerReg=new CustomerReg()

  constructor(){
    const localData =localStorage.getItem('trainApp')

    if(localData!= null){
      this.loggedUserData= JSON.parse(localData)
    }
    this._aRoute.params.subscribe((res:any)=>{
      // debugger
      this.searchData.fromStationId=res.fromStationId
      this.searchData.toStationId=res.toStationId
      this.searchData.dateOfTravel=res.dateOfTravel

      this.getSearchData()
    })
  }

  ngOnInit():void{
    this.loadAllStation()
  }

  loadAllStation() {
    this._trainSer.getAllStations().subscribe((res: any) => {
      this.stationList = res.data;
    });
  }

  getSearchData(){
    this._trainSer.getSearchTrain(this.searchData.fromStationId,this.searchData.toStationId,this.searchData.dateOfTravel).subscribe((res:any)=>{
      this.TrainList=res.data;
      // this.TrainList[0].departureStationName=res.data[0].departureStationName
      // this.TrainList[0].arrivalStationName=res.data[0].arrivalStationName



    })
  }

  openBookModal(train:iTrain){
    this.selectedTrain=train
    const modal=document.getElementById('myBookingModal')

    if(localStorage.getItem('trainApp'))
      {
        if(modal!=null){
          modal.style.display='block'
        }
    }
    else{
      alert('please Register and Login first!!')
    }
   
  }

  closeBookModal(){
    const modal=document.getElementById('myBookingModal')
    if(modal!=null){
      modal.style.display='none'
    }
  }

  addPassenger(){
    const strObj =JSON.stringify(this.passenger)
    const parObj = JSON.parse(strObj)

    this.passengerList.push(parObj)
  }

  removePsg(PsgIndex:number){
    this.passengerList.splice(PsgIndex,1)
  }

  bookTrain(){

    const bookTObj={
      "bookingId": 0,
      "trainId":this.selectedTrain?.trainId ,
      "passengerId":this.loggedUserData.passengerID,
      "travelDate": this.searchData.dateOfTravel,
      "bookingDate": new Date(),
      "totalSeats": 0,
      "TrainAppBookingPassengers": [] as any
    }

    bookTObj.TrainAppBookingPassengers=this.passengerList
    bookTObj.totalSeats=this.passengerList.length
    this._trainSer.bookTrain(bookTObj).subscribe((res:postApiRegRes)=>{
      if(res.result){
        alert('Ticket Booked!!!')
      }
      else{
       alert( res.message)
      }
    })
    this.closeBookModal()
    // 
   
  }







}
