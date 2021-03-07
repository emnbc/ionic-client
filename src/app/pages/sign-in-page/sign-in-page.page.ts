import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpHelperService } from '../../services/http-helper.service';

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
  authState: boolean = null;

  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpHelperService
  ) { }

  ionViewWillLeave() {
    this.authData = { username: null, password: null };
    this.error = null;
    this.authState = null;
    this.loading = false;
  }

  async login() {
    this.error = null;
    this.loading = true;
    this.http.post<any>('auth/login', this.authData).subscribe(async res => {
      if (res.accessToken) {
        await this.auth.setTokenToStorage(res.accessToken);
        this.router.navigate(['/main']);
      }
      // this.loading = false;
    }, error => {
      this.error = error.error;
      this.loading = false;
    });
  }

}
