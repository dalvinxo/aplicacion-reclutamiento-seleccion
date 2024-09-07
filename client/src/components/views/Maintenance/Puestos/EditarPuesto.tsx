import { BreadcrumbsCommons } from '../../../commons/BreadcrumbsCommons';
import { FormularioPuesto } from './FormularioPuesto';

export const EditarPuesto = () => {
  const breadcrumbs = {
    [`/mantenimiento/puestos`]: 'Listado de puestos',
  };

  return (
    <>
      <BreadcrumbsCommons linksItems={breadcrumbs} title="Editar puesto" />
      <FormularioPuesto />
    </>
  );
};
