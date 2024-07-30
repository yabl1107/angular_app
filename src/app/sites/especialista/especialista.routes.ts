import { Routes } from "@angular/router";
import { MapaComponent } from "./mapa/mapa.component";
import { VigilanceComponent } from "./vigilance/vigilance.component";
import { ProfileComponent } from "./profile/profile.component";
import { EspecialistaLayoutComponent } from "./especialista-layout/especialista-layout.component";
import { authGuard } from "../../core/guards/auth.guard";

export const routesEspecialist : Routes =[
    {
        path:'', component: EspecialistaLayoutComponent, 
        children:[
            {path:'',component:ProfileComponent},
            {path:'mapa',component:MapaComponent},
            {path:'vigilance',component:VigilanceComponent},
            {path:'**',component:ProfileComponent}
        ]
    }
]