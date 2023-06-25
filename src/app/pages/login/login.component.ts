import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPayload } from 'src/app/models/payloads/login-payload';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      if (this.loginForm.controls['username'].value.length == 0) {
        this.loginForm.controls['username'].markAllAsTouched();
      }
      if (this.loginForm.controls['password'].value.length == 0) {
        this.loginForm.controls['password'].markAllAsTouched();
      }
      return;
    }

    const payload: LoginPayload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.auth.login(payload).subscribe({
      next: (resp) => {
        const auth: Auth = { ...resp };
        window.sessionStorage.setItem('auth', JSON.stringify(auth));

        this.toastr.success('Login successful');
        this.loginForm.reset();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        if (err.status === 404) {
          this.toastr.error('Invalid credentials', 'Error');
        }
      },
    });
  }
}
