import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../app/services/service';

declare var google;

@Component({
  selector: 'page-contact',
  providers: [UserService],
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('map') mapElementL: ElementRef;
  map: any;

  name: any;
  art: any;
  constructor(public navCtrl: NavController, private navParams: NavParams, public geolocation: Geolocation, private userService: UserService) {
    this.name = navParams.get('name')
  }

  ngOnInit() {
    this.userService.getArt()
      .subscribe(
      arts => this.art = arts
      )

    console.log('anything')
    this.geolocation.getCurrentPosition()
      .then(position => console.log(position))
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  getAllArt() {
    for (let i = 0; i < this.art.art.length; i++) {
      console.log(this.art.art[i])
      this.addArtMarkers(this.art.art[i].latitude, this.art.art[i].longitude);
    }
    console.log(this.art.art)
  }

  addArtMarkers(latitude, longitude) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat: latitude, lng: longitude}
    })
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  loadMap() {
    this.geolocation.getCurrentPosition()
      .then((position) => {
        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude, position.coords.longitude)

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElementL.nativeElement, mapOptions);
        var userMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: im
        })
      }, (err) => {
        console.log(err);
      });
  }

  redirectToLogin() {

  }

}
