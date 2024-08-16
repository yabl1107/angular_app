import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ubigeo } from '../models/ubigeo';
import { MODEL, SERVICE } from '../constants/api';
import { Observable, BehaviorSubject, lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  URL: string = MODEL.UBIGEO
  ubigeos : Ubigeo[] = [];
  
  private departamentosSubject = new BehaviorSubject<string[]>([]);
  public departamentos$ = this.departamentosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.inicializar(); //Obtiene ubigeos y lista de departamentos.
  }

  getUbigeos() : Observable<Ubigeo[]>{
    return this.http.get<Ubigeo[]>(this.URL+"/get");
  }

  inicializar() {
    //Obtener ubigeos
    this.getUbigeos().subscribe({
      next: (response) => {
        this.ubigeos = response;
      },
      error: (e) => console.error(e),
      complete: () => {
        //Extraer departamantos
        //this.departamentos = [...new Set(this.ubigeos.map( ubigeo => {return ubigeo.departamento}))];
        const departamentos = [...new Set(this.ubigeos.map( ubigeo => {return ubigeo.departamento}))];
        // Notifica a los suscriptores que los departamentos están listos
        this.departamentosSubject.next(departamentos);
      } 
    });
  }

  obtenerProvincias(departamento : string) : string[] { // Provincias segun departamento
    return [...new Set(this.ubigeos.filter( ubigeo => ubigeo.departamento==departamento).map(ubigeo => {return ubigeo.provincia}))];
  }
  
  obtenerDistrito(provincia : string) : string[] { // distritos según provincia
    return [...new Set(this.ubigeos.filter( ubigeo => ubigeo.provincia==provincia).map(ubigeo => {return ubigeo.distrito}))];
  }

  getIdUbigeo(distrito: string , provincia:string, departamento:string) : string {
    const id = this.ubigeos.filter( ubigeo => ubigeo.distrito===distrito && ubigeo.provincia===provincia && ubigeo.departamento==departamento).map(ubigeo => {return ubigeo.id_ubigeo});
    return id[0];
  }

}
