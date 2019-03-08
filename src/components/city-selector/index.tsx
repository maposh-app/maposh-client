import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Select from "react-select";
import { ICity, ICityLabel } from "../../model/location";
import { MaposhState } from "../../store";
import { updateCity } from "../../store/map/actions";
import { IMapState } from "../../store/map/types";
import { ISystemState } from "../../store/system/types";
import { selectify } from "../../utils/transform";

interface ILocationSelectorProps {
  updateCity: (newCity: string) => void;
  map: IMapState;
  system: ISystemState;
}

const LocationSelector: React.SFC<ILocationSelectorProps> = props => {
  const { t } = useTranslation();
  const onSelect = (label: any) => {
    if (label) {
      props.updateCity(label.value as ICity);
    }
  };

  const currentCity = props.map.location.city;
  const currentCities: ICityLabel[] = selectify(
    t("city", {
      returnObjects: true
    })
  );

  return (
    <Select
      value={{
        label: t(`city.${currentCity}`),
        value: currentCity
      }}
      isClearable={false}
      menuShouldScrollIntoView={false}
      menuShouldBlockScroll={true}
      options={currentCities}
      onChange={onSelect}
    />
  );
};

const mapStateToProps = (state: MaposhState) => ({
  map: state.map,
  system: state.system
});

export default connect(
  mapStateToProps,
  { updateCity }
)(LocationSelector);
