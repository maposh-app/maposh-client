import config from "../../config";
import styled from "../../service/theme/styled-components";

export const MapBox = styled.div`
  position: relative;
  flex: 1 1 auto;
  pointer-events: auto;
  height: 1em;
`;

export const NavigationBox = styled.div`
  position: fixed;
  top: 4em;
  right: 0.5em;
`;

export const DrawStyles = [
  // ACTIVE (being drawn)
  // line stroke
  {
    id: "gl-draw-line",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": config.theme.colorTender,
      "line-dasharray": [0.2, 2],
      "line-width": 3
    }
  },
  // polygon fill
  {
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    paint: {
      "fill-color": config.theme.colorCoprimary,
      "fill-outline-color": config.theme.colorCoprimary,
      "fill-opacity": 0.5
    }
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": config.theme.colorTender,
      "line-dasharray": [0.2, 2],
      "line-width": 4
    }
  },
  // vertex point halos
  {
    id: "gl-draw-polygon-and-line-vertex-halo-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 7,
      "circle-color": "#FFF"
    }
  },
  // vertex points
  {
    id: "gl-draw-polygon-and-line-vertex-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": config.theme.colorTender
    }
  }
];
