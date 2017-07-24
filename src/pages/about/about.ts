import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../app/services/service';
import filestack from 'filestack-js';
// import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// declare var InAppBrowser: any;

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
  art; any;
  constructor(public navCtrl: NavController, iab: InAppBrowser, private userService: UserService) {
    this.client = filestack.init('AxGm6Nb8rTPyGLzI0VcuEz')
    this.iab = iab
    // this.platform = platform;
  }

  ngOnInit() {
    this.userService.getUser(localStorage.id)
    .subscribe(
      data => {
        this.userInfo = data
        this.tagname = data.user.tagname
        this.art = data.user.markers_created
      },
      error => console.log('error line 32, aboutpage'),
      () => {
        console.log(localStorage.id)
        alert(JSON.stringify(localStorage))
        console.log(this.tagname)
        console.log(this.art)
      }
    )
  }

  test(){
    console.log(localStorage.id)
  }

  launchSite() {
      // alert('in launch site')
      let iabRef = this.iab.create('http://createpage.herokuapp.com/')
      iabRef.executeScript({code: 'document.cookie'}).then((cookie) => {
        console.log('script from mobile success')
        console.log(cookie)
        alert(cookie)
      })
      iabRef.on('loadstop', () => {
        alert('finished loading webpage')
        iabRef.executeScript({code: 'alert("in browser test")'})
      })
        
      
  }
}
