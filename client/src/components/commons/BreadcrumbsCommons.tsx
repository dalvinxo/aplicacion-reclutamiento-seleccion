import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as LinkRouter, useLocation } from 'react-router-dom';

type TypeLinkItems = { [key: string]: string };

interface IBreadcrumbsCommons {
  linksItems: TypeLinkItems;
  title: string;
}

export const BreadcrumbsCommons = (props: IBreadcrumbsCommons) => {
  const { linksItems, title } = props;

  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          {Object.entries(linksItems).map(([key, name], index) => (
            <Link
              underline="hover"
              color="inherit"
              component={LinkRouter}
              to={key}
              key={key + index}
            >
              {name}
            </Link>
          ))}

          <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
        </Breadcrumbs>
      </div>
    </>
  );
};
