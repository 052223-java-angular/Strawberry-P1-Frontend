import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterPayload } from 'src/app/models/payloads/register-payload';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      if (this.registerForm.controls['username'].value.length === 0) {
        this.registerForm.controls['username'].markAsTouched();
      }

      if (this.registerForm.controls['email'].value.length === 0) {
        this.registerForm.controls['email'].markAsTouched();
      }

      if (this.registerForm.controls['password'].value.length === 0) {
        this.registerForm.controls['password'].markAsTouched();
      }

      if (this.registerForm.controls['confirmPassword'].value.length === 0) {
        this.registerForm.controls['confirmPassword'].markAsTouched();
      }

      return;
    }

    const payload: RegisterPayload = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.toastr.success('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.toastr.error(err.error.message);
        } else if (err.status === 401) {
          this.toastr.error(err.error.message);
        }
      },
    });
  }
}
