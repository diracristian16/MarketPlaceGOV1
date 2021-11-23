import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  router: any;
  document: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  loginProces(){
    if(this.formGroup){
      //console.log(this.formGroup);
      this.authService.login().subscribe(result=>{
        if(result.access_token){
         // console.log(result);
          //alert(result.access_token);
          window.location.href='http://localhost:3500/home';
        }else{
          //console.log(result);
          //alert(result.access_token);
          window.location.href='http://localhost:3500/login';
        }
      })
    }
  }

}
