import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public data = new FormGroup({
    userId : new FormControl(''),
    password: new FormControl('')
  });
  constructor(private httpClient: HttpClient, private router: Router) {}

 public handleSubmit() {
    this.httpClient.post<boolean>('http://localhost:8082/loginUser', this.data.value).subscribe(
      (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          alert('Login successful!');
          
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/user']);
        } else {
          alert('Wrong credentials, please try again.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('Erreur serveur, veuillez réessayer plus tard.');
      }
    );
  }
  
}
