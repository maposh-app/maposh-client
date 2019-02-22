import i18next from "i18next";
import * as React from "react";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { ILanguage } from "../../model/language";
import {
  Flag,
  LanguageBox,
  OptionsBox,
  SelectorBox
} from "./language-selector.css";

const locale: {
  default: string;
  supported: { [id: string]: string };
  selector: { [prop: string]: any };
} = config.locale;

interface ISelectorState {
  lang: ILanguage;
  isOpen: boolean;
  languages: [string];
}

interface ISelectorProps {
  size: number;
}

interface ILanguageComponent {
  size: number;
  lang: ILanguage;
  onClick?: (i18n: i18next.i18n) => () => void;
  onKeyUp?: (i18n: i18next.i18n) => (event: React.KeyboardEvent) => void;
}

export const Language: React.SFC<ILanguageComponent> = props => {
  const { i18n } = useTranslation();
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
          backgroundImage: `url(${require(`../../assets/flags/${props.lang.id.toLowerCase()}.svg`)})`
        }}
        aria-label={`Language: ${props.lang.name}`}
      />
    </LanguageBox>
  );
};

export default class LanguageSelector extends React.Component<
  ISelectorProps,
  ISelectorState
> {
  public static defaultProps: ISelectorProps = { size: locale.selector.size };

  public wrapperRef: HTMLDivElement;
  public constructor(props: ISelectorProps) {
    super(props);
    const language = i18next.language.split("-")[0];
    this.state = {
      lang: {
        id: language,
        name: locale["supported"][language]
      },
      isOpen: false,
      languages: [language]
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
    this.setState({
      lang: { id, name: locale["supported"]["id"] }
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
    this.setState({ languages: Object.keys(locale["supported"]) as [string] });
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
        style={{ fontSize: `${this.props.size}em` }}
        onClick={this.toggleSelector}
        onKeyUp={(event: React.KeyboardEvent) =>
          this.toggleSelectorWithKeyboard(event)
        }
      >
        <Language size={this.props.size} lang={this.state.lang} />
        <OptionsBox>
          {this.state.isOpen &&
            this.state.languages.reduce((filtered: any, id: string) => {
              if (id !== this.state.lang.id) {
                const language = this.getLanguage(id);
                filtered.push(
                  <Language
                    key={id}
                    size={this.props.size}
                    lang={language}
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

  private getLanguage(id: string): ILanguage {
    return { id, name: locale["supported"]["id"] };
  }
}
