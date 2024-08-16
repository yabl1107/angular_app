import { Component , inject, signal} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule,FormControl, Validators, Form } from '@angular/forms';
import { UbigeoService } from '../../../core/services/ubigeo.service';
import { Ubigeo } from '../../../core/models/ubigeo';
import { Persona } from '../../../core/models/persona';
import { RegisterService } from '../../../core/services/register.service';
import Swal from 'sweetalert2';

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
  isEspecialist = signal<boolean>(false);

  constructor(
    private ubigeoService : UbigeoService,
    private registerService : RegisterService
  ){
    //this.departamentos = ubigeoService.departamentos;
    this.ubigeoService.departamentos$.subscribe(data => {
      this.departamentos = data;
      console.log("primer print" , this.departamentos);
    });
    
    console.log("segundo print", this.departamentos);
  }


  formGroupPersona: FormGroup =  new FormGroup(
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
      
      //Usuario (documento,correo, password)
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    //Especialista
    formGroupEspecialista: FormGroup = new FormGroup(
      {
        //Especialista (id_usuario, licencia, especialidad)
        licencia: new FormControl('', [Validators.required, Validators.email]),
        especialidad : new FormControl('', [Validators.required, Validators.email])
      }
    )

    generalForm = signal<FormGroup>(this.formGroupPersona);
    especialistaForm = signal<FormGroup>(this.formGroupEspecialista);

    // Enviar formulario. 
  onSubmit() {
    
    //Si es especialsita envia especialista : {licencia: 123 , especialidad: 123}
    const data = {
      isEspecialist : this.isEspecialist(),
      ...this.formGroupPersona.value,
      ...(this.isEspecialist()? {especialista : this.formGroupEspecialista.value} : {}),
    }

    this.registerService.register(data).subscribe({
      next: (rpta) => {console.log(rpta)},
      error: (err) => {
        const errorMessage = err.error?.message || 'Ocurrió un error durante el registro.'
        console.log("error", err);
        Swal.fire({
          title:'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
      complete: () => {
        Swal.fire({
          title:'!Registro exitoso!',
          text: 'Se completó el registro exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    });

    console.log('Formulario enviado', data);
    

  }


  toggle(): void {
    this.isEspecialist.set(!this.isEspecialist());
    if(!this.isEspecialist()){
      this.especialistaForm().reset();
    }
  }

  setIdUbigeo(){
    const departamento = this.formGroupPersona.get('departamento')?.value;
    const provincia = this.formGroupPersona.get('provincia')?.value;
    const distrito = this.formGroupPersona.get('distrito')?.value;
    const id = this.ubigeoService.getIdUbigeo(distrito,provincia,departamento);
    this.formGroupPersona.get('id_ubigeo')?.setValue(id);
  }
  
  refreshProvinciaList(){
    //Limpiar valores
    this.formGroupPersona.get('provincia')?.setValue('');
    this.formGroupPersona.get('distrito')?.setValue('');
    this.formGroupPersona.get('id_ubigeo')?.reset();
    //Obtener departamento seleccionado
    const departamento = this.formGroupPersona.get('departamento')?.value;
    //Refrescar provincias
    this.provincias = this.ubigeoService.obtenerProvincias(departamento);
  }

  refreshDistritoList(){
    //Limpiar valor seleccionado 
    this.formGroupPersona.get('distrito')?.reset();
    this.formGroupPersona.get('id_ubigeo')?.reset();
    //OBtener provincia seleccionada
    const provincia = this.formGroupPersona.get('provincia')?.value;
    this.distritos = this.ubigeoService.obtenerDistrito(provincia);
  }



}
