import i18next from "i18next";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import config from "src/config";
import { whichLanguage, whichLanguages } from "src/config";
import { ILanguage } from "src/model/language";
import { MaposhState } from "src/store";
import { updateLanguage } from "src/store/system/actions";
import { ISystemState } from "src/store/system/types";
import {
  Flag,
  LanguageBox,
  OptionsBox,
  SelectorBox
} from "./language-selector.css";

interface ILanguageComponent {
  size: number;
  language: ILanguage;
  onClick?: (i18n: i18next.i18n) => () => void;
  onKeyUp?: (i18n: i18next.i18n) => (event: React.KeyboardEvent) => void;
}

export const Language: React.SFC<ILanguageComponent> = props => {
  const { i18n } = useTranslation();
  const flagImage = require(`../../assets/flags/${props.language.id.toLowerCase()}.svg`);
  return (
    <LanguageBox
      onClick={props.onClick ? props.onClick(i18n) : () => true}
      onKeyUp={
        props.onKeyUp
          ? props.onKeyUp(i18n)
          : (event: React.KeyboardEvent) => true
      }
    >
      <Flag
        style={{
          width: `${props.size}em`,
          height: `${props.size}em`,
          backgroundImage: `url(${flagImage})`
        }}
        aria-label={`Language: ${props.language.name}`}
      />
    </LanguageBox>
  );
};

interface ISelectorState {
  isOpen: boolean;
  languages: string[];
  size: number;
}

interface ISelectorProps {
  system: ISystemState;
  updateLanguage: typeof updateLanguage;
}

class LanguageSelector extends React.Component<ISelectorProps, ISelectorState> {
  public wrapperRef: HTMLDivElement;
  public constructor(props: ISelectorProps) {
    super(props);
    const language = i18next.language.split("-")[0];
    this.props.updateLanguage({
      language: whichLanguage(language)
    });
    this.state = {
      isOpen: false,
      languages: [language],
      size: config.locale.selector.size
    };
    this.toggleSelector = this.toggleSelector.bind(this);
    this.closeSelector = this.closeSelector.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.setLanguages = this.setLanguages.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  public setWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node;
  };

  public toggleSelector = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public toggleSelectorWithKeyboard = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      // enter key: toggle options
      this.toggleSelector();
    } else if (event.keyCode === 27) {
      // esc key: hide options
      this.setState({
        isOpen: false
      });
    }
  };

  public closeSelector = (event: MouseEvent) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target as HTMLDivElement)
    ) {
      this.setState({
        isOpen: false
      });
    }
  };

  public onSelect = (id: string, translator: i18next.i18n) => {
    this.props.updateLanguage({
      language: whichLanguage(id)
    });
    translator.changeLanguage(id);
  };

  public onSelectWithKeyboard = (
    event: React.KeyboardEvent,
    id: string,
    translator: i18next.i18n
  ) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      // enter key: select
      this.onSelect(id, translator);
    } else if (event.keyCode === 27) {
      // esc key: hide options
      this.toggleSelector();
    }
  };

  public setLanguages = () => {
    this.setState({ languages: Object.keys(whichLanguages()) as string[] });
  };

  public componentDidMount() {
    this.setLanguages();
    window.addEventListener("click", this.closeSelector);
  }

  public componentWillUnmount() {
    window.removeEventListener("click", this.closeSelector);
  }

  public render() {
    return (
      <SelectorBox
        ref={this.setWrapperRef}
        style={{ fontSize: `${this.state.size}em` }}
        onClick={this.toggleSelector}
        onKeyUp={(event: React.KeyboardEvent) =>
          this.toggleSelectorWithKeyboard(event)
        }
      >
        <Language
          size={this.state.size}
          language={this.props.system.language}
        />
        <OptionsBox>
          {this.state.isOpen &&
            this.state.languages.reduce((filtered: any, id: string) => {
              if (id !== this.props.system.language.id) {
                const language = whichLanguage(id);
                filtered.push(
                  <Language
                    key={id}
                    size={this.state.size}
                    language={language}
                    onClick={translator => () => this.onSelect(id, translator)}
                    onKeyUp={translator => (event: React.KeyboardEvent) =>
                      this.onSelectWithKeyboard(event, id, translator)}
                  />
                );
              }
              return filtered;
            }, [])}
        </OptionsBox>
      </SelectorBox>
    );
  }
}

const mapStateToProps = (state: MaposhState) => ({
  system: state.system
});

export default connect(
  mapStateToProps,
  { updateLanguage }
)(LanguageSelector);
