import { useParams } from 'react-router-dom';
import { BreadcrumbsCommons } from '../../../commons/BreadcrumbsCommons';
import { FormularioCompetencia } from './FormularioCompetencia';
import { useCreateCompetenciaMutation } from '../../../../features/competencias/competenciasApiSlice';

interface ICompetenciaForm {
  description: string;
  password: string;
}

export const NuevaCompetencia = () => {
  const breadcrumbs = {
    [`/mantenimiento/competencias`]: 'Listado de competencias',
  };

  return (
    <>
      <BreadcrumbsCommons linksItems={breadcrumbs} title="Crear competencia" />
      <FormularioCompetencia />
    </>
  );
};
