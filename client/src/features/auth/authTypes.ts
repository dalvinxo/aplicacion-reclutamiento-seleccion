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

export interface UserPersonCandidate {
  persona: PersonaUserCandidate;
  puesto_aspirado_id: number;
  recomendado_por: string;
  salario_aspirado: number;
}

export interface PuestoUser {
  estado: boolean;
  estatus: string;
  id_candidato: number;
  persona_id: number;
  puesto_aspirado_id: number;
  recomendado_por: string;
  salario_aspirado: number;
}

export interface PersonaUserCandidate {
  capacitaciones: CapacitacioneCandidate[];
  cedula: string;
  competencia: number[];
  experienciaLaboral: ExperienciaLaboralCandidate[];
  idioma: number[];
  nombre: string;
  persona_id: number;
}

export interface CapacitacioneCandidate {
  id_capacitacion: number;
  descripcion: string;
  fecha_desde: Date;
  fecha_hasta: Date;
  institucion: string;
  nivel: string;
}

export interface ExperienciaLaboralCandidate {
  id_experiencia_laboral: number;
  empresa: string;
  fecha_desde: Date;
  fecha_hasta: Date;
  puesto_ocupado: string;
  salario: number;
}
