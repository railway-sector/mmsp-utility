import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import SizeVariable from "@arcgis/core/renderers/visualVariables/SizeVariable";
import RotationVariable from "@arcgis/core/renderers/visualVariables/RotationVariable";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";

//----------------------------------------------//
//              portalItem                      //
//----------------------------------------------//
const portalItem_url = { url: "https://gis.railway-sector.com/portal" };

export const portalItems = (id: any) => {
  return { id: id, portal: portalItem_url };
};

//----------------------------------------------//
//              Chart Parameters                //
//----------------------------------------------//
// chart width
export const chart_width = "26vw";
export const chart_box_width = 250;

// labeling and value label color
export const labelColor = "#9ca3af";
export const valueColor = "#d1d5db";

export type StatusTypenamesType =
  | "To be Constructed"
  | "Under Construction"
  | "delayed"
  | "Completed";
export type StatusStateType = "comp" | "incomp" | "ongoing" | "delayed";
export type LayerNameType = "utility" | "viaduct" | "others";
export type TypeFieldType = "number" | "string";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- STATION BOX LAYER ---//
const station_box_q = [
  {
    value: "U-Shape Retaining Wall",
    color: [104, 104, 104],
    style: "backward-diagonal",
    olwidth: 1,
    olcolor: "black",
  },
  {
    value: "Cut & Cover Box",
    color: [104, 104, 104],
    style: "backward-diagonal",
    olwidth: 1,
    olcolor: "black",
  },
  {
    value: "TBM Shaft",
    color: [104, 104, 104],
    style: "backward-diagonal",
    olwidth: 1,
    olcolor: "black",
  },
  {
    value: "TBM",
    color: [178, 178, 178],
    style: "backward-diagonal",
    olwidth: 0.5,
    olcolor: "black",
  },
  {
    value: "Station Platform",
    color: [240, 240, 230],
    style: "backward-diagonal",
    olwidth: 0.4,
    olcolor: "black",
  },
  {
    value: "Station Box",
    color: [0, 0, 0, 0],
    style: "none",
    olwidth: 2,
    olcolor: "red",
  },
  {
    value: "NATM",
    color: [178, 178, 178, 0],
    style: "backward-diagonal",
    olwidth: 0.5,
    olcolor: "grey",
  },
];

export const station_box_uniqueV = station_box_q.map((v: any) => {
  return {
    value: v.value,
    symbol: new SimpleFillSymbol({
      color: v.color,
      style: v.style,
      outline: { width: v.olwidth, color: v.olcolor },
    }),
  };
});

export const station_box_renderer = new UniqueValueRenderer({
  field: "Layer",
  uniqueValueInfos: station_box_uniqueV,
});

//--- CONSTRUCTION BOUNDARY ---//
export const c_boundary_renderer = new UniqueValueRenderer({
  field: "MappingBoundary",
  uniqueValueInfos: [
    {
      value: 1,
      label: "",
      symbol: new SimpleFillSymbol({
        style: "none",
        outline: { width: 2.5, color: [255, 255, 255], style: "short-dash" },
      }),
    },
  ],
});

//--- STATION POINT LAYER ---//
export const station_labels = new LabelClass({
  labelExpressionInfo: { expression: "$feature.Station1" },
  symbol: {
    type: "text",
    color: "black",
    haloColor: "white",
    haloSize: 1,
    font: { size: 10, weight: "bold" },
  },
});

function IconSymbol(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriIconsStyle", //EsriRealisticTransportationStyle, EsriIconsStyle
  });
}

export const station_renderer = new UniqueValueRenderer({
  field: "Station",
  defaultSymbol: IconSymbol("Train"),
});

//---------------------------------------------//
//             Utility Relocation              //
//---------------------------------------------//
//--- Utility Fields
export const util_dtype_f = "Type";
export const util_type_f = "UtilType";
export const util_status_f = "Status";
export const station_f = "Station1";
export const company_f = "Company";
export const minScale = 25000;

