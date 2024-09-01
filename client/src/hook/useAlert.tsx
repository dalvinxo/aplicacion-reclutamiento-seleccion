import { Fade } from '@mui/material';
import Alert from '@mui/material/Alert';

import { useEffect, useState } from 'react';

const useAlert = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]);

  const AlertComponent = (props: IUseAlert) => {
    const {
      styles,
      defaultVariant = 'outlined',
      defaultSeverity = 'error',
    } = props;

    return (
      <>
        {error && (
          <Fade in={!!error}>
            <Alert
              variant={defaultVariant}
              severity={defaultSeverity}
              style={styles}
            >
              {error}
            </Alert>
          </Fade>
        )}
      </>
    );
  };

  return { AlertComponent, setError };
};

export default useAlert;
