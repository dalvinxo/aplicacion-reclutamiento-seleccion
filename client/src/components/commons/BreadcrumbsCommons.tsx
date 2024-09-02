import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as LinkRouter, useLocation } from 'react-router-dom';

type TypeLinkItems = { [key: string]: string };

interface IBreadcrumbsCommons {
  linksItems: TypeLinkItems;
  title: string;
}

export const BreadcrumbsCommons = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  console.log(location, pathnames);

  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '1.3rem' }}>
          <Link underline="hover" color="inherit" component={LinkRouter} to="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
        </Breadcrumbs>
      </div>
    </>
  );
};
