import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from '../models/user.model';

export const TOKEN_KEY = 'ic_access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string = null;
  public user = new BehaviorSubject<User>(new User());

  constructor(private storage: Storage) {}
  
  setToken(value: string) {
    this._token = value;
  }

  async getToken(): Promise<string> {
    const tokenFromStorage = await this.getTokenFromStorage();
    if (this._token) {
      return this._token;
    } else if (tokenFromStorage) {
      this.setToken(tokenFromStorage);
      return this._token;
    } else {
      return null;
    };
  }

  async setTokenToStorage(token: string): Promise<void> {
    await this.storage.set(TOKEN_KEY, token);
  }

  async getTokenFromStorage(): Promise<string> {
    const token = await this.storage.get(TOKEN_KEY);
    return token ? token : null;
  }

  async logOut(): Promise<void> {
    this._token = null;
    await this.storage.remove(TOKEN_KEY);
    this.user.next(new User());
  }

}