import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../app/services/service';
import { TabsPage } from '../tabs/tabs';

declare var swal: any;

@Component({
  selector: 'page-login',
  providers: [UserService],
  templateUrl: 'login.html'
})
export class LoginPage {

  username: any;
  password: any;
  userPost: any;
  users: any;
  postData: any;

  constructor(public navCtrl: NavController, private userService: UserService) { }

  user = {
    username: null,
    password: null,
  }

  getInput = () => {
    console.log(this.user)
  }

  redirectToSignup = () => {
    this.navCtrl.setRoot(SignupPage);
  }

  loginButton() {
    this.userService.loginUser(
      {
        username: this.user.username.toLowerCase(),
        password: this.user.password
      }
    )
      .subscribe(
      user => this.userPost = user,
      error => swal('Login Failed', 'Please try again', 'error'),
      () => {
        if (this.userPost === null) {
          swal('Login Failed', 'Please try again', 'error')
        } else if (this.userPost.results === false) {
          swal('Login Failed', 'Please try again', 'error')
        } else {
          this.navCtrl.setRoot(TabsPage, this.userPost)
          // swal({
          //   title: 'Welcome',
          //   text: 'Create custom underground ghost art in as little as three steps. Make a custom marker by taking a picture of any painting or unique wall. Upload your art onto the marker. View art with ghost vision.',
          //   imageUrl: 'http://weburbanist.com/wp-content/uploads/2016/10/graffiti-revealed-mural-644x369.jpg',
          //   imageWidth: 400,
          //   imageHeight: 200,
          //   animation: false
          // })
        }
      }
      )
  }

  redirectToTabsPage() {
    this.navCtrl.push(TabsPage);
  }


}
