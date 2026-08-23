import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  c_boundary_renderer,
  minScale,
  portalItems,
  station_box_renderer,
  station_labels,
  station_renderer,
  util_popup,
  utill2_line_label,
  utill2_renderer,
  utilp2_label,
  utilp2_renderer,
  utilp_renderer,
} from "./uniqueValues";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- CONSTRUCTION BOUNDARY LAYER ---//
export const constructionBoundaryLayer = new FeatureLayer({
  portalItem: portalItems("0c172b82ddab44f2bb439542dd75e8ae"),
  layerId: 4,
  renderer: c_boundary_renderer,
  definitionExpression: "MappingBoundary = 1",
  title: "Construction Boundary",
  elevationInfo: { mode: "on-the-ground" },
  popupEnabled: false,
});

//--- STATION-BOX LAYER ---//
export const stationBoxLayer = new FeatureLayer({
  portalItem: portalItems("52d4f29105934e3f95f6b39c7e5fba6e"),
  layerId: 2,
  renderer: station_box_renderer,
  minScale: 150000,
  maxScale: 0,
  title: "Station Box",
  popupEnabled: false,
  elevationInfo: { mode: "on-the-ground" },
});

//--- STATION POINT LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("52d4f29105934e3f95f6b39c7e5fba6e"),
  layerId: 1,
  title: "Station",
  labelingInfo: [station_labels],
  renderer: station_renderer,
  definitionExpression: "sector = 'MMSP'",
  elevationInfo: { mode: "relative-to-ground" },
});
stationLayer.listMode = "hide";

//----------------------------------------------//
//                 Other Layers                 //
//----------------------------------------------//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("a084d9cae5234d93b7aa50f7eb782aec"),
});

//----------------------------------------------//
//          Utility Point & Line Layers         //
//----------------------------------------------//
//--- UTILITY POINT LAYER 1 (Point Symbol) ---//
export const utilityPointLayer = new FeatureLayer({
  portalItem: portalItems("8d700179fca44aef967ea78a01fc4279"),
  layerId: 1,
  title: "Point Symbol",
  renderer: utilp_renderer,
  elevationInfo: {
    mode: "relative-to-ground",
    featureExpressionInfo: { expression: "$feature.Height" },
    unit: "meters",
  },
  minScale: minScale,
  popupTemplate: util_popup,
});

export const utilityPointLayer1 = new FeatureLayer({
  portalItem: portalItems("8d700179fca44aef967ea78a01fc4279"),
  layerId: 1,
  title: "Point Status",
  renderer: utilp2_renderer,
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: { expression: "$feature.Height" },
    unit: "meters",
  },
  minScale: minScale,
  labelingInfo: [utilp2_label],
  popupTemplate: util_popup,
});

//--- UTILITY LINE LAYER 1 (LINE SYMBOL) ---//
export const utilityLineLayer = new FeatureLayer({
  portalItem: portalItems("8d700179fca44aef967ea78a01fc4279"),
  layerId: 2,
  title: "Line Symbol ",
  elevationInfo: {
    mode: "relative-to-ground",
    featureExpressionInfo: { expression: "$feature.height" },
    unit: "meters",
  },
  minScale: minScale,
  popupTemplate: util_popup,
});

//--- UTILITY LINE LAYER 2 (LINE STATUS) ---//
export const utilityLineLayer1 = new FeatureLayer({
  portalItem: portalItems("8d700179fca44aef967ea78a01fc4279"),
  layerId: 2,
  title: "Line Status",
  elevationInfo: {
    mode: "relative-to-ground",
    featureExpressionInfo: { expression: "$feature.height" },
    unit: "meters",
  },
  minScale: minScale,
  renderer: utill2_renderer,
  labelingInfo: [utill2_line_label],
  popupTemplate: util_popup,
});

export const utilityLayers: any = {
  Point: [utilityPointLayer, utilityPointLayer1],
  Line: [utilityLineLayer, utilityLineLayer1],
};

export const utilityGroupLayer = new GroupLayer({
  title: "Utility Relocation",
  visible: true,
  visibilityMode: "independent",
  layers: [
    utilityLineLayer1,
    utilityLineLayer,
    utilityPointLayer1,
    utilityPointLayer,
  ],
});

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [stationBoxLayer, constructionBoundaryLayer], //stationLayer,
});

export const sources: any = [
  {
    layer: utilityPointLayer,
    searchFields: ["Id"],
    displayField: "Id",
    exactMatch: false,
    outFields: ["Id"],
    name: "Unique ID (Point)",
    placeholder: "example: MER0001-X01",
  },
  {
    layer: utilityLineLayer1,
    searchFields: ["Id"],
    displayField: "Id",
    exactMatch: false,
    outFields: ["Id"],
    name: "Unique ID (Line)",
    placeholder: "example: MER0001-X01",
  },
];