export const util_type_icons = [
  "https://EijiGorilla.github.io/Symbols/Telecom_Logo2.svg",
  "https://EijiGorilla.github.io/Symbols/Water_Logo2.svg",
  "https://EijiGorilla.github.io/Symbols/Sewage_Logo2.svg",
  "https://EijiGorilla.github.io/Symbols/Power_Logo2.svg",
  "https://EijiGorilla.github.io/Symbols/Safety.svg",
  "https://EijiGorilla.github.io/Symbols/Drainage.svg",
  "https://EijiGorilla.github.io/Symbols/Gas_Logo2.svg",
];

export const util_types = [
  { value: 1, category: "Telecom", icon: util_type_icons[0] },
  { value: 2, category: "Water", icon: util_type_icons[1] },
  { value: 3, category: "Sewage", icon: util_type_icons[2] },
  { value: 4, category: "Power", icon: util_type_icons[3] },
  { value: 5, category: "Safety", icon: util_type_icons[4] },
  { value: 6, category: "Drainage", icon: util_type_icons[5] },
  { value: 7, category: "Gas", icon: util_type_icons[6] },
];

export const util_status_q = [
  { value: 0, status: "incomp", color: "#000000" },
  { value: 1, status: "comp", color: "#0070ff" },
];

//--- UtilityType2 parameters
export const utilityType2Field = "UtilType2";

//--- COMMON PARAMETERS ---//
//--- Label definition
interface labelSymbol3DProps {
  materialColor: any;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: "normal" | "bold";
  haloColor?: any;
  haloSize?: number;
  vOffsetScreenLength?: number;
  vOffsetMaxWorldLength?: number;
  vOffsetMinWorldLength?: number;
  calloutType?: number;
  calloutColor?: any;
  calloutSize?: number;
  calloutBorderColor?: any;
}

export const utilLabelSymbol3D = ({
  materialColor,
  fontSize,
  fontFamily,
  fontWeight,
  haloColor,
  haloSize,
  vOffsetScreenLength,
  vOffsetMaxWorldLength,
  vOffsetMinWorldLength,
  calloutColor,
  calloutSize,
  calloutBorderColor,
}: labelSymbol3DProps) => {
  const labelSymbol3D = new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: { color: materialColor },
        size: fontSize,
        font: { family: fontFamily, weight: fontWeight },
        halo: { color: haloColor, size: haloSize },
      }),
    ],
    verticalOffset: {
      screenLength: vOffsetScreenLength,
      maxWorldLength: vOffsetMaxWorldLength,
      minWorldLength: vOffsetMinWorldLength,
    },
    callout: new LineCallout3D({
      color: calloutColor,
      size: calloutSize,
      border: { color: calloutBorderColor },
    }),
  });

  return labelSymbol3D;
};

//------------------------------//
//         Utility Point        //
//------------------------------//
//-- UTILITY POINT SYMBOL
function customSymbol3D(name: string) {
  return new WebStyleSymbol({
    styleUrl:
      "https://www.maps.arcgis.com/sharing/rest/content/items/c04d4d4145f64f8fa38407dd5331dd1f/data",
    name: name,
  });
}

function utilPtSymbolStreet(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriRealisticStreetSceneStyle",
  });
}

function utilPtSymbolSignal(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriRealisticSignsandSignalsStyle",
  });
}

function utilPtSymbolSafety(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriRealisticSignsandSignalsStyle",
  });
}

function utilPtSymbolOthers(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriThematicTreesStyle",
  });
}

