import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  //https://material-ui.com/customization/palette/#dark-mode
  palette: {
    type: 'dark',
  },
  props: {
    //https://material-ui.com/components/typography/#changing-the-semantic-element
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        h2: 'h1',
        h3: 'h2',
        h4: 'h2',
        h5: 'h3',
        h6: 'h3',
        // subtitle1: 'h2',
        // subtitle2: 'h2',
        // body1: 'span',
        // body2: 'span',
      },
    },
  },
});

export default theme;
