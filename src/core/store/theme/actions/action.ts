import { typeTheme } from "../reducers/reducer";
import {  mac } from "../../utils/configReducer";
import { IActionConfigTheme } from "../themeInterface";


export const actionLoadConfigTheme = mac<IActionConfigTheme>(typeTheme.loadConfig);

