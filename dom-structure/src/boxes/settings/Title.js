import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, ButtonGreen, ButtonBasic} from '../../style/styledComponents';
import {
    Banner,
    Fields,
    ActiveCheckBox,
    ChoiceConfirm
} from '../../style/styledComponentsBoxes';
import SvgArrow from '../../components/svg/SvgArrow';
import SvgCheck from '../../components/svg/SvgCheck';
import {connect} from 'react-redux';
import {updateSettingsValue, getCurrentDOM} from '../../actions';
import CategoryText from '../reusable/CategoryText/index';
import CategoryColor from '../reusable/CategoryColor/index';
import CategorySeo from '../reusable/CategorySeo/index';
import TextPreview from '../../components/TextPreview';
import {extensionTheme} from '../../style/theme';
import styled from 'styled-components';
import _ from 'lodash';

export const FieldsTemplate = styled(Fields)`
    padding :0px;
`;
export const FieldsError = styled(Fields)`
    display : block;
`;

export const Choices = styled.div`
    width : 100%;
    display : flex;
`;
export const Category = styled.div`    
    border : 1px solid ${ extensionTheme.grey20 };
    border-left : 0px 
    border-bottom : 0px 
`;
export const ChoiceItemsConfirm = styled(ChoiceConfirm)`
    padding : 10px 15px 10px 0;
    width : 100%;
    border-top : 1px solid ${ extensionTheme.grey20 };

`;
export const Column = styled.div`
    display : flex;
    flex-direction : column;
    
    &.full-width{
        width : 100%;
        
        & ${Category}{
            width : 100%;
            padding-top : 0;
        }
    }

`;

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            value: {},
            active: true,
            openView: false,
            openPreview : false
        };

        this.toggleOpenView = this.toggleOpenView.bind(this);
        this.toggleOpenPreview = this.toggleOpenPreview.bind(this);
        this.updateStateProps = this.updateStateProps.bind(this);
    }

    componentDidMount = () => {
        const componentStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent];
        const titleSettings = componentStore.settings.Title;

        this.setState({
            value: titleSettings ? titleSettings.value : this.props.defaultValue,
            active: titleSettings ? titleSettings.active : true,
            open: this.props.open
        });

    };

    updateStateProps = (props , value) => {
        this.setState({
            value: {
                ...this.state.value,
                [props]: value
            }
        }, () => {
                console.log('STATE AFTER UPDATE :', this.state)
            });
    }

    toggleOpenView = () => this.setState({openView: !this.state.openView});

    toggleOpenPreview = () => this.setState({openPreview: !this.state.openPreview});


    isUpdated = () => {
        const componentStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent];
        const titleSettings = componentStore.settings.Title;

        if ( _.isEqual(titleSettings && titleSettings.value , this.state.value) ) return false;
        return true;
    }

    render() {
        const {dispatch, dom, indexComponent, indexSection, name, defaultValue} = this.props;
        const componentStore = dom.sections[indexSection].components[indexComponent];
        const titleSettings = componentStore.settings.Title;

        return (
            <div>
                <Banner>
                    <div>
                        <ActiveCheckBox
                            className={this.state.active ? 'active' : ''}
                            onClick={e => {
                                this.setState({active: !this.state.active}, () => {
                                    dispatch(updateSettingsValue(name, this.state.value, this.state.active, indexComponent, indexSection));
                                });
                            }}>
                            <SvgCheck/>
                        </ActiveCheckBox>
                        <p>{name}</p>
                    </div>
                    <Icon className={this.state.open ? '' : 'rotate'}
                          onClick={() => {
                              this.setState({open: !this.state.open});
                          }}><SvgArrow/></Icon>
                </Banner>
                <FieldsTemplate className={this.state.open ? 'open' : ''}>
                    <Choices>
                        <Column className={this.state.openView ? 'full-width' : ''}>
                            <Category>
                                <TextPreview
                                    color={this.state.value.color}
                                    font={this.state.value.font}
                                    text={this.state.value.text}
                                    opacity={this.state.value.opacity}
                                    open={this.state.openPreview}
                                    toggleOpenPreview={this.toggleOpenPreview}
                                />
                            </Category>
                            <Category className={[ this.state.openPreview  ? 'hidden' : '']}>
                                <CategoryColor openView={this.state.openView}
                                               toggleOpenView={this.toggleOpenView}
                                               storeValueColor={titleSettings && titleSettings.value.color ? titleSettings.value.color : null }
                                               storeValueOpacity={titleSettings && titleSettings.value.opacity ? titleSettings.value.opacity : null }
                                               color={this.state.value.color}
                                               opacity={this.state.value.opacity}
                                               defaultColor={defaultValue.color}
                                               defaultOpacity={defaultValue.opacity}
                                               updateStateProps={this.updateStateProps}
                                />
                            </Category>

                            <Category className={[ this.state.openView || this.state.openPreview ? 'hidden' : '']}>
                                <CategorySeo
                                    storeValueSeo={titleSettings && titleSettings.value.seo ? titleSettings.value.seo : null}
                                    seo={this.state.value.seo}
                                    defaultSeo={defaultValue.seo}
                                    updateStateProps={this.updateStateProps}/>
                            </Category>
                        </Column>

                        <Category className={[ this.state.openView || this.state.openPreview  ? 'hidden' : '']}>
                            <CategoryText
                                storeValueFont={titleSettings && titleSettings.value.font ? titleSettings.value.font: null}
                                storeValueText={titleSettings && titleSettings.value.text ? titleSettings.value.text : null}
                                font={this.state.value.font}
                                text={this.state.value.text}
                                defaultFont={defaultValue.font}
                                defaultText={defaultValue.text}
                                updateStateProps={this.updateStateProps}
                            />
                        </Category>
                    </Choices>

                    <ChoiceItemsConfirm className={this.state.openView || this.state.openPreview || !this.isUpdated()  ? 'hidden' : ''}>
                        <ButtonBasic
                            className={this.isUpdated() ? '' : 'disable'}
                            onClick={e => {
                                e.preventDefault();
                                if(titleSettings.value){
                                    this.setState({
                                        value: titleSettings.value
                                    });
                                }
                            }}>
                            Cancel
                        </ButtonBasic>
                        <ButtonGreen
                            disabled={!this.isUpdated()}
                            className={this.isUpdated() ? 'active' : ''}
                            onClick={() => {
                                dispatch(updateSettingsValue(name, this.state.value, this.state.active, indexComponent, indexSection));
                            }}>
                            Update
                        </ButtonGreen>
                    </ChoiceItemsConfirm>
                </FieldsTemplate>
            </div>
        );
    }
}

Title.propTypes = {
    indexSection: PropTypes.number.isRequired,
    indexComponent: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue : PropTypes.object
};
const mapStateToProps = state => ({
    dom: getCurrentDOM(state),
});

export default connect(mapStateToProps)(Title);
