import { Injectable } from '@angular/core';
import { from, Observable, of} from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { HttpHelperService } from './http-helper.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService,
    private http: HttpHelperService
  ) {}

  checkAuthorization(): Observable<boolean>  {
    if (this.auth.user.getValue().id) {
      return of(true);
    }

    return from(this.auth.getToken().then(async token => {
      if (token) {
        try {
          const res = await this.http.get<User>('auth/me', {});
          if (res.data.id) {
            this.auth.user.next(new User(res.data));
            return true;
          }
        } catch {
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

}