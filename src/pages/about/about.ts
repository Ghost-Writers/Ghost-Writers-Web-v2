import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../app/services/service';
import filestack from 'filestack-js';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// declare var InAppBrowser: any;
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [UserService]
})
export class AboutPage implements OnInit {
  client: any;
  iab: any;
  userInfo: any;
  tagname: any;
  arts: any;
  markers: any;

  currLat: any;
  currLong: any;

  constructor(
    public navCtrl: NavController,
    iab: InAppBrowser,
    private userService: UserService,
    private geolocation: Geolocation) {
    this.client = filestack.init('AxGm6Nb8rTPyGLzI0VcuEz')
    this.iab = iab
    // this.platform = platform;
  }

  ngOnInit() {
    this.userService.getArt(localStorage.id)
      .subscribe(
      data => {
        this.userInfo = data
        this.tagname = data.art.tagname
        this.arts = data.art.created_art
        this.markers = data.art.markers_created
      },
      error => console.log('error line 32, aboutpage', error),
      () => {
        alert(JSON.stringify(localStorage))
      }
      )
  }
    
  launchSite() {

    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.currLat = resp.coords.latitude;
        this.currLong = resp.coords.longitude;
      }
    )
    // alert('in launch site')
    let iabRef = this.iab.create('http://createpage.herokuapp.com/', '_blank')
  }
}
