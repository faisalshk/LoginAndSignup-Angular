import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    // Load user data from localStorage on component initialization
    const userdata = localStorage.getItem('users');
    if (userdata) this.userData = JSON.parse(userdata);

    // Load current user data from localStorage on component initialization
    const currentuser = localStorage.getItem('currentUser');
    if (currentuser) {
      this.currentUser = JSON.parse(currentuser);
    }

    // Initialize form group with form controls
    this.user = new FormGroup({
      userName: new FormControl(),
      Email: new FormControl(),
      password: new FormControl(),
    });
  }

  // Method to edit user profile
  editProfile(user: FormGroup) {
    // Find user data to be edited based on current user's email
    const editData = this.userData.find(
      (userData) => userData.Email === this.currentUser.Email
    );

    // Check if email, username, or password has been modified
    const emailModified = this.user.value.Email !== this.currentUser.Email;
    const usernameModified =
      this.user.value.userName !== this.currentUser.userName;
    const passwordModified =
      this.user.value.password !== this.currentUser.password;

    // Update user data and display appropriate alerts for each modified field
    if (emailModified) {
      editData.Email = this.user.value.Email || this.currentUser.Email;
      alert('Email Updated!!');
    }
    if (usernameModified) {
      editData.userName = this.user.value.userName || this.currentUser.userName;
      alert('Username Updated!!');
    }
    if (passwordModified) {
      editData.password = this.user.value.password || this.currentUser.password;
      alert('Password Updated');
    }

    // Display an alert if all fields are modified
    if (emailModified && usernameModified && passwordModified) {
      alert('All the details are updated successfully');
    }

    // Update user data in localStorage
    localStorage.setItem('users', JSON.stringify(this.userData));

    // Update current user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(this.userData));

    // Reset form after editing profile
    this.user.reset();
  }

  // Method to logout user
  logout() {
    //confirm the logout from the current user
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }
}
