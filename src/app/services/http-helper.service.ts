import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';

export const API_URL = 'http://nest-angular.emnbc.com';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'options' | 'upload' | 'download';
interface HttpOptions {
  method: HttpMethod;
  params?: {
    [index: string]: string;
  };
  data?: {
    [index: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(
    private http: HTTP,
    private storage: Storage,
    private auth: AuthService
  ) { }

  async get<T>(url: string, params: any) {
    return this.sendRequest<T>(url, {method: 'get', params});
  }

  async post<T>(url: string, body: any) {
    return this.sendRequest<T>(url, {method: 'post', data: body});
  }

  async sendRequest<T>(url: string, options: HttpOptions) {

    return this.http.sendRequest(`${API_URL}/api/${url}`, {
      ...options,
      headers: await this.authHeader()
    }).then((response: HTTPResponse) => {
      return {
        data: response.data ? JSON.parse(response.data) as T : null,
        headers: response.headers,
        status: response.status
      };
    }).catch(async (error: HTTPResponse) => {
      if (error.status = 401) {
        await this.auth.logOut();
      }
      throw error;
    });

  }


  private async authHeader() {
    const token = await this.auth.getToken();
    return token ? {'Authorization': `Bearer ${token}`} : {'Authorization': ''};
  }

  // Error response example:
  // error: "{"statusCode":404,"message":"Cannot GET /api/me","error":"Not Found"}"
  // headers: {date: "Sun, 14 Mar 2021 16:29:35 GMT", content-length: "75", x-android-selected-protocol: "http/1.1", x-android-response-source: "NETWORK 404", x-android-received-millis: "1615739375117", …}
  // status: 404
  // url: "http://example.com/api/me"

}