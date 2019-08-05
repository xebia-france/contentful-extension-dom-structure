import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateContentValue, getCurrentDOM, getCurrentLanguage} from '../../../actions/index';
import _ from 'lodash'

import {ChoiceItemsConfirm, FieldsTemplate, Choices} from './styled';
import {Icon} from '../../../style/styledComponents';
import {Banner, Fields, ActiveCheckBox, Property} from '../../../style/styledComponentsBoxes';
import SvgToggle from '../../../components/svg/SvgToggle';
import SvgCheck from '../../../components/svg/SvgCheck';
import CategoryMultipleImage from '../../reusable/CategoryMultipleImage';
import ButtonValidate from '../../../components/ui/ButtonValidate';


class HeaderImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            value: {},
            active: true
        };
    }

    componentDidMount = () => {
        const componentStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent];

        this.setState({
            value: componentStore.content.HeaderImages ? componentStore.content.HeaderImages.value : {},
            active: componentStore.content.HeaderImages ? componentStore.content.HeaderImages.active : true,
            open: this.props.open
        });
    };


    updateStateTranslatedProps = (props, value, index) => {
        const indexLanguage = this.props.currentLanguage.language;
        this.setState({
            value: {
                ...this.state.value,
                [index]: {
                    ...this.state.value[index],
                    [props]: {
                        ...this.state.value[index][props],
                        [indexLanguage]: value
                    }
                }
            }
        }, () => {
            console.log('TRANSLATED PROPS ON HEADERIMAGES', this.state)
        });
    }

    updateStateAsset = (value, index) => {
        this.setState({
            value: {
                ...this.state.value,
                [index]: {
                    ...this.state.value[index],
                    asset: value
                }
            }
        });
    }

    isUpdated = () => {
        const componentStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent];
        const logoContent = componentStore.content.HeaderImages;
        if (!_.isEqual(logoContent && logoContent.value, this.state.value)) return true;
        return false;
    }

    isValid = () => {
        const indexLanguage = this.props.currentLanguage.language;
        let valid = true;
        Object.keys(this.state.value).forEach(key => {
            const currentAlt = this.state.value[key].alt;
            if (!currentAlt || !currentAlt[indexLanguage] || currentAlt[indexLanguage] === '') {
                valid = false;
            }
        });
        return valid;

    }

    render() {
        const {dispatch, dom, currentLanguage, indexComponent, indexSection, name, contentType, defaultValue} = this.props;
        const indexLanguage = currentLanguage.language;

        return (
            <div>
                <Banner>
                    <div>
                        <ActiveCheckBox
                            className={this.state.active ? 'active' : ''}
                            onClick={e => {
                                this.setState({active: !this.state.active}, () => {
                                    dispatch(updateContentValue(name, this.state.value, this.state.active, indexComponent, indexSection));
                                });
                            }}>
                            <SvgCheck/>
                        </ActiveCheckBox>
                        <p>{name}</p>
                    </div>
                    <Icon className={this.state.open ? '' : 'rotate'}
                          onClick={() => {
                              this.setState({open: !this.state.open});
                          }}><SvgToggle/></Icon>
                </Banner>
                <FieldsTemplate className={this.state.open ? 'open' : ''}>
                    <Choices>
                        <CategoryMultipleImage
                            numberImages={defaultValue.numberImages || 2}
                            indexLanguage={indexLanguage}
                            value={this.state.value}
                            updateStateAsset={this.updateStateAsset}
                            updateStateTranslatedProps={this.updateStateTranslatedProps}
                        />
                    </Choices>
                </FieldsTemplate>
                <ChoiceItemsConfirm className={!this.isUpdated() || !this.isValid() ? 'hidden' : ''}>
                    <ButtonValidate label={'Update'} disabled={!this.isUpdated()} action={() => {
                        dispatch(updateContentValue(contentType, this.state.value, this.state.active, indexComponent, indexSection));
                    }}/>
                </ChoiceItemsConfirm>
            </div>
        );
    }
}

HeaderImages.propTypes = {
    indexSection: PropTypes.number.isRequired,
    indexComponent: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    language: PropTypes.number
};
const mapStateToProps = state => ({
    dom: getCurrentDOM(state),
    currentLanguage: getCurrentLanguage(state)
});

export default connect(mapStateToProps)(HeaderImages);