// code | label | symbol
const UTILP_TYPE_CONFIG: [number, string, any][] = [
  [1, "Telecom Pole (BTS)", customSymbol3D("3D_Telecom_BTS")],
  [2, "Telecom Pole (CATV)", customSymbol3D("3D_TelecomCATV_Pole")],
  [3, "Telecom Pole", customSymbol3D("3D_TelecomCATV_Pole")],
  [4, "Sluice Gate", utilPtSymbolStreet("Jersey_Barrier")], // update later
  [5, "Air Valve", customSymbol3D("3D_Drain_Box")], // update later
  [6, "District Meter", customSymbol3D("3D_Drain_Box")], // update later
  [7, "Water Meter", customSymbol3D("3D_Water_Meter")], // update later
  [8, "Gate Valve", customSymbol3D("3D_Water_Valve")], // update later
  [9, "Valve", customSymbol3D("3D_Water_Valve")], // update later
  [10, "STC", customSymbol3D("3D_Drain_Box")], // update later
  [11, "Drain Box", customSymbol3D("3D_Drain_Box")], // update later
  [12, "Manhole", utilPtSymbolStreet("Storm_Drain")],
  [13, "Electric Pole", customSymbol3D("3D_Electric_Pole")], // was: utilPtSymbolInfra("Powerline_Pole")
  [
    14,
    "Street Light",
    utilPtSymbolStreet("Overhanging_Street_and_Sidewalk_-_Light_on"),
  ],
  [15, "Traffic Light", utilPtSymbolSignal("Traffic_Light_4")],
  [16, "Road Safety Signs", utilPtSymbolSafety("Pedestrian_Crossing")],
  [17, "Junction Box", customSymbol3D("3D_Drain_Box")],
  [18, "Pedestal", utilPtSymbolOthers("Sansevieria")],
  // NOTE: codes 19 (Transvault), 20 (Fire Hydrant), 21 (Handhole) are matched
  // in the original valueExpression but have no symbol defined below — same
  // gap exists in the source, kept as-is. Add entries here once symbols exist.
];

const decode_pointPairs = UTILP_TYPE_CONFIG.map(
  ([code, label]) => `${code}, '${label}'`,
).join(",\n      ");

export const utilp_renderer = new UniqueValueRenderer({
  valueExpression: `
    Decode($feature.UtilType2,
      ${decode_pointPairs},
      $feature.UtilType
    )
  `,
  uniqueValueInfos: UTILP_TYPE_CONFIG.map(([, value, symbol]) => ({
    value,
    symbol,
  })),
  visualVariables: [
    new SizeVariable({ axis: "height", field: "SIZE", valueUnit: "meters" }),
    new RotationVariable({ field: "ROTATION" }),
  ],
});

//-- UTILITY POINT STATUS SYMBOL
const SYMBOL_BASE_URL = "https://EijiGorilla.github.io/Symbols/";
const SYMBOL_COLOR = "#D13470";

function getStatusSymbol(name: string, color: any, sizeS: number) {
  return new PointSymbol3D({
    symbolLayers: [
      new IconSymbol3DLayer({
        resource: { href: name },
        size: sizeS,
        outline: { color: color, size: 2 },
      }),
    ],

    verticalOffset: {
      screenLength: 10,
      maxWorldLength: 30,
      minWorldLength: 35,
    },

    callout: {
      type: "line",
      color: [128, 128, 128, 0.1],
      size: 0.2,
      border: { color: "grey" },
    },
  });
}

// value | label | icon filename | size
const UTILP_STATUS_CONFIG = [
  ["NeedCheck", "Need to Check", "Unknown_v2.png", 20],
  ["DemolishIncomplete", "To be Demolished", "Demolished.png", 20],
  ["DemolishComplete", "Demolision Completed", "DemolishComplete_v2.png", 25],
  ["RelocIncomplete", "Proposed Relocation", "Relocatd.png", 30],
  [
    "RelocComplete",
    "Relocation Completed",
    "Utility_Relocated_Completed_Symbol.png",
    30,
  ],
  ["NewlyAdded", "Add New Utility", "NewlyAdded.png", 35],
  ["NewlyAddedComplete", "Newly Utility Added", "NewlyAdded_Completed.png", 35],
  ["Replaced", "To be Replaced", "UL_Replace_icomplete_symbol.png", 30],
  ["ReplaceComplete", "Replacement Complete", "UL_Replace_complete.png", 30],
  ["Retained", "Retained", "UL_Retained.png", 30],
  [
    "TemporaryDivertIncomplete",
    "To be Temporary Diverted",
    "Temp_Diversion_Incomplete_Logo.png",
    30,
  ],
  [
    "TemporaryDivertComplete",
    "Temporary Diversion Completed",
    "Temp_Diversion_Complete_Logo.png",
    30,
  ],
  ["ReturnedIncomplete", "To be Returned", "Returned_Incomplete_Logo.png", 30],
  ["ReturnedComplete", "Returned Completed", "Returned_Complete_Logo.png", 30],
  ["NoAction", "Require Data Checking", "Unknown_v2.png", 30],
];

