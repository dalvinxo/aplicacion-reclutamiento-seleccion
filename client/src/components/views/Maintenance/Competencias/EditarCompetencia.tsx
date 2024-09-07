import { BreadcrumbsCommons } from '../../../commons/BreadcrumbsCommons';
import { FormularioCompetencia } from './FormularioCompetencia';

export const EditarCompetencia = () => {
  const breadcrumbs = {
    [`/mantenimiento/competencias`]: 'Listado de competencias',
  };

  return (
    <>
      <BreadcrumbsCommons linksItems={breadcrumbs} title="Editar competencia" />
      <FormularioCompetencia />
    </>
  );
};
