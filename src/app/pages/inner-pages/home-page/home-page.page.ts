import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  token: string = null;

  constructor(private storage: Storage) { }

  async ngOnInit() {
    this.token = await this.storage.get('token');
  }

}
