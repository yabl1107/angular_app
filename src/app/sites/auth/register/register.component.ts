import { Component , inject, signal} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule,FormControl, Validators } from '@angular/forms';
import { UbigeoService } from '../../../core/services/ubigeo.service';
import { Ubigeo } from '../../../core/models/ubigeo';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  // Elementos para los desplegables
  departamentos : string[] = [];
  provincias : string[] = [];
  distritos : string[] = [];
  
  formGroup: FormGroup =  new FormGroup(
    {
      documento: new FormControl('', [Validators.required]),
      tipo_documento: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido_paterno: new FormControl('', [Validators.required]),
      apellido_materno: new FormControl('', [Validators.required]),
      //
      departamento: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      distrito: new FormControl('', [Validators.required]),
      //
      telefono: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      id_ubigeo: new FormControl(''),
      //modelo usuario
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

  generalForm = signal<FormGroup>(this.formGroup);

  constructor(
    private ubigeoService : UbigeoService
  ){
    this.departamentos = ubigeoService.departamentos;
  }

  // Enviar formulario. 
  onSubmit() {
    console.log('Formulario enviado', this.formGroup.value);
    

  }

  setIdUbigeo(){
    const departamento = this.formGroup.get('departamento')?.value;
    const provincia = this.formGroup.get('provincia')?.value;
    const distrito = this.formGroup.get('distrito')?.value;
    const id = this.ubigeoService.getIdUbigeo(distrito,provincia,departamento);
    this.formGroup.get('id_ubigeo')?.setValue(id);
  }
  
  refreshProvinciaList(){
    //Limpiar valores
    this.formGroup.get('provincia')?.setValue('');
    this.formGroup.get('distrito')?.setValue('');
    this.formGroup.get('id_ubigeo')?.reset();
    //Obtener departamento seleccionado
    const departamento = this.formGroup.get('departamento')?.value;
    //Refrescar provincias
    this.provincias = this.ubigeoService.obtenerProvincias(departamento);
  }

  refreshDistritoList(){
    //Limpiar valor seleccionado 
    this.formGroup.get('distrito')?.reset();
    this.formGroup.get('id_ubigeo')?.reset();
    //OBtener provincia seleccionada
    const provincia = this.formGroup.get('provincia')?.value;
    this.distritos = this.ubigeoService.obtenerDistrito(provincia);
  }



}
