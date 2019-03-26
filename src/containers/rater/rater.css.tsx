import config from "../../config";
import styled from "../../service/theme/styled-components";

export const DownArrow = styled.button`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid ${config.theme.colorTender};
  border-bottom: 0;
  background: none !important;
  padding: 0 !important;
  outline: none !important;
  margin: 10px;
  margin-bottom:0;
`;

export const UpArrow = styled.button`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid ${config.theme.colorTender};
  border-top: 0;
  background: none !important;
  padding: 0 !important;
  outline: none !important;
  margin: 10px;
  margin-top:0;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RatingCount = styled.span`
  font-weight: bold;
`;
