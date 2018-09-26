import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login.service'
import { TokenService } from '../../../../services/token.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = "";
  form: FormGroup;
  captchaUrl: any;
  loading: boolean = false;

  ngOnInit() {
    this.changeCaptcha();
  }

  constructor(private router: Router, fb: FormBuilder, private LoginService: LoginService, private TokenService: TokenService) {
    this.form = fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      captcha: ["", Validators.required],
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.captchaUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get captcha() {
    return this.form.controls.captcha;
  }
  changeCaptcha() {
    this.LoginService.getCaptcha().subscribe((image: Blob) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.captchaUrl = reader.result;
      }, false);
      if (image) {
        reader.readAsDataURL(image);
      }
    })
  }



  submit() {
    this.loading = true;
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    this.LoginService.login(this.userName.value, this.password.value, this.captcha.value)
      .subscribe((data) => {
        this.loading = false;
        if (data.code === 0) {
          console.log(data.token);
          this.TokenService.setToken(data.token, data.expire);
          this.router.navigate(['/wdrw']);
        } else {
          this.error = `账户或密码错误`;
          return;
        }
      })
    // console.log(this.userName.invalid, this.password.invalid);
    // if (this.userName.invalid || this.password.invalid) return;


  }


}
