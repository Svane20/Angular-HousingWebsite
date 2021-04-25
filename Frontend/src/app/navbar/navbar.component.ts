import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedInUser: string;
  constructor(private alertify: AlertifyService) {}

  ngOnInit() {}

  loggedIn() {
    this.loggedInUser = localStorage.getItem('token')!;
    return this.loggedInUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.alertify.success('You are logged out');
  }
}
