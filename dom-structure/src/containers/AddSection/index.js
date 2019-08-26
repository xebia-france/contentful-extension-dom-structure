import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import sectionsConfig from '../../config/sections/*.js';
import { addSection, addSectionToTop, toggleFormAddSection, toggleFormAddSectionToTop } from '../../actions/index';
import { Container } from '../../style/styledComponents';
import { FormSection} from './styled';
import ButtonBasic from '../../components/ui/ButtonBasic';
import ButtonValidate from '../../components/ui/ButtonValidate';


class AddSection extends Component {
    constructor (props) {
        super(props);

        this.state = {
            section: {
                type: 'sections',
                settings: [],
                components: []
            }
        };
    }

    updateName = name => {
        this.setState({
            section: update(this.state.section, {
                name: { $set: name },
            })
        });
    }

    updateModel = model => {
        this.setState(
            {
                section: update(this.state.section, {
                    model: { $set: model },
                })
            });
    }

    clearForm = () => {
        this.setState({
            section: {
                type: 'sections',
                settings: [],
                components: []
            }
        });
    }

    isComplete = () => (this.state.section.name && this.state.section.model)

    render () {
        const { dispatch, open, onTop } = this.props;
        let inputName, selectModel;

        return (
            <Container className={!open ? 'hidden' : ''}>
                <FormSection
                    onSubmit={e => {
                        e.preventDefault();
                        if (!this.isComplete()) { return; }
                        if (onTop) {
                            dispatch(addSectionToTop(this.state.section));
                            dispatch(toggleFormAddSectionToTop());
                        } else {
                            dispatch(addSection(this.state.section));
                            dispatch(toggleFormAddSection());
                        }
                        inputName.value = '';
                        selectModel.value = '';
                        this.clearForm();
                    }}
                >
                    <div>
                        <label>Model</label>
                        <select ref={node => (selectModel = node)} defaultValue={''}
                                onChange={e => { this.updateModel(e.target.value); }}>
                            <option value={null}></option>
                            {
                                Object.keys(sectionsConfig).map((key, i) => {
                                    return <option value={key} key={i}>{key}</option>;
                                })                            }
                        </select>
                    </div>
                    <div>
                        <label>Section Name</label>
                        <input ref={node => (inputName = node)} type={'text'}
                            onChange={e => { this.updateName(e.target.value); }}/>
                    </div>

                    <div className={'buttons'}>
                        <ButtonBasic
                            label={'Cancel'}
                            disabled={!this.isComplete()}
                            action={ (e) => {
                                this.clearForm();
                                inputName.value = '';
                                selectModel.value = '';
                                dispatch(toggleFormAddSection());
                            }}
                        />
                        <ButtonValidate label={'Add'} type={'submit'} disabled={!this.isComplete()}/>
                    </div>
                </FormSection>
            </Container>
        );
    }
}

AddSection.propTypes = {
    open: PropTypes.bool
};

export default connect()(AddSection);
