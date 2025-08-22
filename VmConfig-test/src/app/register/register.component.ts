import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 register = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl('')
  });
constructor(private httpClient: HttpClient, private router: Router) {}

  public handleSubmit() {
    console.log(this.register.value);
    this.httpClient.post('http://localhost:8082/addUser', this.register.value).subscribe
    (
      (data:any) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },  (error) => {
        alert('Registration failed!');
      }
    );
  }

}
