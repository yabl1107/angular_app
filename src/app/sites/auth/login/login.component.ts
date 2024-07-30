import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';
import { error } from 'node:console';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(
    private usuarioService:UsuarioService, //Injecccion de dependencia . Private ahorra declaracion
    private router: Router
  ){}

  //alternativa de injeccion de dependencia
  // usuarioService = inject(UsuarioService)  : seria public
  
  selectedValue = 'Option1';
  options = ['Option1', 'Option2', 'Option3'];
  
  /*
  Template-driven forms
  Alternativa para el llenado de formularios... usando ngModel y la variable en el componente
  user = {
    correo: '',
    password: ''
  };
  */

  login(form:any){
    console.log('Formulario data : ', form.value);
    this.usuarioService.login(form.value).subscribe(
      {
        next: (response) => {          
          console.log("Data send succesfully", response);
          const payload = response.access_token ? JSON.parse(atob(response.access_token.split('.')[1])):null;
          console.log(payload);
          this.usuarioService.setUser(payload);
          localStorage.setItem("access_token",response.access_token);
          
          if(payload.isEspecialista){
            this.router.navigateByUrl("/especialista");
          }else{
            this.router.navigateByUrl("/paciente");
          }
        },
        error: (e) => console.error(e)
        //complete: () => console.info('complete') 
      }
    )
  }

}
