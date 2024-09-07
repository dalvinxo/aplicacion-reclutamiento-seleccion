import { BreadcrumbsCommons } from '../../../commons/BreadcrumbsCommons';
import { FormularioIdioma } from './FormularioIdioma';

export const NuevaIdioma = () => {
  const breadcrumbs = {
    [`/mantenimiento/idiomas`]: 'Listado de idiomas',
  };

  return (
    <>
      <BreadcrumbsCommons linksItems={breadcrumbs} title="Crear idioma" />
      <FormularioIdioma />
    </>
  );
};
