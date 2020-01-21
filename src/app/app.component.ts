// angular & ionic/angular node modules
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


// ionic-native & ngx node modules
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Services
import { NetworkService } from './providers/network.service';
import { ThemeService } from './providers/theme.service';
import { LanguageService } from './providers/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	text = '';
	darkMode: any;
	public isConnected = false;
	public language: string = this.languageService.selected;
	public menuCtrl: MenuController;
	public appPages = [
    {
			title: 'News',
			titlefr: 'Nouvelles',
			titlesp: 'Noticias',
      		url: '/app/tabs/news',
			icon: 'list-box',
			menuIcon: 'menuIconNews'
			
    },
    {
			title: 'Categories',
			titlefr: 'Categories',
			titlesp: 'Categorias',
      		url: '/app/tabs/categories',
			icon: 'options',
			menuIcon: 'menuIconCategories'
    },
    {
			title: 'Favourites',
			titlefr: 'Favoris',
			titlesp: 'Favoritas',
      		url: '/app/tabs/favourites',
			icon: 'heart',
			menuIcon: 'menuIconFavourites'
    },
    {
			title: 'About',
			titlefr: 'Sur cette app',
			titlesp: 'Sobre esta app',
      		url: '/app/tabs/about',
			icon: 'information-circle',
			menuIcon: 'menuIconAbout'
	},
    {
			title: 'Login',
			titlefr: 'Login',
			titlesp: 'Login',
      		url: 'login',
			icon: 'log-in',
			menuIcon: 'menuIconLogin'
	}
	,
    {
		title: 'Signup',
		titlefr: 'Signup',
		titlesp: 'Signup',
		url: 'signup',
		icon: 'log-in',
		menuIcon: 'menuIconSignup'
    }
	
  ];

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
	private statusBar: StatusBar,
	public themeService: ThemeService,
	public networkService: NetworkService,
	public toastController: ToastController,
	private languageService: LanguageService,
	private storage: Storage,
	public navCtrl: NavController,
  ) {
		this.initializeApp();
		this.darkMode = this.themeService.darkMode;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
			this.splashScreen.hide();
			
			// check network available
			this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
				this.isConnected = connected;
				console.log('Network status: ', this.isConnected);
				// this.isConnected ? this.presentToast('network connected') : this.presentToast('network disconnected');
			this.text = this.isConnected ? 'Network Connected' : 'Network Disconnected';
			this.presentToast(this.text);
			})
			this.languageService.setInitialAppLanguage();
	});
	
	this.storage.get('storage_xxx').then((res)=> {
		if (res == null)	{
			this.navCtrl.navigateRoot('/login');
		} else{
			this.navCtrl.navigateRoot('/app');
		}
	});
	}

	
	async presentToast(message: string) {
		const toast = await this.toastController.create({
			message: message,
			position: 'middle',
			duration: 2000
		});
		toast.present();
	}
	
	languageChange() {
    this.languageService.setLanguage(this.language);
	}

	async closeMenu(event: any) {
		await this.menuCtrl.close();
	}

	async prosesLogout(){
		this.storage.clear();
		this.navCtrl.navigateRoot('/login');
		const toast = await this.toastController.create({
			message: 'Logout Successfuly',
			duration: 1500,
		  })
		  toast.present();		
	  }
	
}
