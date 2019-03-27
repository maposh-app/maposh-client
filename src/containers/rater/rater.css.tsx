import config from "../../config";
import styled, { css } from "../../service/theme/styled-components";

export const Arrow = styled.button`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  background: none !important;
  padding: 0 !important;
  outline: none !important;
  margin: 10px;
`;

export const DownArrow = styled(Arrow)`
  border-top: 15px solid ${config.theme.colorTender};
  border-bottom: 0;
  margin-bottom: 0;
  ${(props: { active: boolean }) =>
    props.active &&
    css`
      border-top: 15px solid ${config.theme.colorNegative};
    `};
`;

export const UpArrow = styled(Arrow)`
  border-top: 0;
  margin-top: 0;
  border-bottom: 15px solid ${config.theme.colorTender};
  ${(props: { active: boolean }) =>
    props.active &&
    css`
      border-bottom: 15px solid ${config.theme.colorPositive};
    `};
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RatingCount = styled.span`
  font-weight: bold;
`;
