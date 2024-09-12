export interface Empleados extends IPagination {
  empleados: Empleado[];
}

export interface Empleado {
  cedula: string;
  departamento: string;
  estado: boolean;
  fecha_creacion: string;
  fecha_ingreso: string;
  id_empleado: number;
  nombre: string;
  persona_id: number;
  puesto: string;
  puesto_id: number;
  salario_mensual: number;
}
