import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { Account } from "../../models/account"

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  account: Account;
  cargando: boolean;

  constructor(private router: Router, private toastr: ToastrService, private loginService: LoginService,) {
    this.account = new Account()
   }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    this.cargando = true
    if (this.account.username != null && this.account.password != null) {
      this.loginService.validateAccount(this.account.username, this.account.password).subscribe((data) => {
        this.cargando = false
        var token = sessionStorage.getItem('token');
        var token_decode = jwt_decode(token);
        if (token_decode['admin'] == true) {
          this.router.navigate(['/admin']);
        } else if (token_decode['admin'] == false) {
          this.router.navigate(['/general']);
        }
        else {
          this.router.navigate['login']
        }
      }, error => {
        this.cargando = false
        this.toastr.warning('Usuario o contraseña incorrectos', 'Error!', {
          closeButton: true,
        });
        loginForm.reset();
      });
    }
    else {
      this.cargando = false
      this.toastr.warning('Usuario o contraseña no pueden ser vacio', 'Error!', {
        closeButton: true,
      });
      loginForm.reset();
    }
  }

}
