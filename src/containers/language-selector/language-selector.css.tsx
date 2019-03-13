import * as React from "react";
import { components } from "react-select";
import { ControlProps } from "react-select/lib/components/Control";
import { OptionProps } from "react-select/lib/components/Option";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import config from "../../config";
import styled from "../../service/theme/styled-components";

export const SelectorBox = styled.div`
  display: flex;
  flex-flow: row-reverse;
  justify-content: flex-start;
  align-items: center;
`;

export const OptionsBox = styled(SelectorBox)`
  border-right: 1px solid ${config.theme.colorPrimary};
`;

export const LanguageBox = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-flow: row;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;

const Flag = styled.div`
  border-width: 1.5px;
  width: ${config.theme.iconSize};
  height: ${config.theme.iconSize};
  border-color: ${config.theme.colorTender} !important;
  border-style: solid !important;
  border-radius: 100% !important;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  background-image: ${(props: { image: string }) => `url(${props.image})`};
`;

const FlagContainer = styled.div`
  .css-vj8t7z {
    border: 0;
    background: transparent;
  }
`;

const flagImage = (language: string) => {
  return `${process.env.PUBLIC_URL}/assets/flags/${language}.svg`;
};

const { Option, Control } = components;

export const FlagOption = (props: OptionProps<any>) => {
  const flag = flagImage(props.data.value);
  return (
    <Option {...props}>
      <Flag image={flag} />
    </Option>
  );
};

export const FlagSingleValue = (props: SingleValueProps<any>) => {
  const flag = flagImage(props.data.value);
  return <Flag image={flag} />;
};

export const FlagControl = (props: ControlProps<any>) => {
  return (
    <FlagContainer>
      <Control {...props} />
    </FlagContainer>
  );
};
