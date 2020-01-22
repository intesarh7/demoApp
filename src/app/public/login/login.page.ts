import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from 'src/app/providers/access_providers';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email_address: string = '';
  password: string = '';

  disabledButton: any;
  menuCtrl: any;
  
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsProvidr: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController,
    public menu: MenuController,

  ) { }

  ionViewDidEnter(){
    this.disabledButton = false;
    this.menu.swipeGesture(false);
  }

   

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
   }




  async tryLogin(){
    if(this.email_address== ''){
      this.preventToast( 'Email is required' );
    }else if(this.password== ''){
      this.preventToast( 'Password is required' );
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      })
      loader.present();
      return new Promise(resolve =>{
        const body = {
          aksi: 'proses_login',
          email_address: this.email_address,
          password: this.password,
        }
        this.accsProvidr.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.preventToast('Login Successfuly');
            this.storage.set('storage_xxx', res.result); // create storage session
            this.navCtrl.navigateRoot(['/app']);
          }else{
            loader.dismiss();
            this.disabledButton = false;
            this.preventToast('Email and password does not match');            
          }
        },(err=>{
          loader.dismiss();
            this.disabledButton = false;
            this.preventToast('Timeout');
        }));
      });
    } 
  }
  
  async preventToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
    })
    toast.present();
  }
 
   openRegister(){
    this.router.navigate(['/signup']);
  }
  ngOnInit() {
  }
  

}
