import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import update from "react-addons-update";
import isEmpty from "lodash/isEmpty"
import {
    getCurrentDOM,
    getCurrentLanguage,
    getCurrentStyle,
    initField,
    toggleFieldActive,
    updateField
} from '../../actions';

import SvgSetting from '../../components/svg/SvgSetting';
import SvgContent from '../../components/svg/SvgContent';
import ButtonBasic from '../../components/ui/ButtonBasic';
import ButtonValidate from '../../components/ui/ButtonValidate';
import TextPreview from '../../components/TextPreview';
import ResponsiveToggle from "../../components/ResponsiveToggle";
import LanguageToggle from '../../containers/LanguageToggle';
import ActiveCheckBox from '../../components/ActiveCheckBox';

import InputText from '../../interfaces/InputText'
import Typography from '../../interfaces/Typography';
import ColorPicker from '../../interfaces/ColorPicker'
import Seo from '../../interfaces/Seo'

import {Icon} from '../../style/styledComponents';
import {Banner, Field} from '../../style/styledComponentsFields';
import {ChoiceItemsConfirm, Content, Settings, Choices, Column} from './styled'
import isEqual from "lodash/isEqual";
import HocField from "../../HOC/HocField";


class Text extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openColorView: false,
            openPreview: false,
            //openSettings: false,
           // openContent: false
        }
    }

    componentDidMount() {
        const FieldOnStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty];
        if (!FieldOnStore) {
            this.initField();
        } else {
            this.setState({
                content: FieldOnStore.content,
                settings: FieldOnStore.settings,
                active: FieldOnStore.active,
                storeContent : FieldOnStore.content,
                storeSettings : FieldOnStore.settings,
            }, () => {
                //this.initResponsiveMode();
                if (isEmpty(this.state.content)) this.initContent()
                if (!this.state.content.text) this.initContentText()
                if (isEmpty(this.state.settings)) this.initSettings()
            });
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty]
            !== prevProps.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty]) {

            const currentFieldStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty];
            this.setState({
                content :currentFieldStore.content,
                settings : currentFieldStore.settings,
                storeContent : currentFieldStore.content,
                storeSettings : currentFieldStore.settings,
            });


        }

        if(this.props.triggerOpening != prevProps.triggerOpening){
            this.props.toggleWithTrigger(this.props.triggerOpening);
        }

    }

    initField = () => {
        this.props.dispatch(initField(this.props.nameProperty, this.props.indexComponent, this.props.indexSection));
    }

    initContentText = () => {
        this.setState(prevState => ({
            content: {
                ...prevState.content,
                text: {}
            }
        }));
    }
    initContent = () => {
        const initValue = this.props.defaultContent;
        this.setState({
            content: initValue
        }, () => {
            this.props.dispatch(updateField(this.props.nameProperty, this.state.content, this.state.settings, this.props.indexComponent, this.props.indexSection));
        });
    }
    initSettings = () => {
        let initValue = this.props.defaultSettings;

        new Promise( (resolve, reject) => {

            this.props.responsiveSettings.map((mode) => {
                let selectedTheme = this.getThemeValue(this.props.themes, initValue.font[mode].theme);
                if(selectedTheme){
                    initValue.font[mode].family = selectedTheme.family;
                    initValue.font[mode].typeface = selectedTheme.typeface;
                    initValue.font[mode].weight = selectedTheme.weight;
                    initValue.font[mode].size = selectedTheme.fontsize[mode];
                    initValue.font[mode].lineHeight = selectedTheme.lineheight[mode];
                }
            })
            resolve();
        }).then(() => {
            this.setState({
                settings: initValue
            }, () => {
                this.props.dispatch(updateField(this.props.nameProperty, this.state.content, this.state.settings, this.props.indexComponent, this.props.indexSection));
            });
        })
    }

    initFontsWithTheme = async (font) => {
        this.props.responsiveSettings.map((mode) => {
            let selectedTheme = this.getThemeValue(this.props.themes, font[mode].theme);

            font[mode].family = selectedTheme.family;
            font[mode].typeface = selectedTheme.typeface;
            font[mode].weight = selectedTheme.weight;
            font[mode].size = selectedTheme.fontsize[mode];
            font[mode].lineHeight = selectedTheme.lineheight[mode];
        })
        return font;
    }


    getThemeValue = (themes, selectedTheme) => {
        if (!themes || !selectedTheme) return
        return themes.find(theme => theme.name === selectedTheme);
    }

    updateTranlatedContent = (value, targetProperty) => {
        this.setState(prevState => ({
            content: {
                ...prevState.content,
                [targetProperty]: {
                    ...prevState.content[targetProperty],
                    [this.props.indexLanguage]: value
                }
            }
        }));
    }

    updateSettings = (targetProperty, value) => {
        this.setState(prevState => ({
            settings: update(prevState.settings, {
                [targetProperty]: {
                    [this.props.currentResponsiveMode]: {$set: value}
                }
            })
        }));

    }

    updateSettingsNoResponsive = (targetProperty, value) => {
        this.setState(prevState => ({
            settings: update(prevState.settings, {
                [targetProperty]: {$set: value}
            })
        }));

    }



    toggleOpenView = () => this.setState(prevState => ({openColorView: !prevState.openColorView}));
    toggleOpenPreview = () => this.setState(prevState => ({openPreview: !prevState.openPreview}));

   /* toggleContent = () => this.setState(prevState => ({
        openContent: !prevState.openContent,
        openSettings: false,
        currentResponsiveMode: this.props.responsiveContent[0]
    }));
    toggleSettings = () => this.setState(prevState => ({
        openSettings: !prevState.openSettings,
        openContent: false,
        currentResponsiveMode: this.props.responsiveSettings[0]
    }));*/

    /*toggleResponsiveMode = (mode) => this.setState({
        currentResponsiveMode: mode
    });*/

    getText = () => this.state.content.text && this.state.content.text[this.props.indexLanguage] ? this.state.content.text[this.props.indexLanguage] : '';

    isUpdated = () => (!isEqual(this.state.content, this.state.storeContent) || !isEqual(this.state.settings, this.state.storeSettings))

    cancelStateValue = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            content:prevState.storeContent,
            settings: prevState.storeSettings
        }));
    }

    getCurrentSettingsProperty = (property) => this.state.settings[property] ? this.state.settings[property][this.props.currentResponsiveMode] : null

    getCurrentSettingsPropertyNoResponsive = (property) => this.state.settings[property]

    getCurrentDefaultSettingsProperty = (property) => this.props.defaultSettings[property][this.props.currentResponsiveMode]

    getCurrentDefaultSettingsPropertyNoResponsive = (property) => this.props.defaultSettings[property]


    getCurrentStoreSettingsProperty = (property) => {
        if (!this.state.storeSettings[property]) return null;
        return this.state.storeSettings[property][this.props.currentResponsiveMode]
    }

    getCurrentStoreSettingsPropertyNoResponsive = (property) => {
        if (!this.state.storeSettings[property]) return null;
        return this.state.storeSettings[property]
    }

    //getResponsiveChoices = () => (this.state.openContent ? this.props.responsiveContent : (this.state.openSettings ? this.props.responsiveSettings : []))


    render() {
        const {dispatch, name, nameProperty, indexComponent, indexSection} = this.props;

        if (!this.state.settings) return null
        return (
            <div>
                <Banner>
                    <div>
                        <ActiveCheckBox
                            active={this.state.active}
                            action={() => {
                                this.setState({active: !this.state.active}, () => {
                                    dispatch(toggleFieldActive(nameProperty, this.state.active, indexComponent, indexSection))
                                });
                            }}>
                        </ActiveCheckBox>
                        <p>{name}</p>
                        <p>{this.props.secretToLife}</p>

                    </div>
                    <div>
                        <LanguageToggle
                            hidden={(!this.props.openContent && !this.props.openSettings) || this.props.openSettings}/>
                        <ResponsiveToggle responsive={this.props.getResponsiveChoices()}
                                          currentMode={this.props.currentResponsiveMode}
                                          action={this.props.toggleResponsiveMode}/>
                        <Icon className={this.props.openContent ? 'active' : ''}
                              onClick={() => {
                                  this.props.toggleContent();
                              }}><SvgContent/></Icon>
                        <Icon className={this.props.openSettings ? 'active' : ''}
                              onClick={() => {
                                  this.props.toggleSettings();
                              }}><SvgSetting/></Icon>
                    </div>
                </Banner>
                <Field>
                    <Content className={!this.props.openContent ? 'hidden' : ''}>
                        <InputText action={this.updateTranlatedContent} targetProperty={'text'}
                                   defaultValue={this.getText()}/>
                    </Content>
                    <Settings className={!this.props.openSettings ? 'hidden' : ''}>
                        <Choices>
                            <Column className={this.state.openPreview ? 'full-width' : ''}>
                                <TextPreview hidden={this.state.openColorView}
                                             color={this.getCurrentSettingsProperty('color')}
                                             font={this.getCurrentSettingsProperty('font')}
                                             text={this.getCurrentSettingsProperty('text')}
                                             opacity={this.getCurrentSettingsProperty('opacity')}
                                             open={this.state.openPreview}
                                             toggleOpenPreview={this.toggleOpenPreview}
                                />
                                <ColorPicker hidden={this.state.openPreview}
                                             color={this.getCurrentSettingsProperty('color')}
                                             opacity={this.getCurrentSettingsProperty('opacity')}
                                             storeValueColor={this.getCurrentStoreSettingsProperty('color')}
                                             storeValueOpacity={this.getCurrentStoreSettingsProperty('opacity')}
                                             defaultColor={this.getCurrentDefaultSettingsProperty('color')}
                                             defaultOpacity={this.getCurrentDefaultSettingsProperty('opacity')}
                                             openView={this.state.openColorView}
                                             updateStateProps={this.updateSettings}
                                             toggleOpenView={this.toggleOpenView}
                                />
                                <Seo hidden={this.state.openPreview || this.state.openColorView}
                                     seo={this.getCurrentSettingsPropertyNoResponsive('seo')}
                                     defaultSeo={this.getCurrentDefaultSettingsPropertyNoResponsive('seo')}
                                     storeValueSeo={this.getCurrentStoreSettingsPropertyNoResponsive('seo')}
                                     updateStateProps={this.updateSettingsNoResponsive}
                                />
                            </Column>
                            <Column className={this.state.openPreview || this.state.openColorView ? 'hidden' : ''}>
                                <Typography font={this.getCurrentSettingsProperty('font')}
                                            text={this.getCurrentSettingsProperty('text')}
                                            defaultFont={this.getCurrentDefaultSettingsProperty('font')}
                                            defaultText={this.getCurrentDefaultSettingsProperty('text')}
                                            storeValueFont={this.getCurrentStoreSettingsProperty('font')}
                                            storeValueText={this.getCurrentStoreSettingsProperty('text')}
                                            updateStateProps={this.updateSettings}
                                            currentMode={this.props.currentResponsiveMode}
                                />
                            </Column>
                        </Choices>
                    </Settings>
                </Field>
                <ChoiceItemsConfirm className={!this.isUpdated() ? 'hidden' : ''}>
                    <ButtonBasic label={'Cancel'} disabled={!this.isUpdated()} action={this.cancelStateValue}/>
                    <ButtonValidate label={'Update'} disabled={!this.isUpdated()} action={() => {
                        dispatch(updateField(nameProperty, this.state.content, this.state.settings, indexComponent, indexSection));
                    }}/>
                </ChoiceItemsConfirm>
            </div>
        );
    }
}

Text.propTypes = {
    indexSection: PropTypes.number.isRequired,
    indexComponent: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    nameProperty: PropTypes.string.isRequired,
    typeField: PropTypes.string.isRequired,
    language: PropTypes.number,
    responsiveContent: PropTypes.array,
    responsiveSettings: PropTypes.array,
    defaultSettings: PropTypes.object
};
const mapStateToProps = state => ({
    dom: getCurrentDOM(state),
    indexLanguage: getCurrentLanguage(state).language,
    themes: getCurrentStyle(state).style.themes
});

const WrappedComponent = HocField(connect(mapStateToProps)(Text))
export default WrappedComponent;

//export default connect(mapStateToProps)(Text);
