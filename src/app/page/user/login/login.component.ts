import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {UserLogin} from "../../../model/user-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.initForm();

  constructor(private authService: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  private initForm() {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  errorByControlName(controlName: string, error: string) {
    const control = this.loginForm.controls[controlName];
    return control.hasError(error) && (control.touched || control.dirty);
  }

  onSubmit() {
    const user: UserLogin = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };
    console.log(user)
    this.authService.login(user).subscribe(user => {
      console.log("User is logged", user);
    })
  }

}
