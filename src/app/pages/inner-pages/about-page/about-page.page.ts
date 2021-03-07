import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHelperService } from '../../../services/http-helper.service';

@Component({
  selector: 'about-page',
  templateUrl: './about-page.page.html',
  styleUrls: ['./about-page.page.scss'],
})
export class AboutPagePage implements OnInit {

  data: any;
  authState: boolean = null;

  constructor(private http: HttpHelperService) { }

  async ngOnInit() {
    this.data = await this.http.getPromise('auth/me');
  }

}
