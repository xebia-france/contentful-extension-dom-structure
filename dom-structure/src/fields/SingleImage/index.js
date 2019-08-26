import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import update from "react-addons-update";
import isEqual from 'lodash/isEqual'
import isEmpty from "lodash/isEmpty"
import {
    getCurrentDOM,
    getCurrentExtension,
    getCurrentLanguage,
    initField,
    toggleFieldActive,
    updateField
} from '../../actions';

import SvgSetting from '../../components/svg/SvgSetting';
import SvgContent from '../../components/svg/SvgContent';
import ButtonBasic from '../../components/ui/ButtonBasic';
import ButtonValidate from '../../components/ui/ButtonValidate';
import ResponsiveToggle from "../../components/ResponsiveToggle";
import LanguageToggle from '../../containers/LanguageToggle';
import ActiveCheckBox from '../../components/ActiveCheckBox';
import AssetPreview from '../../components/AssetPreview';

import ImageUploader from '../../interfaces/ImageUploader';
import Padding from '../../interfaces/Padding';
import Size from '../../interfaces/Size';

import {Icon} from '../../style/styledComponents';
import {Banner, Field} from '../../style/styledComponentsFields';
import {ChoiceItemsConfirm, Content, Settings, Choices, Column} from './styled';


class SingleImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openSettings: false,
            openContent: false
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
                this.initResponsiveMode();
                if (!this.state.content.image) this.initContentImage()
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
    }


    initField = () => {
        this.props.dispatch(initField(this.props.nameProperty, this.props.indexComponent, this.props.indexSection));
    }


    initContentImage = () => {
        let assetStructure = {};

        this.props.responsiveContent.length ? this.props.responsiveContent.map((mode) => {
            assetStructure[mode] = {};
        }) : {};

        let image = {
            alt: {},
            asset: assetStructure
        };

        this.setState(prevState => ({
            content: {
                ...prevState.content,
                image: image
            }
        }));
    }

    initSettings = () => {
        const initValue = this.props.defaultSettings;
        this.setState({
            settings: initValue
        }, () => {
            this.props.dispatch(updateField(this.props.nameProperty, this.state.content, this.state.settings, this.props.indexComponent, this.props.indexSection));
        });
    }

    initResponsiveMode = () => {
        const mode = this.props.responsiveContent[0] || this.props.responsiveSettings[0] || null;
        this.setState({currentResponsiveMode: mode})
    }

    updateTranlatedContent = (value, targetProperty) => {
        this.setState(prevState => ({
            content: update(prevState.content, {
                [targetProperty]: {
                    [this.props.indexLanguage]: value
                }
            })
        }));
    }

    updateTranlatedContentImage = (value, targetProperty) => {
        this.setState(prevState => ({
            content: update(prevState.content, {
                image: {
                    [targetProperty]: {
                        [this.props.indexLanguage]: {$set: value}
                    }
                }
            })
        }));
    }

    updateAsset = (value) => {
        this.setState(prevState => ({
            content: update(prevState.content, {
                image: {
                    asset: {
                        [prevState.currentResponsiveMode]: {$set: value}
                    }
                }
            })
        }));
    }

    updateSettings = (targetProperty, value) => {
        this.setState(prevState => ({
            settings: update(prevState.settings, {
                [targetProperty]: {
                    [prevState.currentResponsiveMode]: {$set: value}

                }
            })
        }));

    }


    toggleContent = () => this.setState(prevState => ({
        openContent: !prevState.openContent,
        openSettings: false,
        currentResponsiveMode: this.props.responsiveContent[0]
    }));

    toggleSettings = () => this.setState(prevState => ({
        openSettings: !prevState.openSettings,
        openContent: false,
        currentResponsiveMode: this.props.responsiveSettings[0]
    }));

    toggleResponsiveMode = (mode) => this.setState({
        currentResponsiveMode: mode
    });

    getAlt = () => this.state.content.image && this.state.content.image.alt && this.state.content.image.alt[this.props.indexLanguage] ? this.state.content.image.alt[this.props.indexLanguage] : '';

    getAsset = () => this.state.content.image && this.state.content.image.asset ? this.state.content.image.asset[this.state.currentResponsiveMode] : null

    getAssetToPreview = () => {
        if(!this.state.content.image || !this.state.content.image.asset) return null
        if(this.props.responsiveContent.includes(this.state.currentResponsiveMode)){
            return this.state.content.image.asset[this.state.currentResponsiveMode]
        }else{
            return this.state.content.image.asset[this.props.responsiveContent[0]]
        }
    }

    isUpdated = () => (this.state.content != this.state.storeContent || this.state.settings != this.state.storeSettings)

    cancelStateValue = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            content:prevState.storeContent,
            settings: prevState.storeSettings
        }));
    }

    getCurrentSettingsProperty = (property) => this.state.settings[property] ? this.state.settings[property][this.state.currentResponsiveMode] : null

    getCurrentDefaultSettingsProperty = (property) => this.props.defaultSettings[property][this.state.currentResponsiveMode]

    getCurrentStoreSettingsProperty = (property) => {
        if (!this.state.storeSettings[property]) return null;
        return this.state.storeSettings[property][this.state.currentResponsiveMode]
    }

    getResponsiveChoices = () => (this.state.openContent ? this.props.responsiveContent : (this.state.openSettings ? this.props.responsiveSettings : []))

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
                        <ImageUploader asset={this.getAsset()}
                                       alt={this.getAlt()}
                                       index={null}
                                       updateStateAsset={this.updateAsset}
                                       updateStateTranslatedProps={this.updateTranlatedContentImage}
                        />
                    </Content>
                    <Settings className={!this.state.openSettings ? 'hidden' : ''}>
                        <Choices>
                            <AssetPreview
                                locale={this.props.extensionInfo.extension.locales.default}
                                asset={this.getAssetToPreview()}
                            />
                            <Column>
                                <Size size={this.getCurrentSettingsProperty('size')}
                                      storeValueSize={this.getCurrentStoreSettingsProperty('size')}
                                      defaultSize={this.getCurrentDefaultSettingsProperty('size')}
                                      updateStateProps={this.updateSettings}
                                />
                                <Padding padding={this.getCurrentSettingsProperty('padding')}
                                         storeValuePadding={this.getCurrentStoreSettingsProperty('padding')}
                                         defaultPadding={this.getCurrentDefaultSettingsProperty('padding')}
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

SingleImage.propTypes = {
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
    extensionInfo: getCurrentExtension(state),
    indexLanguage: getCurrentLanguage(state).language
});

export default connect(mapStateToProps)(SingleImage);