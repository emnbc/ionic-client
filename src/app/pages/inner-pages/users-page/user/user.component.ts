import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { User } from '../../../../models/user.model';
import { API_URL, HttpHelperService } from '../../../../services/http-helper.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

  user: User = null;
  apiUploads = API_URL + '/uploads/';

  constructor(
    private route: ActivatedRoute,
    private http: HttpHelperService,
    private loadingController: LoadingController
  ) { }

  ionViewDidEnter() {
    this.getUsers();
  }

  ionViewWillLeave() {
    this.user = null;
  }

  private async getUsers() {
    const loading = await this.loadingController.create({message: 'Please wait...'});
    await loading.present();
    const id = this.route.snapshot.params?.id;
    this.http.get<User>('users/' + id).subscribe(async user => {
      this.user = user;
      await loading.dismiss();
    }, async () => {
      await loading.dismiss();
    });
  }

}
