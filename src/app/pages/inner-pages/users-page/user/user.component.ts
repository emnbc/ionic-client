import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { User } from '../../../../models/user.model';
import { API_URL, HttpHelperService } from '../../../../services/http-helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

  user: User = null;
  apiUploads = API_URL + '/uploads/';
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpHelperService,
    private loadingController: LoadingController,
    private platform: Platform,
    private router: Router
  ) { }

  ionViewDidEnter() {
    this.getUser();
    this.subscription = this.platform.backButton.subscribeWithPriority(20, () => {
      this.router.navigate(['/main/users']);
    });
  }

  ionViewWillLeave() {
    this.user = null;
    this.subscription.unsubscribe();
  }

  private async getUser() {
    const loading = await this.loadingController.create({message: 'Please wait...'});
    await loading.present();

    const id = this.route.snapshot.params?.id;
    this.http.get<User>('users/' + id, {}).then(async res => {
      this.user = res.data;
      await loading.dismiss();
    }).catch(async () => {
      await loading.dismiss();
    });
  }

}
