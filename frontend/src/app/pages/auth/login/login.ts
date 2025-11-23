import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserStateService } from '../../../services/user-state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule   
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  form: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userState: UserStateService  
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.http.post<any>('http://localhost:5010/auth/login', { email, password })
      .subscribe({
        next: (res) => {

          localStorage.setItem('token', res.token);

          this.http.get<any>('http://localhost:5010/profile/me', {
            headers: { Authorization: `Bearer ${res.token}` }
          }).subscribe(profileRes => {

            localStorage.setItem('profile', JSON.stringify(profileRes.profile));
            this.userState.updateUser(profileRes.profile);
            this.router.navigate(['/']);
          });
        },
        error: (err) => {
          alert(err.error?.error || "Erro ao fazer login");
        }
      });
  }
}
