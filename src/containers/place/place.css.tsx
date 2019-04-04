import config from "../../config";
import styled from "../../service/theme/styled-components";

export const PlaceLink = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const PlaceBox = styled.div`
  background: white;
  font-weight: bold;
  font-size: 1.5em;
  border-radius: ${config.theme.elementBorderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlaceInfo = styled.div`
  margin: 15px;
`;

export const PlaceMarker = styled.div`
  margin: 10px;
  margin-right: 5px;
  border-width: 1.5px;
  flex-shrink: 0;
  width: ${config.map.foursquare.photo_side}px !important;
  height: ${config.map.foursquare.photo_side}px !important;
  border-color: ${config.theme.colorTender} !important;
  border-style: solid !important;
  border-radius: 100% !important;
  background-size: cover;
  background-position: center;
  background: ${(props: { image?: string }) => `url(${props.image})`};
`;
