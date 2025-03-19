import createTheme from '@mui/material/styles/createTheme';
import styles from '../base/export.module.scss';

export const theme = createTheme({
  palette: {
    primary: {
      main: styles.primaryColor
    },
    secondary: {
      main: styles.secondaryColor
    },
    success: {
      main: styles.accentColor
    },
    text: {
      primary: styles.textColor,
      secondary: styles.gray500
    },
    background: {
      default: styles.backgroundColor,
      paper: styles.secondaryColor
    },
    error: {
      main: styles.redDelete
    }
  },
  typography: {
    fontFamily: `${styles.fontFamilyPrimary}, ${styles.fontFamilySecondary}, sans-serif`,
    fontSize: parseInt(styles.fontSizeBase),
    h1: {
      fontSize: parseInt(styles.fontSizeLarge),
      fontWeight: 700
    },
    h2: {
      fontSize: parseInt(styles.fontSizeMedium),
      fontWeight: 500
    },
    body1: {
      fontSize: parseInt(styles.fontSizeBase),
      lineHeight: parseFloat(styles.lineHeightBase)
    },
    caption: {
      fontSize: parseInt(styles.fontSizeVerySmall),
      letterSpacing: parseFloat(styles.letterSpacingBase)
    }
  },
  shape: {
    borderRadius: parseInt(styles.borderRadiusBase)
  },
  spacing: parseInt(styles.paddingBase),
  transitions: {
    duration: {
      standard: parseInt(styles.transitionDurationBase)
    },
    easing: {
      easeInOut: styles.transitionEasingBase
    }
  },
  breakpoints: {
    values: {
      xs: parseInt(styles.breakpointSmallPhone),
      sm: parseInt(styles.breakpointPhone),
      md: parseInt(styles.breakpointTablet),
      lg: parseInt(styles.breakpointSmallDesktop),
      xl: parseInt(styles.breakpointLargeDesktop)
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: styles.gray100,
          backgroundColor: styles.gray900,
          textTransform: 'none'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: styles.gray100
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: styles.gray100
        }
      }
    }
  }
});
