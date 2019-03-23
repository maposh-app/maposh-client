import * as React from "react";
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

export const ShowPlacesButton = styled.button`
  position: absolute;
  font-size: 1.5em;

  @media (min-width: 768px) {
    top: 7px;
    left: 50px;
  }

  @media (max-width: 768px) {
    right: 5px;
    bottom: 50px;
  }
  padding: 1em;
  outline: none;
  background-color: #fff;
  border-radius: ${config.theme.elementBorderRadius};
`;

export const clusterMarkerStyle = {
  width: config.map.foursquare.photo_side,
  height: config.map.foursquare.photo_side,
  borderRadius: "50%",
  backgroundColor: "#51D5A0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  border: "2px solid #56C498",
  cursor: "pointer"
};

export const PlacePopup = styled.div`
  background: white;
  font-weight: 400;
  font-style: bold;
  padding: 5px;
  border-radius: ${config.theme.elementBorderRadius};
`;

export const PlaceMarker = styled.div`
  border-width: 1.5px;
  width: ${config.map.foursquare.photo_side}px;
  height: ${config.map.foursquare.photo_side}px;
  border-color: ${config.theme.colorTender} !important;
  border-style: solid !important;
  border-radius: 100% !important;
  background-size: cover;
  background-position: center;
  /* background: ${(props: { image: string }) => `url(${props.image})`}; */
`;

export const SearchBox = styled.div`
  position: relative;
  top: 1em;
  pointer-events: none;
  z-index: 20;
  .mapboxgl-ctrl-geocoder {
    margin: auto;
  }
`;

export const drawStyle = [
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

export const placesLayerStyle = {
  "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 7, 10, 10],
  "circle-color": ["get", "color"],
  "circle-stroke-width": 1,
  "circle-opacity": 0.7
};
