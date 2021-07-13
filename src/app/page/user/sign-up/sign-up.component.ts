import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/user";

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

    console.log(this.signupForm.get('address'))
    console.log(this.signupForm)
  }

  private initForm() {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        city: ['', [Validators.required]]
      })
    });
  }

  errorByControlName(controlName: string, error: string) {
    const control = this.signupForm.get(controlName);
    return control?.hasError(error) && (control?.touched || control?.dirty);
  }

  /**
   * return true if a field validator is triggered otherwise return false. See an exemple in the address street input field.
   * @param formGroupName nested formgroup name
   * @param controlName formcontrol name
   * @param error validator error
   */
  errorByFormGroupName(formGroupName: string, controlName: string, error: string) {
    const controls = this.signupForm.controls;
    if (controls[formGroupName] instanceof FormGroup) {
      return controls[formGroupName].get(controlName)?.hasError(error) &&
        (controls[formGroupName].get(controlName)?.touched || controls[formGroupName].get(controlName)?.dirty)
    }
    return this.errorByControlName(controlName, error);
  }

  onSubmit() {
    const user: User = this.signupForm.value;

    console.log(user)

    this.authService.register(user).subscribe(user => {
      console.log("User is registered", user);
    })
  }
}
