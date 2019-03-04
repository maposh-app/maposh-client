import i18next from "i18next";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Select from "react-select";
import { getLanguages } from "../../config";
import { ILanguageLabel } from "../../model/language";
import { MaposhState } from "../../store";
import { updateLanguage } from "../../store/system/actions";
import { ISystemState } from "../../store/system/types";
import { selectify } from "../../utils/transform";

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

  const onSelect = (label: any) => {
    props.updateLanguage({
      language: label.value
    });

    i18n.changeLanguage(label.value);
  };

  const currentLanguages: ILanguageLabel[] = selectify(getLanguages());

  return (
    <Select
      value={{
        value: props.system.language,
        label: t(`language.${props.system.language}`)
      }}
      options={currentLanguages}
      onChange={onSelect}
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
