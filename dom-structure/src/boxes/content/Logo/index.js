import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {updateContentValue, getCurrentDOM, getCurrentLanguage, updateSettingsValue} from '../../../actions/index';

import { ChoiceItemsConfirm } from './styled';
import { Icon, ButtonBasic, ButtonGreen } from '../../../style/styledComponents';
import { Banner, Fields, ActiveCheckBox } from '../../../style/styledComponentsBoxes';
import SvgToggle from '../../../components/svg/SvgToggle';
import SvgCheck from '../../../components/svg/SvgCheck';
import ImageUploader from '../../../components/ImageUploader/index';

class Logo extends Component {
    constructor (props) {
        super(props);

        this.state = {
            open: true,
            value: {},
            active: true
        };

        this.updateStateAsset = this.updateStateAsset.bind(this);
    }

    componentDidMount = () => {
        const componentStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent];

        this.setState({
            value: componentStore.content.Logo ? componentStore.content.Logo.value : {},
            active: componentStore.content.Logo ? componentStore.content.Logo.active : true,
            open: this.props.open
        });

        console.log('language on Logo', this.props.currentLanguage);
    };

    updateStateAsset = (value) => {
        this.setState({
            value: {
                ...this.state.value,
                asset: value
            }
        }, () => {
            console.log('STATE AFTER UPDATE :', this.state)
        });
    }

    render () {
        const { dispatch, dom, currentLanguage, indexComponent, indexSection, name } = this.props;
        const indexLanguage = currentLanguage.language;
        const componentStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent];
        const logoContent =  componentStore.content.Logo;

        return (
            <div>
                <Banner>
                    <div>
                        <ActiveCheckBox
                            className={this.state.active ? 'active' : ''}
                            onClick={e => {
                                this.setState({ active: !this.state.active }, () => {
                                    dispatch(updateContentValue(name, this.state.value, this.state.active, indexComponent, indexSection));
                                });
                            }}>
                            <SvgCheck/>
                        </ActiveCheckBox>
                        <p>{name}</p>
                    </div>
                    <Icon className={this.state.open ? '' : 'rotate'}
                          onClick={() => {
                              this.setState({ open: !this.state.open });
                          }}><SvgToggle/></Icon>
                </Banner>
                <Fields className={this.state.open ? 'open' : ''}>
                   <ImageUploader currentAsset={ logoContent && logoContent.value ? logoContent.value : null} updateStateAsset={this.updateStateAsset} />
                </Fields>
                <ChoiceItemsConfirm>
                    <ButtonBasic
                        className={'disable'}
                        onClick={e => {
                            e.preventDefault();
                            console.log('Cancel Logo');
                        }}>
                        Cancel
                    </ButtonBasic>
                    <ButtonGreen
                        disabled={false}
                        className={'active'}
                        onClick={() => {
                            console.log('Validate Logo');
                            dispatch(updateContentValue(name, this.state.value, this.state.active, indexComponent, indexSection));
                        }}>
                        Update
                    </ButtonGreen>
                </ChoiceItemsConfirm>
            </div>
        );
    }
}

Logo.propTypes = {
    indexSection: PropTypes.number.isRequired,
    indexComponent: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    language: PropTypes.number
};
const mapStateToProps = state => ({
    dom: getCurrentDOM(state),
    currentLanguage: getCurrentLanguage(state)
});

export default connect(mapStateToProps)(Logo);
