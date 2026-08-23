import { use, useMemo, useState } from "react";
import Select from "react-select";
import "../index.css";
import { utilityLineLayer, utilityPointLayer } from "../layers";
import GenerateDropdownData from "dropdown-pkg-arcgis";
import { useQuery } from "@tanstack/react-query";
import { MyContext } from "../contexts/MyContext";

const theme = {
  bg: "#2b2b2b",
  bgDisabled: "#232323",
  border: "#444444",
  borderHover: "#5a5a5a",
  borderFocus: "#6aa9ff",
  text: "#ffffff",
  textMuted: "#9a9a9a",
  optionFocused: "#3a3a3a",
  optionSelected: "#353535",
};

const customStyles = {
  container: (s: any) => ({ ...s, width: "180px" }),
  control: (s: any, { isDisabled, isFocused }: any) => ({
    ...s,
    backgroundColor: isDisabled ? theme.bgDisabled : theme.bg,
    borderColor: isFocused ? theme.borderFocus : theme.border,
    borderRadius: "6px",
    minHeight: "36px",
    boxShadow: "none",
    opacity: isDisabled ? 0.6 : 1,
    "&:hover": {
      borderColor: isFocused ? theme.borderFocus : theme.borderHover,
    },
  }),
  placeholder: (s: any) => ({ ...s, color: theme.textMuted }),
  singleValue: (s: any) => ({ ...s, color: theme.text }),
  input: (s: any) => ({ ...s, color: theme.text }),
  indicatorSeparator: (s: any) => ({ ...s, backgroundColor: theme.border }),
  dropdownIndicator: (s: any) => ({
    ...s,
    color: theme.textMuted,
    "&:hover": { color: theme.text },
  }),
  clearIndicator: (s: any) => ({
    ...s,
    color: theme.textMuted,
    "&:hover": { color: theme.text },
  }),
  menu: (s: any) => ({
    ...s,
    backgroundColor: theme.bg,
    border: `1px solid ${theme.border}`,
    overflow: "hidden",
  }),
  option: (s: any, { isFocused, isSelected }: any) => ({
    ...s,
    backgroundColor: isFocused
      ? theme.optionFocused
      : isSelected
        ? theme.optionSelected
        : theme.bg,
    color: theme.text,
    cursor: "pointer",
  }),
};

export function DropdownData() {
  const { updateStation, updateCompany, updateUtype } = use(MyContext);

  const [stationSelected, setStationSelected] = useState<null | any>(null);
  const [companySelected, setCompanySelected] = useState<null | any>(null);
  const [utypeSelected, setUtypeSelected] = useState<null | any>(null);

  //--- Derived option lists — recomputed only when their parent selection changes.
  const companyList = useMemo(
    () => stationSelected?.field2 ?? [],
    [stationSelected],
  );
  const utypeList = useMemo(
    () => companySelected?.field3 ?? [],
    [companySelected],
  );

  const { data: stationList } = useQuery<any>({
    queryKey: ["dropdownData"], // Do not add lotLayer as a dependency. The dropdown list will not be updated properly.
    queryFn: async () => {
      const dropdownData = new GenerateDropdownData(
        [utilityPointLayer, utilityLineLayer],
        ["Station1", "Company", "Type"],
      );
      return await dropdownData.dropDownQuery();
    },
    staleTime: Infinity, // never refetch in the backround on its own.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleStationChange = (obj: any) => {
    updateStation(obj?.field1 ?? null);
    updateCompany(null);
    updateUtype(null);
    setStationSelected(obj);
    setCompanySelected(null);
    setUtypeSelected(null);
  };

  const handleCompanyChange = (obj: any) => {
    updateCompany(obj?.name ?? null);
    updateUtype(null);
    setCompanySelected(obj);
    setUtypeSelected(null);
  };

  const handleTypeChange = (obj: any) => {
    updateUtype(obj?.name ?? null);
    setUtypeSelected(obj);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <b style={{ color: "white", margin: 10, fontSize: "0.9vw" }}></b>
      <Select
        placeholder="Select CP"
        value={stationSelected}
        options={stationList && stationList}
        onChange={handleStationChange}
        getOptionLabel={(x: any) => x.field1}
        isClearable
        styles={customStyles}
      />
      <br />
      <b style={{ color: "white", margin: 10, fontSize: "0.9vw" }}></b>
      <Select
        placeholder="Select Company"
        value={companySelected}
        options={companyList && companyList}
        onChange={handleCompanyChange}
        getOptionLabel={(x: any) => x.name}
        isClearable
        styles={customStyles}
      />
      <br />
      <b style={{ color: "white", margin: 10, fontSize: "0.9vw" }}></b>
      <Select
        placeholder="Select Type"
        value={utypeSelected}
        options={utypeList && utypeList}
        onChange={handleTypeChange}
        getOptionLabel={(x: any) => x.name}
        isClearable
        styles={customStyles}
      />
    </div>
  );
}
