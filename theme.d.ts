import '@material-ui/core/styles';

declare module '@mui/material/styles' {
  interface Palette {
    dark_green: Palette['primary'];
  }

  interface PaletteOptions {
    dark_green: PaletteOptions['primary'];
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    dark_green: true;
  }
}
declare module '@mui/material/InputBase' {
  interface  InputBasePropsColorOverrides {
    dark_green: true;
  }
}
declare module '@mui/material/FormControl' {
  interface  FormControlPropsColorOverrides {
    dark_green: true;
  }
}
declare module '@mui/material/InputLabel' {
  interface  InputLabelPropsColorOverrides {
    dark_green: true;
  }
}
