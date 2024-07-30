import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MODEL, SERVICE } from '../constants/api';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly URL: string = MODEL.USUARIO
  isBrowser: boolean;
  private message: string = 'Hello , Im a service'
  private user: any = null;

  setUser(nuevoUsuario:any){
    this.user = nuevoUsuario;
  }
  getUser(){
    return this.user;
  }

  
  constructor(@Inject(PLATFORM_ID) platformId: Object, private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser ? localStorage.getItem("access_token") : false) {
      const access_token = localStorage.getItem("access_token");
      const payload = access_token? JSON.parse(atob(access_token.split('.')[1])):null;
      console.log(payload);
      this.user = payload;
    }
  }

  login(form:any){
    return this.http.post<any>(this.URL + SERVICE.LOGIN, form);
  }

}
