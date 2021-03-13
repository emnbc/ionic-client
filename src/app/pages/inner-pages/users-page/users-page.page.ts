import { Component, OnInit } from '@angular/core';
import { HttpHelperService, API_URL } from '../../../services/http-helper.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'users-page',
  templateUrl: './users-page.page.html',
  styleUrls: ['./users-page.page.scss'],
})
export class UsersPagePage implements OnInit {

  users: User[] = [];
  apiUploads = API_URL + '/uploads/';
  firstLoading: boolean = false;

  constructor(private http: HttpHelperService) { }

  ngOnInit() {
    this.firstLoading = true;
    this.getUsers();
  }

  getUsers(event?: any) {
    this.http.get<User[]>('users').subscribe(users => {
      this.users = users;
      this.firstLoading = false;
      event?.target?.complete();
    }, () => {
      this.firstLoading = false;
      event?.target?.complete();
    });
  }

}
