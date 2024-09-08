export interface AuthState {
  user: AuthUser | null;
}

export interface AuthUser {
  Empleado: Empleado;
  empleado_id: number;
  email: string;
  id_usuario: number;
  rol_id: EnumRoles;
  ultimo_login: Date;
  user: string;
}

export interface UserSimple {
  id_usuario: number;
  empleado_id: number | null;
  user: string;
  email: string;
}

export enum EnumRoles {
  ADMIN = 1,
  USER = 2,
  CANDIDATE = 4,
}

export interface Empleado {
  Puesto: PuestoEmpleado;
}

export interface PuestoEmpleado {
  Departamento: Departamento;
  nombre: string;
}

export interface Departamento {
  nombre: string;
}
