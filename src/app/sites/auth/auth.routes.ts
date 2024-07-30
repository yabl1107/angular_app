import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const routesAuth :Routes = [
    {path:'',component:WelcomeComponent},
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent}
];