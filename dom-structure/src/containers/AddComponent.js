import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComponent } from '../actions';
import { Container, ButtonBasic, ButtonGreen, Form } from '../style/styledComponents';
import update from 'react-addons-update';
import { components } from '../config/defaultConfig';
import styled from "styled-components";
import {extensionTheme} from "../style/theme";


const FormComponent = styled(Form)`
    background :  ${ extensionTheme.white };
`

class AddComponent extends Component {
    constructor (props) {
        super(props);

        this.state = {
            component: {
                type: 'component',
                specs: [],
            }
        };
    }

    updateName = name => {
        this.setState({
            component: update(this.state.component, {
                name: { $set: name },
            })
        });
    }

    updateModel = model => {
        this.setState(
            {
                component: update(this.state.component, {
                    model: { $set: model },
                })
            });
    }

    clearForm = () => {
        this.setState({
            component: {
                type: 'component',
                name : null,
                model : null,
                specs: [],
            }
        });
    }

    isComplete = () => (this.state.component && this.state.component.name && this.state.component.model)

    render () {
        const { dispatch, index, open , parent} = this.props;
        let inputName, selectModel;
        return (
            <Container className={!open ? 'hidden' : ''}>
                <FormComponent
                    onSubmit={e => {
                        e.preventDefault();
                        if (!this.isComplete()) { return; }
                        dispatch(addComponent(this.state.component, index));
                        inputName.value = '';
                        selectModel.value = '';
                        parent.setState({ openAdd: !parent.state.openAdd });
                        this.clearForm();
                    }}
                >
                    <div>
                        <label>Component Name</label>
                        <input ref={node => (inputName = node)} type={'text'}
                               onChange={e => { this.updateName(e.target.value); }}/>
                    </div>
                    <div>
                        <label>Model</label>
                        <select ref={node => (selectModel = node)} defaultValue={''}
                                onChange={e => { this.updateModel(e.target.value); }}>
                            <option value={null}></option>
                            {components.map((model, i) => <option value={model.name} key={i}>{model.name}</option>)}
                        </select>
                    </div>
                    <div className={'buttons'}>
                        <ButtonBasic
                            onClick={e => {
                                e.preventDefault();
                               this.clearForm();
                                inputName.value = '';
                                selectModel.value = '';
                                parent.setState({ openAdd: !parent.state.openAdd });
                            }}
                        >Cancel</ButtonBasic>
                        <ButtonGreen
                            disabled={!this.isComplete()}
                            className={this.isComplete() ? 'active' : ''} type="submit">Add</ButtonGreen>
                    </div>
                </FormComponent>
            </Container>
        );
    }
}

export default connect()(AddComponent);