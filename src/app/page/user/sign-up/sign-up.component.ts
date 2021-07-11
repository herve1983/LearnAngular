import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup = this.initForm();

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  private initForm() {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  errorByControlName(controlName: string, error: string) {
    const control = this.signupForm.controls[controlName];
    return control.hasError(error) && (control.touched || control.dirty);
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
