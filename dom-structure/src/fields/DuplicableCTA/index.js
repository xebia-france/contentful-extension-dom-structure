import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrentStyle} from '../../actions';

import FieldWrapper from '../../HOC/FieldWrapper';
import FieldWrapperOfSection from '../../HOC/FieldWrapperOfSection';
import {duplicateField} from '../../actions/dom';

import SvgDuplicate from '../../components/svg/SvgDuplicate';
import TextPreview from '../../components/TextPreview';
import IconPreview from '../../components/IconPreview';

import InputText from '../../interfaces/InputText';
import InputIcon from '../../interfaces/InputIcon';
import Typography from '../../interfaces/Typography';
import ColorPicker from '../../interfaces/ColorPicker';
import Margin from '../../interfaces/Margin';
import Padding from '../../interfaces/Padding';
import Size from '../../interfaces/Size';
import Radius from '../../interfaces/Radius';
import BorderWidth from '../../interfaces/BorderWidth';
import Alignment from '../../interfaces/Alignment';
import IconTypography from '../../interfaces/IconTypography';
import Shadow from '../../interfaces/Shadow';

import {Icon} from '../../style/styledComponents';
import {Field} from '../../style/styledComponentsFields';
import {
    Content,
    Settings,
    ChoicesTypography,
    Column,
    LinkSettings,
    Row,
    ChoicesContent,
    ChoicesCustom,
    ButtonEvents, CheckboxAnimation
} from './styled';
import FieldBanner from "../../components/FieldBanner";

import {getText, getLink, getIcon} from "../../utils/Fields/getters";
import FieldUpdateForm from "../../components/FieldUpdateForm";

