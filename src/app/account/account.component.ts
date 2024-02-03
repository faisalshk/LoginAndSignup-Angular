import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  currentUser: any; // Holds the current user data
  userData: any[] = []; // Holds all user data
  user: FormGroup | any; // Form group for user data editing

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Load user data from local storage
    const userdata = localStorage.getItem('users');
    if (userdata) {
      this.userData = JSON.parse(userdata);
    }

    // Load current user data from local storage
    const currentuser = localStorage.getItem('currentUser');
    if (currentuser) {
      this.currentUser = JSON.parse(currentuser);
    }

    // Initialize user form group with form controls
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

    // Update user data with form values or keep them unchanged if form values are empty
    editData.Email = this.user.value.Email || this.currentUser.Email;
    editData.userName = this.user.value.userName || this.currentUser.userName;
    editData.password = this.user.value.password || this.currentUser.password;

    // Update current user data
    this.currentUser = editData;

    // Update user data in local storage
    localStorage.setItem('users', JSON.stringify(this.userData));

    // Update current user data in local storage
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    // Display success message
    alert('Details updated successfully');

    // Reset user form
    this.user.reset();
  }

  // Method to logout user
  logout() {
    // Confirm logout action with user
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Remove current user data from local storage
      localStorage.removeItem('currentUser');

      // Navigate to login page
      this.router.navigate(['/login']);
    }
  }
}
