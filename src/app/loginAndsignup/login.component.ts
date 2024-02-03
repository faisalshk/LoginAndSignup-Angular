import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//this component handles both login and signup functionality

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  login: FormGroup | any;
  signup: FormGroup | any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load user data from localStorage on component initialization
    const locatData = localStorage.getItem('users');
    if (locatData !== null) {
      this.users = JSON.parse(locatData);
    }

    // Initialize login form group with form controls
    this.login = new FormGroup({
      Email: new FormControl(),
      password: new FormControl(),
    });

    // Initialize signup form group with form controls
    this.signup = new FormGroup({
      userName: new FormControl(),
      Email: new FormControl(),
      password: new FormControl(),
    });
  }

  // Method to handle signup form submission
  signupData(signup: FormGroup) {
    // Check if email or username already exists in users array
    const emailAlreadyExists = this.users.find(
      (user) => user.Email === this.signup.value.Email
    );
    const usernameAlreadyExists = this.users.find(
      (user) => user.userName === this.signup.value.userName
    );

    // Display appropriate alert if email or username already exists
    if (emailAlreadyExists || usernameAlreadyExists) {
      if (emailAlreadyExists) {
        alert('Email already exists, Please use a different Email Address');
      } else {
        alert('Username already exists, Please use a different username');
      }
    } else {
      // Add new user to users array and localStorage if email and username are unique
      this.users.push(this.signup.value);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.signup.reset(); // Reset signup form
      alert('Sign up Successful');
    }
  }

  // Method to handle login form submission
  loginData(login: FormGroup) {
    // Check if user exists in users array based on email and password
    const userExists = this.users.find((user) => {
      return (
        user.Email === this.login.value.Email &&
        user.password === this.login.value.password
      );
    });

    // Display appropriate alert based on login success or failure
    if (userExists) {
      alert('Login Successful!');
      localStorage.setItem('currentUser', JSON.stringify(userExists));
      this.router.navigate(['/account']); // Navigate to account page on successful login
    } else {
      alert('Please enter correct details');
    }

    this.login.reset(); // Reset login form
  }
}
