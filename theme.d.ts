import '@material-ui/core/styles';

declare module '@mui/material/styles' {
  interface Palette {
    dark_green: Palette['primary'];
    eerie_black: Palette['info']
  }

  interface PaletteOptions {
    dark_green: PaletteOptions['primary'];
    eerie_black: PaletteOptions['info'];
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    dark_green: true;
    eerie_black: true;
  }
}
declare module '@mui/material/InputBase' {
  interface  InputBasePropsColorOverrides {
    dark_green: true;
    eerie_black: true;
  }
}
declare module '@mui/material/FormControl' {
  interface  FormControlPropsColorOverrides {
    dark_green: true;
    eerie_black: true;
  }
}
declare module '@mui/material/InputLabel' {
  interface  InputLabelPropsColorOverrides {
    dark_green: true;
    eerie_black: true;
  }
}
declare module '@mui/material/Button' {
  interface  ButtonPropsColorOverrides {
    dark_green: true;
    eerie_black: true;
    soft_white: true;
  }
}
declare module '@mui/material/IconButton' {
  interface  IconButtonPropsColorOverrides {
    dark_green: true;
    eerie_black: true;
    soft_white: true;
  }
}
declare module '@mui/material/Switch' {
  interface  SwitchPropsColorOverrides {
    dark_green: true;
    eerie_black: true;
  }
}
declare module '@mui/material/FormControlLabel' {
  interface  FormControlLabelPropsColorOverrides {
    dark_green: true;
    eerie_black: true;
  }
}
