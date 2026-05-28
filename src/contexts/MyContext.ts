import { createContext } from "react";

type MyDropdownContextType = {
  stations: any;
  companies: any;
  ptLinetypes: any;
  chartPanelwidth: any;
  updateStations: any;
  updateCompanies: any;
  updateTypes: any;
  updateChartPanelwidth: any;
};

const initialState = {
  stations: undefined,
  companies: undefined,
  ptLinetypes: undefined,
  chartPanelwidth: undefined,
  updateStations: undefined,
  updateCompanies: undefined,
  updateTypes: undefined,
  updateChartPanelwidth: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
