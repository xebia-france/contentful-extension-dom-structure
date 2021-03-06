import React, {Component} from 'react';
import {connect} from "react-redux";
import isEmpty from "lodash/isEmpty";
import {getCurrentStyle} from "../../actions";
import {getHtml} from "../../utils/Fields/getters";

import FieldWrapper from '../../HOC/FieldWrapper';
import FieldBanner from "../../components/FieldBanner";
import FieldUpdateForm from "../../components/FieldUpdateForm";

import InputMarkdown from '../../interfaces/InputMarkdown';
import Padding from '../../interfaces/Padding';
import TypeSystem from '../../interfaces/system/TypeSystem';

import {Field} from '../../style/styledComponentsFields';
import {Content, Settings, Choices, Column} from './styled';
import FieldWrapperOfSection from "../../HOC/FieldWrapperOfSection";

class TextMarkdown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.settings && this.props.getSettingsByProperty('typography', 'font')) {
            if (!Object.values(this.props.settings.typography)[0].font.family && this.props.themes) {
                this.props.initFont('typography');
            }
        }
    }

    updateBasis = (property, value) => this.props.updateSettingsProperty('basis', property, value);

    render() {
        const {updated, indexLanguage, content, currentResponsiveMode} = this.props;
        if (!this.props.settings) return null;


        return (
            <div>
                <FieldBanner {...this.props}/>
                <Field>
                    {
                        !isEmpty(content) && content !== {} && this.props.openContent ?
                            <Content>
                                <InputMarkdown currentLanguage={indexLanguage}
                                               action={this.props.updateTranlatedContent} targetProperty={'html'}
                                               defaultValue={getHtml(content, indexLanguage)}/>
                            </Content>
                            : null
                    }
                    {
                        this.props.openSettings &&
                        <Settings>
                            <TypeSystem label={null}
                                        propertyName={'typography'}
                                        getSettingsByProperty={this.props.getSettingsByProperty}
                                        getStoreSettingsByProperty={this.props.getStoreSettingsByProperty}
                                        getDefaultSettingsByProperty={this.props.getDefaultSettingsByProperty}
                                        updateSettingsProperty={this.props.updateSettingsProperty}
                                        currentResponsiveMode={currentResponsiveMode}
                                        getSettingsPropertyNoResponsive={this.props.getSettingsPropertyNoResponsive}
                                        getDefaultSettingsPropertyNoResponsive={this.props.getDefaultSettingsPropertyNoResponsive}
                                        getStoreSettingsPropertyNoResponsive={this.props.getStoreSettingsPropertyNoResponsive}
                                        updateSettingsNoResponsive={this.props.updateSettingsNoResponsive}
                            />
                            {
                                this.props.settings.padding &&
                                <Choices>
                                    <Column/>
                                    <Column>
                                        <Padding hidden={false}
                                                 padding={this.props.getSettingsByProperty('basis', 'padding')}
                                                 storeValuePadding={this.props.getStoreSettingsByProperty('basis', 'padding')}
                                                 defaultPadding={this.props.getDefaultSettingsByProperty('basis', 'padding')}
                                                 updateStateProps={this.updateBasis}
                                        />
                                    </Column>
                                </Choices>
                            }

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
const WrappedComponent = FieldWrapper(connect(mapStateToProps)(TextMarkdown));
export default WrappedComponent;
export const TextMarkdownForSection = FieldWrapperOfSection(connect(mapStateToProps)(TextMarkdown));

