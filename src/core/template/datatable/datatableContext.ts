import { createContext } from "react";
import { IDatatableContext } from "./interfaceTable";

//context
export const DatatableContext = createContext<IDatatableContext>({} as IDatatableContext);

