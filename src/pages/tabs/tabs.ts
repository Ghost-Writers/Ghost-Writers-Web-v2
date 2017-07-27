import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ARView } from '../ar-view/ar-view';
import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') public tabRef: Tabs;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AboutPage;
  tab2Root: any = ARView;
  tab3Root: any = MapPage;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ngOnInit(){
    this.user = this.navParams.data;
    localStorage.id = this.navParams.data.id;
    console.log('USER ID', this.user.id)
  }

  public selectTab(index: number) {
    console.log("selectTab called");
    this.tabRef.select(index);
  }
}
