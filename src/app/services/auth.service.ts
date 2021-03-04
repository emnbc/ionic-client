import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
// import { User } from '../models/user.model';
// import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string = null;
//   user = new BehaviorSubject<User>(new User());

  constructor(
    private storage: Storage,
    //   private http: HttpHelperService
  ) {}
  
  setToken(value: string) {
    this._token = value;
  }

  async getToken(): Promise<string> {
    if (this._token) {
      return of(this._token).toPromise();
    } else if (this.getTokenFromStorage()) {
      this.setToken(await this.getTokenFromStorage());
      return this._token;
    } else {
      return of(null).toPromise();
    };
  }

  async setTokenToStorage(token: string): Promise<void> {
    await this.storage.set('token', token);
  }

  async getTokenFromStorage(): Promise<string> {
    if (this.storage.get('token')) {
      return await this.storage.get('token')
    } else return null;
  }

  // checkAuthorization(): Observable<boolean>  {
  //   if (this.user.getValue().id) {
  //     return of(true);
  //   }
  //   if (this.token) {
  //     return this.http.find<User>('auth/me').pipe(map(res => {
  //       if (res?.body?.id) {
  //         this.user.next(new User(res.body));
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }), catchError(() => {
  //       return of(false);
  //     }));
  //   } else {
  //     return of(false);
  //   }
  // }

  refreshUser() {
    // this.http.find<User>('auth/me').subscribe(user => {
    //   this.user.next(user.body);
    // });
  }

  logOut(): void {
    this._token = null;
    this.storage.remove('token');
    // this.user.next(new User());
  }

}