import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in-page.page.html',
  styleUrls: ['./sign-in-page.page.scss'],
})
export class SignInPage {

  authData = {
    username: null,
    password: null
  };

  loading: boolean = false;
  error: string = null;

  constructor(
    private http: HTTP,
    private router: Router,
    private auth: AuthService
  ) { }

  ionViewWillLeave() {
    this.authData = { username: null, password: null };
    this.error = null;
  }

  async login() {
    this.error = null;
    this.loading = true;
    this.http.post('http://nest-angular.emnbc.com/api/auth/login', this.authData, {})
      .then(async res => {
        const data = JSON.parse(res.data);
        if (data?.accessToken) {
          await this.auth.setTokenToStorage(data.accessToken);
          this.router.navigate(['/main']);
        }
        this.loading = false;
      })
      .catch(error => {
        this.error = error.error;
        this.loading = false;
      });
  }

}
