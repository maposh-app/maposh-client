import { Popup } from "react-mapbox-gl";
import config from "../../config";
import styled from "../../service/theme/styled-components";

export const MapBox = styled.div`
  position: relative;
  flex: 1;
  height: 1em;
  .mapboxgl-popup-content {
    border-radius: ${config.theme.elementBorderRadius};
  }
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

export const SearchBox = styled.div`
  position: relative;
  top: 1em;
  pointer-events: none;
  touch-action: none;
  z-index: 20;
  .mapboxgl-ctrl-geocoder {
    margin: auto;
    border-radius: ${config.theme.elementBorderRadius};
  }
`;

export const StyledPopup = styled.div`
  position: absolute;
  display: flex;
  padding: 0.5em;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 95%;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  outline: none;
  background-color: #fff;
  border-color: transparent;
  border-radius: ${config.theme.elementBorderRadius};
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
`;

export const trackingStyle = {
  "line-color": config.theme.colorTender,
  "line-width": 2,
  "line-dasharray": [1, 2]
};

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
  "circle-radius": 10,
  "circle-color": ["get", "color"],
  "circle-stroke-width": 1,
  "circle-opacity": 0.7
};

export const favouritePlacesMapLayout = {
  "icon-image": "favourite-place",
  "icon-size": 0.1
};
