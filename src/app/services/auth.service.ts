import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from '../models/user.model';
import { HttpHelperService, TOKEN_KEY } from './http-helper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string = null;
  public user = new BehaviorSubject<User>(new User());

  constructor(
    private storage: Storage,
    private http: HttpHelperService
  ) {}
  
  setToken(value: string) {
    this._token = value;
  }

  async getToken(): Promise<string> {
    const tokenFromStorage = await this.getTokenFromStorage();
    if (this._token) {
      return of(this._token).toPromise();
    } else if (tokenFromStorage) {
      this.setToken(tokenFromStorage);
      return this._token;
    } else {
      return of(null).toPromise();
    };
  }

  async setTokenToStorage(token: string): Promise<void> {
    await this.storage.set(TOKEN_KEY, token);
  }

  async getTokenFromStorage(): Promise<string> {
    const token = await this.storage.get(TOKEN_KEY);
    return token ? token : null;
  }

  checkAuthorization(): Observable<boolean>  {
    if (this.user.getValue().id) {
      return of(true);
    }

    return from(this.getToken().then(async token => {
      if (token) {
        const user = await this.http.getPromise('auth/me');
        if (user.id) {
          this.user.next(new User(user));
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }).catch(() => {
      return false;
    }));

  }

  refreshUser() {
    // this.http.find<User>('auth/me').subscribe(user => {
    //   this.user.next(user.body);
    // });
  }

  async logOut(): Promise<void> {
    this._token = null;
    await this.storage.remove(TOKEN_KEY);
    this.user.next(new User());
  }

}