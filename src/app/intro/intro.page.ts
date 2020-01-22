import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    public menu: MenuController,
    private router: Router,
    private active: ActivatedRoute,
  ) { }

  // ionViewDidEnter(){
  //   this.menu.swipeGesture(false);
  // }
  // ionViewWillLeave() {
  //   this.menu.swipeGesture(true);
  // }

  ngOnInit() {
  }

  openLogin(){
    this.router.navigate(['/login']);
  }

}
