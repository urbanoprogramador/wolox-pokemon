import { IconfigTheme } from "../themeInterface";

export const selectThemeconfig = (state:any):IconfigTheme => state.theme;

export const selectWidthTheme= (state:any):number => state.theme.width;


