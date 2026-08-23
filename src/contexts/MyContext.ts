import { createContext } from "react";

type MyDropdownContextType = {
  station: any;
  updateStation: any;
  company: any;
  updateCompany: any;
  utype: any;
  updateUtype: any;
};

const initialState = {
  station: undefined,
  updateStation: undefined,
  company: undefined,
  updateCompany: undefined,
  utype: undefined,
  updateUtype: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
