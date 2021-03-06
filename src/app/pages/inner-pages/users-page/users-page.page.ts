import { Component, OnInit } from '@angular/core';
import { HttpHelperService } from '../../../services/http-helper.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'users-page',
  templateUrl: './users-page.page.html',
  styleUrls: ['./users-page.page.scss'],
})
export class UsersPagePage implements OnInit {

  data: any = null;
  error: any = null;

  constructor(private http: HttpHelperService, private storage: Storage) { }

  async ngOnInit() {
    // const token = await this.storage.get('token');
    this.http.get<any>('auth/me').subscribe(res => {
      this.data = res;
    }, error => {
      this.error = error;
    });
    // try {
    //   this.data = await this.http.get<any>('auth/me').toPromise();
    // } catch (err) {
    //   this.error = err;
    // }
  }

}
