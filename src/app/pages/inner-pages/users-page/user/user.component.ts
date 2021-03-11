import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { API_URL, HttpHelperService } from '../../../../services/http-helper.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  user: User = null;
  apiUploads = API_URL + '/uploads/';

  constructor(
    private route: ActivatedRoute,
    private http: HttpHelperService
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.getUsers();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.user = null;
  }

  private getUsers() {
    const id = this.route.snapshot.params?.id;
    this.http.get<User>('users/' + id).subscribe(user => {
      this.user = user;
    }, () => { });
  }

}
