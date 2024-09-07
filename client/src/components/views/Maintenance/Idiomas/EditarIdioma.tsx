import { BreadcrumbsCommons } from '../../../commons/BreadcrumbsCommons';
import { FormularioIdioma } from './FormularioIdioma';

export const EditarIdioma = () => {
  const breadcrumbs = {
    [`/mantenimiento/idiomas`]: 'Listado de idiomas',
  };

  return (
    <>
      <BreadcrumbsCommons linksItems={breadcrumbs} title="Editar idioma" />
      <FormularioIdioma />
    </>
  );
};
