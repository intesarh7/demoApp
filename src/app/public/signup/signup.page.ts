import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access_providers';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  your_name: string = '';
  gender: string = '';
  date_birth: string = '';
  email_address: string = '';
  password: string = '';
  confirm_pass: string = '';

  disabledButton: any;

  constructor(
    private router: Router,
    private active: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsProvidr: AccessProviders,
    public menu: MenuController,
  ) { }

  ionViewDidEnter(){
    this.disabledButton = false;
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
   }

  ngOnInit() {
  }

  async tryRegister(){
    if(this.your_name== ''){
      this.preventToast('Yourname is required');
    }else if(this.gender== ''){
      this.preventToast( 'Gender is required' );
    }else if(this.date_birth== ''){
      this.preventToast( 'Gender is required' );
    }else if(this.email_address== ''){
      this.preventToast( 'Gender is required' );
    }else if(this.password== ''){
      this.preventToast( 'Gender is required' );
    }else if(this.confirm_pass!=this.password){
      this.preventToast( 'Password is not same' );
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      })
      loader.present();
      return new Promise(resolve =>{
        const body = {
          aksi: 'proses_regester',
          your_name: this.your_name,
          gender: this.gender,
          date_birth: this.date_birth,
          email_address: this.email_address,
          password: this.password,
        }
        this.accsProvidr.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.preventToast(res.msg);
            this.router.navigate(['/login']);
          }else{
            loader.dismiss();
            this.disabledButton = false;
            this.preventToast(res.msg);            
          }
        },(err=>{
          loader.dismiss();
            this.disabledButton = false;
            this.preventAlert('Timeout');
        }));
      });
    } 
  }

  async preventToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
    })
    toast.present();
  }
  async preventAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  openLogin(){
    this.router.navigate(['/login']);
  }
}
