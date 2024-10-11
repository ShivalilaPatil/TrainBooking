import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  CustomerLogin,
  CustomerReg,
  postApiRegRes,
} from './Classes_Interfaces/train';
import { TrainApiSerService } from './Services/Train/train-api-ser.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private _router= inject(Router)
  private trainSer = inject(TrainApiSerService);
  registerObj: CustomerReg = new CustomerReg();
  loginObj: CustomerLogin = new CustomerLogin();
  loggedUser: CustomerReg = new CustomerReg();

  constructor() {
    const localData = localStorage.getItem('trainApp');
    if (localData != null) {
      this.loggedUser = JSON.parse(localData);
    }
  }

  openTrains() {
    this._router.navigate(['/trains'])
  }

  openRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeRegister() {
    const model = document.getElementById('registerModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  openLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'block';
    }
  }
  closeLogin() {
    const model = document.getElementById('loginModel');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  onRegister() {
    this.trainSer
      .createNewCustomer(this.registerObj)
      .subscribe((res: postApiRegRes) => {
        if (res.result) {
          alert('Successfully Registered.');
          this.closeRegister();
        } else {
          alert(res.message);
        }
      });
  }

  onLogin() {
    if (this.loginObj.phone && this.loginObj.password) {
      this.trainSer
        .loginCustomer(this.loginObj)
        .subscribe((res: postApiRegRes) => {
          if (res.result) {
            alert('Successfully Logined.');
            localStorage.setItem('trainApp', JSON.stringify(res.data));
            this.loggedUser = res.data;
            this.closeLogin();
          } else {
            alert(res.message);
          }
        });
    } else {
      alert('Enter all login details');
    }
  }

  LogOut() {
    this.loggedUser = new CustomerReg();
    localStorage.removeItem('trainApp');
  }
}
