import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon} from '../../style/styledComponents';
import {Banner, Fields, ActiveContent} from '../../style/styledComponentsBoxes';
import SvgArrow from '../../components/SvgArrow';
import {connect} from 'react-redux';
import {updateContentTitle, getCurrentDOM} from '../../actions';

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            value: '',
            active: true
        };
    }

    componentDidMount = () => {
        const componentStore = this.props.dom.sections[this.props.indexSection].components[this.props.indexComponent];

        this.setState({
            value: componentStore.content.Title ? componentStore.content.Title.value : '',
            active: componentStore.content.Title ? componentStore.content.Title.active : true
        });
    }

    render() {
        const {dispatch, dom, indexComponent, indexSection, maxLength, name} = this.props;
        return (
            <div>
                <Banner>
                    <div>
                        <ActiveContent
                            className={this.state.active ? 'active' : ''}
                            onClick={e => {
                                return new Promise((resolve, reject) => {
                                    this.setState({active: !this.state.active});
                                    resolve();
                                }).then(() => {
                                    dispatch(updateContentTitle(this.state.value, this.state.active, indexComponent, indexSection));
                                });
                            }}/>
                        <p>{name}</p>
                    </div>
                    <Icon className={this.state.open ? '' : 'rotate'}
                          onClick={() => {
                              this.setState({open: !this.state.open});
                          }}><SvgArrow/></Icon>
                </Banner>
                <Fields className={this.state.open ? '' : 'closed'}>
                    <input type={'text'} maxLength={maxLength}
                           defaultValue={this.state.value}
                           onBlur={e => {
                               return new Promise((resolve, reject) => {
                                   this.setState({value: e.target.value});
                                   resolve();
                               }).then(() => {
                                   console.log(this.state);
                                   dispatch(updateContentTitle(this.state.value, this.state.active, indexComponent, indexSection));
                               });
                           }}/>
                    <span>{maxLength} characters</span>
                </Fields>
            </div>
        );
    }
};

Title.propTypes = {
    indexSection: PropTypes.number.isRequired,
    indexComponent: PropTypes.number.isRequired,
    maxLength: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    dom: getCurrentDOM(state)
});

export default connect(mapStateToProps)(Title);
