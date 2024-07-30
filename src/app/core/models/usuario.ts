import { Persona } from "./persona";

export interface Usuario {
    id_usuario: number;
    documento: string; // Fk a persona
    correo: string;
    password: string;
    persona: Persona;
}