import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AuthService } from '../../../services/auth.service'
import { UserStateService } from '../../../services/user-state';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [provideNgxMask()]
})
export class Register {

  name: string = '';
  cpf: string = '';
  email: string = '';
  password: string = '';
  birthday: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userState: UserStateService
  ) {}

  register() {
    console.log("birthday:", this.birthday);

    const cpfNoMask = this.cpf.replace(/\D/g, '');

    let dateRaw = this.birthday.replace(/\D/g, "");

    if (dateRaw.length === 8) {
      const dia = dateRaw.substring(0, 2);
      const mes = dateRaw.substring(2, 4);
      const ano = dateRaw.substring(4, 8);
      this.birthday = `${ano}-${mes}-${dia}`;
    }

    const payload = {
      name: this.name,
      cpf: cpfNoMask,
      email: this.email,
      password: this.password,
      birthday: this.birthday
    };

    this.authService.register(payload).subscribe({
      next: (res: any) => {

        console.log('Usuário criado', res);

        localStorage.setItem('token', res.token);

        this.userState.updateUser(res.user);

        alert("Registrado com sucesso!");

        this.router.navigate(['/auth/profile']);
      },
      error: (err) => {
        alert(err.error.error || "Erro ao registrar-se");
      }
    });
  }
}
