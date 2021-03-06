import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

const API_URL = 'http://nest-angular.emnbc.com/api';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(
    private http: HTTP,
    private storage: Storage
  ) { }

  get<T>(url: string): Observable<T> {
    return from(this.authHeader().then(token => {
      return this.http.get(`${API_URL}/${url}`, {}, token)
    })).pipe(map(res => JSON.parse(res.data)));
  }

  post<T>(url: string, body: any): Observable<T> {
    return from(this.http.post(`${API_URL}/${url}`, body, {})).pipe(map(res => {
      return JSON.parse(res.data);
    }));
  }

  private async authHeader() {
    const token = await this.storage.get('token');
    return token ? {'Authorization': `Bearer ${token}`} : {};
  }

}