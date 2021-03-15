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

  pagination = {
    currentPage: 1,
    totalCount: 1,
    size: 10
  }

  constructor(private http: HttpHelperService) { }

  ngOnInit() {
    this.firstLoading = true;
    this.getUsers();
  }

  getUsers(event?: any) {
    const params = {
      page: '1',
      size: '20'
    };
    this.pagination.currentPage = 2;

    this.http.get<User[]>('users', params).then(res => {
      this.users = res.data;
      setTimeout(() => { // fake time out =)
        this.firstLoading = false;
      }, 500);
      event?.target?.complete();
    }).catch(() => {
      this.firstLoading = false;
      event?.target?.complete();
    });

  }

  loadUsers(event?: any) {
    const params = {
      page: (this.pagination.currentPage + 1).toString(),
      size: this.pagination.size.toString()
    };

    this.http.get<User[]>('users', params).then(res => {
      this.users = [...this.users, ...res.data];
      this.pagination.currentPage++;

      event?.target?.complete();
    }).catch(() => {
      event?.target?.complete();
    });

  }

}
