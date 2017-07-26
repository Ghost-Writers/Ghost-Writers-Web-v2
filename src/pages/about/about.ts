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
    private geolocation: Geolocation,
    private platform: Platform) {
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
    alert('launching site')

    if (this.platform.is('cordova')) {
      var browserRef = this.iab
        .create(`http://createpage.herokuapp.com/?userid=${this.userInfo.user._id}`, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");

      // const exitSubscription: Subscription = browserRef.on("exit").subscribe((event) => {
      //   console.error("The Facebook sign in flow was canceled");
      // });

      browserRef.on("loadstart").subscribe((event) => {

        // alert('loadstart event alert success!!!')
        let localStorageQuery = 'localStorage.setItem("user_id", ")' + this.userInfo.user._id + '")';
        //  win.executeScript({ code: "localStorage.setItem( 'name', '' );" });
        browserRef.executeScript({ code: "localStorage.setItem( 'namettt', '' );" }).then(res => {
          console.log('set')
          console.log(res)
          // alert(JSON.stringify(res))
          alert('after setting test-params to local storage')
        });

          browserRef.executeScript({ code: "document.getElementById('test-el').value = 123456" }).then(res => {
          console.log('set')
          console.log(res)
          // alert(JSON.stringify(res))
          alert('after setting test-params to local storage')
        });

        browserRef.executeScript({ code: "alert(window.localStorage.getItem('name'))" }).then(res => {
          console.log('after executing script')
          console.log(res)
          // alert(JSON.stringify(res))
          alert('after setting localStorage')
        }).catch(err => {
          alert('error happened')
          alert(JSON.stringify(err))
        });

        // 'localStorage.setItem("user-from-mobile")'

        // browserRef.executeScript({file: 'local.storage.script.js'}).then(res => {
        //   console.log('2: after executing script')
        //   console.log(res)
        //   alert(JSON.stringify(res))
        //   alert('2: after executing script info msg')
        // });
        browserRef.executeScript({ code: JSON.stringify(localStorage.setItem('test-key', this.userInfo.user._id)) })
      });
    } else {
      console.error("loadstart events are not being fired in browser.");
      alert('error in loadstart')
    }



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
