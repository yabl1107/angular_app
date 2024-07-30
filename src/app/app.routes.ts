import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PacienteComponent } from './sites/paciente/paciente.component';
import {routesAuth}  from './sites/auth/auth.routes';
import {routesEspecialist} from './sites/especialista/especialista.routes';
export const routes: Routes = [
    {
        path: '',
        children: routesAuth
    },
    {
        path: 'especialista',
        canActivate:[authGuard],
        children:routesEspecialist
    },
    {
        path:'paciente',
        canActivate:[authGuard],
        component: PacienteComponent
    }

];
