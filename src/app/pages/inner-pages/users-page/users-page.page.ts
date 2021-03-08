import { Component } from '@angular/core';
import { HttpHelperService, API_URL } from '../../../services/http-helper.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'users-page',
  templateUrl: './users-page.page.html',
  styleUrls: ['./users-page.page.scss'],
})
export class UsersPagePage {

  users: User[] = [];
  apiUploads = API_URL + '/uploads/';

  constructor(private http: HttpHelperService) { }

  ionViewDidEnter() {
    this.http.get<User[]>('users').subscribe(users => {
      this.users = users;
    });
  }

  ionViewDidLeave() {
    this.users = [];
  }

}
