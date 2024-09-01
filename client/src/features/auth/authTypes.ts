export interface AuthState {
  user: AuthUser | null;
}

export interface AuthUser {
  Empleado: Empleado;
  empleado_id: number;
  id_usuario: number;
  rol_id: number;
  ultimo_login: Date;
  user: string;
}

export interface Empleado {
  Puesto: Puesto;
}

export interface Puesto {
  Departamento: Departamento;
  nombre: string;
}

export interface Departamento {
  nombre: string;
}
