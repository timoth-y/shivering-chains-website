import { useEffect, useState } from 'react';
import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, Theme } from '@mui/material/styles';
import 'semantic-ui-css/semantic.min.css';

export function AppTheme (): Theme {
  const [themeOverride, setThemeOverride] = useState<PaletteMode>();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let palette: PaletteMode = prefersDarkMode ? 'dark' : 'light';

  function updateThemeOverride () {
    const storedThemeOverride = sessionStorage.getItem('themeOverride');
    if (storedThemeOverride && storedThemeOverride !== themeOverride) {
      setThemeOverride(storedThemeOverride as PaletteMode);
    }
  }

  useEffect(() => {
    function handleStorageEvent (event: StorageEvent) {
      updateThemeOverride();
    }

    if (typeof window !== 'undefined') {
      updateThemeOverride();

      window.addEventListener('storage', handleStorageEvent, false);

      return function cleanup () {
        window.removeEventListener('storage', handleStorageEvent);
      };
    }
  });

  if (themeOverride) {
    palette = themeOverride;
  }

  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#04AFD3'
      },
      secondary: {
        main: '#04AFD3'
      },
      text: {
        primary: '#ACB1B8'
      },
      background: {
        default: '#0D1117'
      }
    }
  });
}

export const AppStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      html: {
        boxSizing: 'border-box',
        lineHeight: 1.15
      },
      body: {
        margin: 0
      }
    },
    root: {
      backgroundColor: '#0D1117',
      height: '100vh'
    }
  })
);
