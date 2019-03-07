import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";
import { getLanguage, getLanguages } from "../../config";
import { ILanguageLabel } from "../../model/language";
import { MaposhState } from "../../store";
import { updateLanguage } from "../../store/system/actions";
import { ISystemState } from "../../store/system/types";
import { selectify } from "../../utils/transform";
import { FlagControl, FlagOption, FlagSingleValue } from "./language-selector.css";

interface ISelectorProps {
  system: ISystemState;
  updateLanguage: typeof updateLanguage;
}

const LanguageSelector: React.SFC<ISelectorProps> = props => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    props.updateLanguage({
      language: i18n.languages[0]
    });
  });

  const onSelect = (label: ValueType<ILanguageLabel>) => {
    if (label && (label as ILanguageLabel).value) {
      const language = (label as ILanguageLabel).value;
      props.updateLanguage({
        language
      });

      i18n.changeLanguage(language);
    }
  };

  const currentLanguages: ILanguageLabel[] = selectify(getLanguages());

  return (
    <Select
      value={{
        value: props.system.language,
        label: getLanguage(props.system.language)
      }}
      components={{
        Option: FlagOption,
        SingleValue: FlagSingleValue,
        Control: FlagControl
      }}
      options={currentLanguages}
      onChange={onSelect}
      isSearchable={false}
      menuPlacement="top"
    />
  );
};

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

export default connect(
  mapStateToProps,
  { updateLanguage }
)(LanguageSelector);
