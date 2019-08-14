import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import update from "react-addons-update";
import isEmpty from "lodash/isEmpty"
import { getCurrentDOM, getCurrentLanguage,initField, toggleFieldActive, updateField} from '../../actions';

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
import {Banner, Field} from '../../style/styledComponentsBoxes';
import {ChoiceItemsConfirm, Content, Settings, Choices, Column} from './styled'



class Text extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openColorView: false,
            openPreview: false,
            openSettings: false,
            openContent: false
        }
    }

    componentDidMount() {
        const FieldOnStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty];
        if(!FieldOnStore){
            this.initField();
        }else{
            this.setState({
                content: FieldOnStore.content,
                settings: FieldOnStore.settings,
                active: FieldOnStore.active,
            }, () => {
                this.initResponsiveMode();
                if (!this.state.content.text) this.initContent()
                if (isEmpty(this.state.settings)) this.initSettings()
            });
        }


    };

    initField = () => {
        this.props.dispatch(initField(this.props.nameProperty, this.props.indexComponent, this.props.indexSection));
    }

    initContent = () => {
        this.setState(prevState => ({
            content: {
                ...prevState.content,
                text: {}
            }
        }));
    }
    initSettings = () => {
        const initValue = this.props.defaultSettings;
        this.setState({
            settings: initValue
        });
    }

    initResponsiveMode = () => {
        const mode = this.props.responsiveContent[0] || this.props.responsiveSettings[0] || null;
        this.setState({currentResponsiveMode: mode})
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
        if (this.state.currentResponsiveMode) {
            this.setState(prevState => ({
                settings: update(prevState.settings, {
                    [targetProperty]: {
                        [prevState.currentResponsiveMode]: {$set: value}

                    }
                })
            }));
        } else {
            this.setState(prevState => ({
                settings: update(prevState.settings, {
                    [targetProperty]: {$set: value}

                })
            }));
        }
    }

    toggleOpenView = () => this.setState(prevState => ({openColorView: !prevState.openColorView}));
    toggleOpenPreview = () => this.setState(prevState => ({openPreview: !prevState.openPreview}));

    toggleContent = () => this.setState(prevState => ({
        openContent: !prevState.openContent,
        openSettings: false
    }));
    toggleSettings = () => this.setState(prevState => ({
        openSettings: !prevState.openSettings,
        openContent: false
    }));

    toggleResponsiveMode = (mode) => this.setState({
        currentResponsiveMode: mode
    });

    getText = () => this.state.content.text && this.state.content.text[this.props.indexLanguage] ? this.state.content.text[this.props.indexLanguage] : '';

    isUpdated = () => {
        const FieldOnStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty];
        return (this.state.content != FieldOnStore.content || this.state.settings != FieldOnStore.settings)
    }

    cancelStateValue = (e) => {
        e.preventDefault();
        const FieldOnStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty];
        this.setState({
            content: FieldOnStore.content,
            settings: FieldOnStore.settings
        });
    }

    getCurrentSettingsProperty = (property) => this.state.currentResponsiveMode ?
        this.state.settings[property][this.state.currentResponsiveMode]
        : this.state.settings[property]


    getCurrentDefaultSettingsProperty = (property) => this.state.currentResponsiveMode ?
        this.props.defaultSettings[property][this.state.currentResponsiveMode]
        : this.props.defaultSettings[property]


    getCurrentStoreSettingsProperty = (property) => {
        const FieldOnStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent].fields[this.props.nameProperty];

        if (!FieldOnStore.settings[property]) return null;

        return (this.state.currentResponsiveMode) ?
            FieldOnStore.settings[property][this.state.currentResponsiveMode]
            : FieldOnStore.settings[property]
    }

    getResponsiveChoices = () => (this.state.openContent ? this.props.responsiveContent : (this.state.openSettings ? this.props.responsiveSettings : []))



    render() {
        const {dispatch, name, nameProperty, indexComponent, indexSection} = this.props;

        console.log('PROPS', this.props)
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
                    </div>
                    <div>
                        <LanguageToggle
                            hidden={(!this.state.openContent && !this.state.openSettings) || this.state.openSettings}/>
                        <ResponsiveToggle responsive={this.getResponsiveChoices()}
                                          currentMode={this.state.currentResponsiveMode}
                                          action={this.toggleResponsiveMode}/>
                        <Icon className={this.state.openContent ? 'active' : ''}
                              onClick={() => {
                                  this.toggleContent();
                              }}><SvgContent/></Icon>
                        <Icon className={this.state.openSettings ? 'active' : ''}
                              onClick={() => {
                                  this.toggleSettings();
                              }}><SvgSetting/></Icon>
                    </div>
                </Banner>
                <Field>
                    <Content className={!this.state.openContent ? 'hidden' : ''}>
                        <InputText action={this.updateTranlatedContent} targetProperty={'text'}
                                   defaultValue={this.getText()}/>
                    </Content>
                    <Settings className={!this.state.openSettings ? 'hidden' : ''}>
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
                                     seo={this.getCurrentSettingsProperty('seo')}
                                     defaultSeo={this.getCurrentDefaultSettingsProperty('seo')}
                                     storeValueSeo={this.getCurrentStoreSettingsProperty('seo')}
                                     updateStateProps={this.updateSettings}
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
    indexLanguage: getCurrentLanguage(state).language
});

export default connect(mapStateToProps)(Text);