// Maps "LAYER_Status" -> status value, matching the original When() logic
const POINTLAYER_STATUS_MAP = {
  "1_0": "DemolishIncomplete",
  "1_1": "DemolishComplete",
  "2_0": "RelocIncomplete",
  "2_1": "RelocComplete",
  "3_0": "NewlyAdded",
  "3_1": "NewlyAddedComplete",
  "4_1": "Retained",
  "5_0": "Replaced",
  "5_1": "ReplaceComplete",
  "6_0": "TemporaryDivertIncomplete",
  "6_1": "TemporaryDivertComplete",
  "7_0": "ReturnedIncomplete",
  "7_1": "ReturnedComplete",
};

const decodePairs = Object.entries(POINTLAYER_STATUS_MAP)
  .map(([key, val]) => `'${key}', '${val}'`)
  .join(",\n      ");

export const utilp2_renderer = new UniqueValueRenderer({
  valueExpression: `
    var key = When($feature.Checks == 1, 'check', Text($feature.LAYER) + '_' + Text($feature.Status));
    Decode(key,
      'check', 'NeedCheck',
      ${decodePairs},
      $feature.Comp_Agency
    )
  `,
  uniqueValueInfos: UTILP_STATUS_CONFIG.map(
    ([value, label, icon, size]: any) => ({
      value,
      label,
      symbol: getStatusSymbol(`${SYMBOL_BASE_URL}${icon}`, SYMBOL_COLOR, size),
    }),
  ),
});

//--- UTILITY POINT STATUS LABEL
const utilp2_text_symbol = utilLabelSymbol3D({
  materialColor: "white",
  fontSize: 10,
  haloColor: [0, 0, 0, 0.7],
  haloSize: 0.4,
});

export const utilp2_label = new LabelClass({
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression:
      "When($feature.Status >= 0, DomainName($feature, 'Comp_Agency'), '')", //$feature.Comp_Agency
  },
  symbol: utilp2_text_symbol,
});

export const util_popup = {
  title: "<div style='color: #eaeaea'>{comp_agency}</div>",
  lastEditInfoEnabled: false,
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "Id" },
        { fieldName: "Company" },
        { fieldName: "UtilType", label: "Utility Type" },
        { fieldName: "UtilType2", label: "Utility Name" },
        { fieldName: "LAYER", label: "<h5>Action</h5>" },
        { fieldName: "Status", label: "<h5>Status</h5>" },
        { fieldName: "Station1", label: "Station" },
        { fieldName: "Remarks" },
      ],
    },
  ],
};

//------------------------------//
//         Utility Line         //
//------------------------------//
//--- UTILITY LINE STATUS
// value | label | icon filename | size
const UTILL_STATUS_CONFIG = [
  ["DemolishIncomplete", "To be Demolished", "Demolished.png", 20],
  ["DemolishComplete", "Demolision Completed", "DemolishComplete_v2.png", 25],
  ["RelocIncomplete", "Proposed Relocation", "Relocatd.png", 30],
  [
    "RelocComplete",
    "Relocation Completed",
    "Utility_Relocated_Completed_Symbol.png",
    30,
  ],
  ["NewlyAdded", "Add New Utility", "NewlyAdded.png", 35],
  ["NewlyAddedComplete", "Newly Utility Added", "NewlyAdded_Completed.png", 35],
  ["NoAction", "Require Data Checking", "Unknown_v2.png", 35],
] as const;

// Maps "LAYER_Status" -> status value, matching the original When() logic
const LINE_STATUS_MAP: Record<string, string> = {
  "1_1": "DemolishComplete",
  "1_0": "DemolishIncomplete",
  "2_0": "RelocIncomplete",
  "2_1": "RelocComplete",
  "3_0": "NewlyAdded",
  "3_1": "NewlyAddedComplete",
};

