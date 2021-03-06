import React, {Component} from 'react';
import FieldWrapper from '../../HOC/FieldWrapper';
import InputIframe from '../../interfaces/InputIframe';
import {Field} from '../../style/styledComponentsFields';
import {Content, Choices, Column, Settings} from './styled';
import {getCurrentStyle} from "../../actions";
import {connect} from "react-redux";
import isEmpty from "lodash/isEmpty";
import {getHtml} from "../../utils/Fields/getters";
import FieldBanner from "../../components/FieldBanner";
import FieldUpdateForm from "../../components/FieldUpdateForm";
import Size from '../../interfaces/Size'

class Iframe extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.responsiveSettings !== prevProps.responsiveSettings) {
            this.props.setResponsiveMode(this.props.responsiveSettings[0]);
        }
    }

    updateBasis = (property, value) => this.props.updateSettingsProperty('basis', property, value);

    render() {
        const {indexLanguage, content, updated} = this.props;
        if (!this.props.settings) return null;

        return (
            <div>
                <FieldBanner {...this.props}/>
                <Field>
                    {
                        !isEmpty(this.props.content) ?
                            <Content className={!this.props.openContent ? 'hidden' : ''}>
                                <InputIframe currentLanguage={indexLanguage}
                                             action={this.props.updateTranlatedContent} targetProperty={'html'}
                                             defaultValue={getHtml(content, indexLanguage)}/>
                            </Content>
                            : null
                    }
                </Field>
                {
                    this.props.openSettings &&
                    <Settings>
                        <Choices>
                            <Column/>
                            <Column>
                                <Size size={this.props.getSettingsByProperty('basis', 'size')}
                                      storeValueSize={this.props.getStoreSettingsByProperty('basis', 'size')}
                                      defaultSize={this.props.getDefaultSettingsByProperty('basis', 'size')}
                                      updateStateProps={this.updateBasis}
                                />
                            </Column>
                        </Choices>
                    </Settings>
                }
                <FieldUpdateForm updated={updated} canceling={this.props.cancelStateValue}
                                 updating={this.props.updateField}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    themes: getCurrentStyle(state).style.themes
});
const WrappedComponent = FieldWrapper(connect(mapStateToProps)(Iframe));
export default WrappedComponent;
