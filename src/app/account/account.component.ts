import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  currentUser: any;
  userData: any[] = [];
  user: FormGroup | any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const userdata = localStorage.getItem('users');
    if (userdata) this.userData = JSON.parse(userdata);

    const currentuser = localStorage.getItem('currentUser');
    if (currentuser) {
      this.currentUser = JSON.parse(currentuser);
      console.log(this.currentUser);
    }

    this.user = new FormGroup({
      userName: new FormControl(),
      Email: new FormControl(),
      password: new FormControl(),
    });
  }

  editProfile(user: FormGroup) {
    const editData = this.userData.find(
      (user) => user.Email === this.currentUser.Email
    );

    editData.Email = this.user.value.Email || this.currentUser.Email;
    editData.userName = this.user.value.userName || this.currentUser.userName;
    editData.password = this.user.value.password || this.currentUser.password;

    this.currentUser = editData;

    localStorage.setItem('users', JSON.stringify(this.userData));

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    alert('Details updated successfully');

    this.user.reset();
  }

  logout() {
    const confirmLogout = window.confirm('are you sure, you want to logout');
    if (confirmLogout) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }
}
