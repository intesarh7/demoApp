import { Component, ViewEncapsulation } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  datastorage: any;
	name: string;

  constructor(
    public popoverCtrl: PopoverController,
    private storage: Storage,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private active: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    ) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event
    });
    await popover.present();
  }

  ionViewDidEnter(){
		this.storage.get('storage_xxx').then((res)=>{
			console.log(res);
			this.datastorage = res;
			this.name = this.datastorage.your_name;
		})
	}
}
