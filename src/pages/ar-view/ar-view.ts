/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AR } from '../../assets/ade.js';

// import { ArPage } from '../assets/image-recognition/js/htmldrawable';
/*
  Generated class for the ARView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ar-view',
  templateUrl: 'ar-view.html'
})
export class ARView {
  loaded: Boolean;
  AR: any;


  constructor(public navCtrl: NavController) {
    this.loaded = false;
    // this.AR = window.plugins.WikitudePlugin;
    this.AR = AR;

  }

  ionViewDidLoad() {
    console.log('Hello ARView Page');
    // alert('AR View has loaded!!!')

  }

  ionViewDidEnter() {

    var startupConfiguration: any = { "camera_position": "back" };
    // WikitudePlugin.isDeviceSupported(function(success){
    //   alert('success res' + success)
    // }, function(err){
    //   alert('err res' + err)
    // }, [''])
    WikitudePlugin.loadARchitectWorld(

      function (success) {
        // context.createOverlays()
        console.log("ARchitect World loaded successfully.");
        // alert('success loaded architect world')
      },
      function (fail) {
        // context.createOverlays()
        console.log("Failed to load ARchitect World!");
        alert('failure to load architect world')
        // alert(fail)
      },
      //          "www/assets/3_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
      //          ["ir"], // (1) if you have a IR (Image Recognition) World, use this
      "www/assets/image-recognition/index.html",  // (2) if you have a GeoLocation World, use this
      ["geo"],  // (2) if you have a GeoLocation World, use this
      // you find other samples or Wikitude worlds in Wikitude Cordova Plugin
      // which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
      <JSON>startupConfiguration
    );
  }

}