const decode_LinePairs = Object.entries(LINE_STATUS_MAP)
  .map(([key, val]) => `'${key}', '${val}'`)
  .join(",\n      ");

export const utill2_renderer = new UniqueValueRenderer({
  valueExpression: `
    var key = When($feature.Remarks == 'pending', 'pending', Text($feature.LAYER) + '_' + Text($feature.Status));
    Decode(key,
      'pending', 'NoAction',
      ${decode_LinePairs},
      $feature.Comp_Agency
    )
  `,
  uniqueValueInfos: UTILL_STATUS_CONFIG.map(([value, label, icon, size]) => ({
    value,
    label,
    symbol: getStatusSymbol(`${SYMBOL_BASE_URL}${icon}`, SYMBOL_COLOR, size),
  })),
});

//--- UTILITY LINE SYMBOL
const utill_symbol_q = [
  { code: 1, color: [32, 178, 170, 0.5], label: "Telecom Line" },
  { code: 2, color: [112, 128, 144, 0.5], label: "Internet Cable Line" },
  { code: 3, color: [0, 128, 255, 0.5], label: "Duct Bank" },
  { code: 4, color: [0, 128, 255, 0.5], label: " Water Distribution Pipe" },
  { code: 5, color: [0, 197, 254, 0.5], label: "Main Line" },
  { code: 6, color: [0, 197, 254, 0.5], label: "Sub-Main Line" },
  { code: 7, color: [205, 133, 63, 0.5], label: "Canal" },
  { code: 8, color: [224, 224, 224, 0.5], label: "Sewer Pipeline" },
  { code: 9, color: [224, 224, 224, 0.5], label: "Sewer Drainage" },
  { code: 10, color: [139, 69, 19, 0.5], label: "Creek" },
  { code: 11, color: [211, 211, 211, 0.5], label: "Electric Line" },
  { code: 12, color: [105, 105, 105, 0.5], label: "Storm Drainage" },
  { code: 13, color: [105, 105, 104, 0.5], label: "Drainage" },
  { code: 14, color: [197, 0, 255, 0.5], label: "Gas Line" },
];

function utilLineSizeSymbol(
  profile: "circle" | "quad" | undefined,
  cap: "round" | "none" | "butt" | "square" | undefined,
  join: "round" | "miter" | "bevel" | undefined,
  width: number,
  height: number,
  profileRotation: "heading" | "all" | undefined,
  col: any,
) {
  return new LineSymbol3D({
    symbolLayers: [
      new PathSymbol3DLayer({
        profile: profile,
        material: { color: col },
        width: width,
        height: height,
        join: join,
        cap: cap,
        anchor: "bottom",
        profileRotation: profileRotation,
      }),
    ],
  });
}

export const utilLineRenderer = () => {
  const renderer = new UniqueValueRenderer({ field: "utiltype2" });

  utill_symbol_q.map((item: any) => {
    renderer.addUniqueValueInfo({
      value: item.code,
      symbol: utilLineSizeSymbol(
        "circle",
        "none",
        "miter",
        0.5,
        0.5,
        "all",
        item.color,
      ),
    });
  });
  return renderer;
};

//--- UTILITY LINE STATUS LABEL
const utill2_text_symbol = utilLabelSymbol3D({
  materialColor: "black",
  fontSize: 10,
  haloColor: [255, 255, 255, 0.7],
  haloSize: 0.7,
});

export const utill2_line_label = new LabelClass({
  labelExpressionInfo: {
    expression:
      "When($feature.Status >= 0, DomainName($feature, 'Comp_Agency'), '')",
  },
  symbol: utill2_text_symbol,
});

//-----------------------------------//
//          Layer List               //
//-----------------------------------//
export async function defineActions(event: any) {
  const { item } = event;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  item.title === "Chainage" ||
  item.title === "Viaduct" ||
  item.title === "Pier No"
    ? (item.visible = false)
    : (item.visible = true);
}
