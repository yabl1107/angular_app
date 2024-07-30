import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UsuarioService } from '../services/usuario.service';



export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  if(usuarioService.getUser() != null){
      return true;
  }else{
      router.navigateByUrl("login");
      return false;
  }
};