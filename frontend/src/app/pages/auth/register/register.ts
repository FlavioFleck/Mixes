import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask';
import { AuthService } from '../../../services/auth.service'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [ provideNgxMask() ]
})
export class Register {

  name: string = '';
  cpf: string = '';
  email: string = '';
  password: string = '';
  birthday: string = '';

  constructor(private authService: AuthService) {

  }

  register(){
    const cpfNoMask = this.cpf.replace(/\D/g,'');

    function formatDate(date: string) {
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`;
    } 

    const payload = {
      name: this.name,
      cpf: cpfNoMask,
      email: this.email,
      password: this.password,
      birthday: this.birthday.includes('/') ? 
      formatDate(this.birthday):this.birthday
    };

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        console.log('Usuário criado', res);
        localStorage.setItem('token', res.token);
        alert("Registrado com sucesso!");
      },
      error: (err) =>{
        alert(err.error.error || "Erro ao registrar-se");
      }
    });
  }
}
