import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

export const TOKEN_KEY = 'ic_access_token';
export const API_URL = 'http://nest-angular.emnbc.com/api';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(
    private http: HTTP,
    private storage: Storage
  ) { }

  get<T>(url: string): Observable<T> {
    return from(this.authHeader().then(authHeader => {
      return this.http.get(`${API_URL}/${url}`, {}, authHeader)
    })).pipe(map(res => JSON.parse(res.data)));
  }

  post<T>(url: string, body: any): Observable<T> {
    return from(this.authHeader().then(authHeader => {
      return this.http.post(`${API_URL}/${url}`, body, authHeader)
    })).pipe(map(res => JSON.parse(res.data)));
  }

  async getPromise(url: string) {
    const authHeader = await this.authHeader();
    return this.http.get(`${API_URL}/${url}`, {}, authHeader).then(res => {
      return JSON.parse(res.data);
    }).catch(err => {
      return err;
    })
  }

  private async authHeader() {
    const token = await this.storage.get(TOKEN_KEY);
    return token ? {'Authorization': `Bearer ${token}`} : {};
  }

}