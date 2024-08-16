import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MODEL, SERVICE } from '../constants/api';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(form : any){
    return this.http.post<any>("http://localhost:5000/register/new",form);
  }
}
