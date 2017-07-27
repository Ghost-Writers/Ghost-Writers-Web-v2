import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../app/services/service';
import filestack from 'filestack-js';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';
declare var swal: any;

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
    public appCtrl: App,
    iab: InAppBrowser,
    private userService: UserService,
    private geolocation: Geolocation,
    private platform: Platform) {
    this.client = filestack.init('AxGm6Nb8rTPyGLzI0VcuEz')
    this.iab = iab
    // this.platform = platform;
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
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
        console.log('getArt success')
      }
      )
  }

  deleteArt(artID) {
    console.log('Art ID to delete: ' + artID)
    this.userService.deleteArt(artID)
      .subscribe(
      results => console.log(results),
      error => console.log('erroring deleting art', error),
      () => {
        console.log('Deleted art')
      }
      )
  }

  popArtFromArray(userID, artID) {
    console.log('User id ', userID, 'Art id ', artID)
    this.userService.popArtFromArray(userID, artID)
      .subscribe(
      results => console.log(results),
      error => console.log('erroring popArtFromArray', error),
      () => {
        console.log('Successfully Popped Art from Array')
      }
      )
  }

  expandMarker(marker) {
    console.log('clicked')
    swal({
      imageUrl: marker,
      imageWidth: '100%',
      imageHeight: '100%',
      animation: false
    })
  }

  signOut() {
    let context = this;
    swal({
      title: 'Sign Out',
      text: "Are you sure you want to sign out?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(function () {
      context.appCtrl.getRootNav().setRoot(LoginPage)
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
      }
    })
  }

  launchSite() {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.currLat = resp.coords.latitude;
        this.currLong = resp.coords.longitude;
        if (this.platform.is('cordova')) {
          var browserRef = this.iab
            .create('http://createpage.herokuapp.com/?userid=' + localStorage.id + '&currlat=' + this.currLat + '&currlong=' + this.currLong, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");

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
              // alert('after setting test-params to local storage')
            });

            browserRef.executeScript({ code: "document.getElementById('test-el').value = 123456" }).then(res => {
              console.log('set')
              console.log(res)
              // alert(JSON.stringify(res))
              // alert('after setting test-params to local storage')
            });

            browserRef.executeScript({ code: "alert(window.localStorage.getItem('name'))" }).then(res => {
              console.log('after executing script')
              console.log(res)
              // alert(JSON.stringify(res))
              // alert('after setting localStorage')
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
      }
    )



    // alert('in launch site')
    // let iabRef = this.iab.create('http://createpage.herokuapp.com/', '_blank')
  }
}
