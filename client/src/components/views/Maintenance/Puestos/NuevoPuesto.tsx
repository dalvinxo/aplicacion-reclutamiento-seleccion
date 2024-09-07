import { BreadcrumbsCommons } from '../../../commons/BreadcrumbsCommons';
import { FormularioPuesto } from './FormularioPuesto';

export const NuevoPuesto = () => {
  const breadcrumbs = {
    [`/mantenimiento/puestos`]: 'Listado de puestos',
  };

  return (
    <>
      <BreadcrumbsCommons linksItems={breadcrumbs} title="Crear puesto" />
      <FormularioPuesto />
    </>
  );
};
