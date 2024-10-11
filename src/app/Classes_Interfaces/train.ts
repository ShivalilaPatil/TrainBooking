export interface IStation {
  stationID: number;
  stationName: String;
  stationCode: String;
}

export class Search {
  fromStationId: number;
  toStationId: number;
  dateOfTravel: string;

  constructor() {
    this.fromStationId = 0;
    this.toStationId = 0;
    this.dateOfTravel = '';
  }
}

export interface iTrain {
  trainId: number;
  trainNo: number;
  trainName: string;
  departureStationName: string;
  arrivalStationName: string;
  arrivalTime: string;
  departureTime: string;
  totalSeats: number;
  departureDate: string;
  bookedSeats: number;
}

export class CustomerReg {
  passengerID: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;

  constructor() {
    this.passengerID = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.password = '';
  }
}

export interface postApiRegRes {
  message: string;
  result: boolean;
  data: any;
}

export class CustomerLogin  {
  phone: string;
  password: string;


  constructor(){
        this.phone=''
        this.password=''
  }
}

export class passenger {
  passengerName: string
  age: string

  constructor(){
    this.passengerName=''
    this.age=''
  }
}

export interface AllTrains {
  trainId: number
  trainNo: number
  trainName: string
  departureStationName: string
  arrivalStationName: string
  arrivalTime: string
  departureTime: string
  totalSeats: number
  departureDate: string
  bookedSeats: number
}