class DuplicableCTA extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openColorView: false,
            openColorViewBackground: false,
            openColorViewBorder: false,
            openColorViewIcon: false,
            openPreview: false,
            openPreviewIcon: false,
            events: ['basic', 'hover', 'disabled'],
            currentEvent: 'basic'
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.settings && this.props.getSettingsByProperty('typography', 'font')) {
            if (!Object.values(this.props.settings.typography)[0].font.family && this.props.themes) {
                this.props.initFont('typography');
            }
        }
    }

    getThemeValue = (themes, selectedTheme) => {
        if (!themes || !selectedTheme) return;
        return themes.find(theme => theme.name === selectedTheme);
    }

    toggleOpenView = () => this.setState(prevState => ({openColorView: !prevState.openColorView}));
    toggleOpenViewBackground = () => this.setState(prevState => ({openColorViewBackground: !prevState.openColorViewBackground}));
    toggleOpenViewBorder = () => this.setState(prevState => ({openColorViewBorder: !prevState.openColorViewBorder}));
    toggleOpenViewIcon = () => this.setState(prevState => ({openColorViewIcon: !prevState.openColorViewIcon}));
    toggleOpenPreview = () => this.setState(prevState => ({openPreview: !prevState.openPreview}));
    toggleOpenPreviewIcon = () => this.setState(prevState => ({openPreviewIcon: !prevState.openPreviewIcon}));
    toggleCurrentEvent = (event) => this.setState({currentEvent: event});

    getExternal = () => this.props.getSettingsPropertyNoResponsive('state') ? this.props.getSettingsPropertyNoResponsive('state').external : false;
    getDisabled = () => this.props.getSettingsPropertyNoResponsive('state') ? this.props.getSettingsPropertyNoResponsive('state').disabled : false;
    getAnimation = () => this.props.getSettingsPropertyNoResponsive('state') ? this.props.getSettingsPropertyNoResponsive('state').animation : '';

    updateTypography = (property, value, event) => this.props.updateSettingsProperty('typography', property, value, event);
    updateTypographyColor = (property, value, event) => this.props.updateSettingsEachResponsiveMode('typography', property, value, event);

    updateBasis = (property, value, event) => this.props.updateSettingsProperty('basis', property, value, event);
    updateBasisColor = (property, value, event) => this.props.updateSettingsEachResponsiveMode('basis', property, value, event);

    updateBorder = (property, value, event) => this.props.updateSettingsProperty('border', property, value, event);
    updateBorderColor = (property, value, event) => this.props.updateSettingsEachResponsiveMode('border', property, value, event);

    updateIcon = (property, value, event) => this.props.updateSettingsProperty('icon', property, value, event);
    updateIconColor = (property, value, event) => this.props.updateSettingsEachResponsiveMode('icon', property, value, event);

    duplicateField = () => {
        this.props.dispatch(duplicateField('DupCTA', {}, this.props.indexComponent, this.props.indexSection))
    }

    render() {
        const {content, indexLanguage, updated} = this.props;

        if (!this.props.settings) return null;
        return (
            <div>
                <FieldBanner {...this.props}>
                    <Icon className={''} onClick={() => {
                        this.duplicateField();
                    }}><SvgDuplicate/></Icon>
                </FieldBanner>
                <Field>
                    {
                        this.props.openContent &&
                        <Content>
                            <ChoicesContent>
                                <Column>
                                    <label>Label</label>
                                    <InputText action={this.props.updateTranlatedContent} targetProperty={'text'}
                                               defaultValue={getText(content, indexLanguage)}/>
                                </Column>
                                <Column>
                                    <LinkSettings>
                                        <label>Link</label>
                                        <div>
                                            <label>
                                                <input type={'checkbox'} defaultChecked={this.getExternal()}
                                                       onChange={(e) => {
                                                           this.props.updateSettingsNoResponsive('state', !this.getExternal(), 'external')
                                                       }}/>
                                                external</label>
                                            <label>
                                                <input type={'checkbox'} defaultChecked={this.getDisabled()}
                                                       onChange={(e) => {
                                                           this.props.updateSettingsNoResponsive('state', !this.getDisabled(), 'disabled')
                                                       }}/>
                                                disabled</label>
                                        </div>

                                    </LinkSettings>

                                    <InputText action={this.props.updateTranlatedContent} targetProperty={'link'}
                                               defaultValue={getLink(content, indexLanguage)}/>
                                </Column>
                                <Column>
                                    <label>Icon</label>
                                    <InputIcon
                                        font={this.props.settings['icon'] ? this.props.settings['icon'][this.props.responsiveSettings[0]]['font'] : null /*this.props.getSettingsByProperty('icon', 'font')*/}
                                        action={this.props.updateTranlatedContent}
                                        targetProperty={'icon'}
                                        defaultValue={getIcon(content, indexLanguage)}/>
                                </Column>
                            </ChoicesContent>
                        </Content>
                    }
                    {
                        this.props.openSettings &&
                        <Settings>
                            {
                                this.state.events && this.state.events.length !== 0 ?
                                    <ButtonEvents>
                                        {
                                            this.state.events.map((event, i) => {
                                                return <button
                                                    key={i}
                                                    className={event === this.state.currentEvent ? 'current' : ''}
                                                    onClick={() => {
                                                        this.toggleCurrentEvent(event)
                                                    }}>{event}</button>
                                            })
                                        }
                                    </ButtonEvents> : null

                            }
                            <ChoicesTypography>

                                <Column
                                    className={this.state.openPreview || this.state.openColorView ? 'full-width' : ''}>

                                    <TextPreview hidden={this.state.openColorView}
                                                 color={this.props.getSettingsByProperty('typography', 'color', this.state.currentEvent)}
                                                 font={this.props.getSettingsByProperty('typography', 'font')}
                                                 text={this.props.getSettingsByProperty('typography', 'text')}
                                                 opacity={this.props.getSettingsByProperty('typography', 'opacity', this.state.currentEvent)}
                                                 open={this.state.openPreview}
                                                 toggleOpenPreview={this.toggleOpenPreview}
                                    />
                                    <ColorPicker hidden={this.state.openPreview}
                                                 color={this.props.getSettingsByProperty('typography', 'color', this.state.currentEvent)}
                                                 opacity={this.props.getSettingsByProperty('typography', 'opacity', this.state.currentEvent)}
                                                 storeValueColor={this.props.getStoreSettingsByProperty('typography', 'color', this.state.currentEvent)}
                                                 storeValueOpacity={this.props.getStoreSettingsByProperty('typography', 'opacity', this.state.currentEvent)}
                                                 defaultColor={this.props.getDefaultSettingsByProperty('typography', 'color', this.state.currentEvent)}
                                                 defaultOpacity={this.props.getDefaultSettingsByProperty('typography', 'opacity', this.state.currentEvent)}
                                                 openView={this.state.openColorView}
                                                 updateStateProps={this.updateTypographyColor}
                                                 toggleOpenView={this.toggleOpenView}
                                                 event={this.state.currentEvent}
                                    />
                                    <caption>Color for all devices</caption>
                                    {
                                        this.getAnimation() !== null ?
                                            <CheckboxAnimation>
                                                <input type={'checkbox'}
                                                       defaultChecked={this.getAnimation() === 'underline'}
                                                       onChange={(e) => {
                                                           this.props.updateSettingsNoResponsive('state', this.getAnimation() === 'underline' ? '' : 'underline', 'animation')
                                                       }}/>
                                                <label>animate underline</label>
                                            </CheckboxAnimation> : null
                                    }

                                </Column>
                                <Column className={this.state.openPreview || this.state.openColorView ? 'hidden' : ''}>
                                    <Typography font={this.props.getSettingsByProperty('typography', 'font')}
                                                text={this.props.getSettingsByProperty('typography', 'text')}
                                                defaultFont={this.props.getDefaultSettingsByProperty('typography', 'font')}
                                                defaultText={this.props.getDefaultSettingsByProperty('typography', 'text')}
                                                storeValueFont={this.props.getStoreSettingsByProperty('typography', 'font')}
                                                storeValueText={this.props.getStoreSettingsByProperty('typography', 'text')}
                                                updateStateProps={this.updateTypography}
                                                currentMode={this.props.currentResponsiveMode}
                                    />
                                </Column>
                            </ChoicesTypography>

                            <ChoicesCustom>
                                <Column className={this.state.openColorViewBackground ? 'full-width' : ''}>
                                    <Row>
                                        <ColorPicker hidden={false}
                                                     color={this.props.getSettingsByProperty('basis', 'color', this.state.currentEvent)}
                                                     opacity={this.props.getSettingsByProperty('basis', 'opacity', this.state.currentEvent)}
                                                     storeValueColor={this.props.getStoreSettingsByProperty('basis', 'color', this.state.currentEvent)}
                                                     storeValueOpacity={this.props.getStoreSettingsByProperty('basis', 'opacity', this.state.currentEvent)}
                                                     defaultColor={this.props.getDefaultSettingsByProperty('basis', 'color', this.state.currentEvent)}
                                                     defaultOpacity={this.props.getDefaultSettingsByProperty('basis', 'opacity', this.state.currentEvent)}
                                                     openView={this.state.openColorViewBackground}
                                                     updateStateProps={this.updateBasisColor}
                                                     toggleOpenView={this.toggleOpenViewBackground}
                                                     customName={'Backg.'}
                                                     event={this.state.currentEvent}
                                        />
                                        <caption>Color for all devices</caption>
                                    </Row>
                                </Column>
                                <Column className={this.state.openColorViewBackground ? 'hidden' : ''}>
                                    <Row>
                                        <Size size={this.props.getSettingsByProperty('basis', 'size')}
                                              storeValueSize={this.props.getStoreSettingsByProperty('basis', 'size')}
                                              defaultSize={this.props.getDefaultSettingsByProperty('basis', 'size')}
                                              updateStateProps={this.updateBasis}
                                        />
                                    </Row>
                                    <Row>
                                        <Padding padding={this.props.getSettingsByProperty('basis', 'padding')}
                                                 storeValuePadding={this.props.getStoreSettingsByProperty('basis', 'padding')}
                                                 defaultPadding={this.props.getDefaultSettingsByProperty('basis', 'padding')}
                                                 updateStateProps={this.updateBasis}
                                        />
                                        <Margin margin={this.props.getSettingsByProperty('basis', 'margin')}
                                                storeValueMargin={this.props.getStoreSettingsByProperty('basis', 'margin')}
                                                defaultMargin={this.props.getDefaultSettingsByProperty('basis', 'margin')}
                                                updateStateProps={this.updateBasis}
                                        />
                                    </Row>
                                    <Row>
                                        <Alignment alignment={this.props.getSettingsByProperty('basis', 'alignment')}
                                                   storeValueAlignment={this.props.getStoreSettingsByProperty('basis', 'alignment')}
                                                   defaultAlignment={this.props.getDefaultSettingsByProperty('basis', 'alignment')}
                                                   updateStateProps={this.updateBasis}/>

                                    </Row>
                                    <Row>
                                        <Shadow shadow={this.props.getSettingsByProperty('basis', 'shadow')}
                                                storeValueShadow={this.props.getStoreSettingsByProperty('basis', 'shadow')}
                                                defaultShadow={this.props.getDefaultSettingsByProperty('basis', 'shadow')}
                                                updateStateProps={this.updateBasis}/>

                                    </Row>
                                </Column>
                                <Column className={this.state.openColorViewBorder ? 'full-width' : ''}>
                                    <ColorPicker hidden={false}
                                                 color={this.props.getSettingsByProperty('border', 'color', this.state.currentEvent)}
                                                 opacity={this.props.getSettingsByProperty('border', 'opacity', this.state.currentEvent)}
                                                 storeValueColor={this.props.getStoreSettingsByProperty('border', 'color', this.state.currentEvent)}
                                                 storeValueOpacity={this.props.getStoreSettingsByProperty('border', 'opacity', this.state.currentEvent)}
                                                 defaultColor={this.props.getDefaultSettingsByProperty('border', 'color', this.state.currentEvent)}
                                                 defaultOpacity={this.props.getDefaultSettingsByProperty('border', 'opacity', this.state.currentEvent)}
                                                 openView={this.state.openColorViewBorder}
                                                 updateStateProps={this.updateBorderColor}
                                                 toggleOpenView={this.toggleOpenViewBorder}
                                                 customName={'Border'}
                                                 event={this.state.currentEvent}
                                    />
                                    <caption>Color for all devices</caption>
                                </Column>
                                <Column className={this.state.openColorViewBorder ? 'hidden' : ''}>
                                    <Radius radius={this.props.getSettingsByProperty('border', 'radius')}
                                            storeValueRadius={this.props.getStoreSettingsByProperty('border', 'radius')}
                                            defaultRadius={this.props.getDefaultSettingsByProperty('border', 'radius')}
                                            updateStateProps={this.updateBorder}
                                    />
                                    <BorderWidth width={this.props.getSettingsByProperty('border', 'width')}
                                                 storeValueWidth={this.props.getStoreSettingsByProperty('border', 'width')}
                                                 defaultWidth={this.props.getDefaultSettingsByProperty('border', 'width')}
                                                 updateStateProps={this.updateBorder}
                                    />
                                </Column>
                                <Column
                                    className={this.state.openPreviewIcon || this.state.openColorViewIcon ? 'full-width' : ''}>
                                    <IconPreview hidden={this.state.openColorViewIcon}
                                                 color={this.props.getSettingsByProperty('icon', 'color', this.state.currentEvent)}
                                                 font={this.props.getSettingsByProperty('icon', 'font')}
                                                 text={this.props.getSettingsByProperty('icon', 'text')}
                                                 opacity={this.props.getSettingsByProperty('icon', 'opacity', this.state.currentEvent)}
                                                 open={this.state.openColorViewIcon}
                                                 toggleOpenPreview={this.toggleOpenPreviewIcon}
                                    />
                                    <ColorPicker hidden={this.state.openPreviewIcon}
                                                 color={this.props.getSettingsByProperty('icon', 'color', this.state.currentEvent)}
                                                 opacity={this.props.getSettingsByProperty('icon', 'opacity', this.state.currentEvent)}
                                                 storeValueColor={this.props.getStoreSettingsByProperty('icon', 'color', this.state.currentEvent)}
                                                 storeValueOpacity={this.props.getStoreSettingsByProperty('icon', 'opacity', this.state.currentEvent)}
                                                 defaultColor={this.props.getDefaultSettingsByProperty('icon', 'color', this.state.currentEvent)}
                                                 defaultOpacity={this.props.getDefaultSettingsByProperty('icon', 'opacity', this.state.currentEvent)}
                                                 openView={this.state.openColorViewIcon}
                                                 updateStateProps={this.updateIconColor}
                                                 toggleOpenView={this.toggleOpenViewIcon}
                                                 customName={'Icon'}
                                                 event={this.state.currentEvent}
                                    />
                                    <caption>Color for all devices</caption>
                                </Column>
                                <Column
                                    className={this.state.openPreviewIcon || this.state.openColorViewIcon ? 'hidden' : ''}>
                                    <Row>
                                        <IconTypography font={this.props.getSettingsByProperty('icon', 'font')}
                                                        defaultFont={this.props.getDefaultSettingsByProperty('icon', 'font')}
                                                        storeValueFont={this.props.getStoreSettingsByProperty('icon', 'font')}
                                                        updateStateProps={this.updateIcon}
                                                        currentMode={this.props.currentResponsiveMode}
                                        />
                                    </Row>
                                    <Row
                                        className={this.state.openPreviewIcon || this.state.openColorViewIcon ? 'hidden' : ''}>
                                        <Padding padding={this.props.getSettingsByProperty('icon', 'padding')}
                                                 storeValuePadding={this.props.getStoreSettingsByProperty('icon', 'padding')}
                                                 defaultPadding={this.props.getDefaultSettingsByProperty('icon', 'padding')}
                                                 updateStateProps={this.updateIcon}
                                        />
                                    </Row>
                                </Column>
                            </ChoicesCustom>
                        </Settings>
                    }
                </Field>
                <FieldUpdateForm updated={updated} canceling={this.props.cancelStateValue}
                                 updating={this.props.updateField}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    themes: getCurrentStyle(state).style.themes
});

const WrappedComponent = FieldWrapper(connect(mapStateToProps)(DuplicableCTA));
export default WrappedComponent;
export const DuplicableCTAForSection = FieldWrapperOfSection(DuplicableCTA);

