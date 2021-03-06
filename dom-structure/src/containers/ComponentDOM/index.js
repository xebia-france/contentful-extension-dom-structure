import React, {Component} from 'react';
import {connect} from 'react-redux';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import componentConfig from '../../config/components/*.js';
import {
    removeComponent,
    updateComponent,
    toggleComponentActive,
    getCurrentExtension,
    getVersionStorage
} from '../../actions';
import {notifierError, notifierSuccess, ALERT} from "../../utils/Notifier";

import {SafeDelete} from '../../style/styledComponents';
import {
    ContainerComponent,
    FormComponent,
    Description,
    Active,
    TopBar,
    FieldsContainer,
    Fields,
    Column,
    Buttons
} from './styled';

import ButtonBasic from '../../components/ui/ButtonBasic';
import ButtonValidate from '../../components/ui/ButtonValidate';
import ButtonDelete from '../../components/ui/ButtonDelete';
import FieldsList from '../../components/FieldsList';
import OrderFieldsContent from '../OrderFieldsContent';
import SvgCheck from '../../components/svg/SvgCheck';
import ActionBarComponent from './ActionBarComponent';
import isEqual from "lodash/isEqual";
import CodeHighlightJSON from '../../components/CodeHighlightJSON';

class ComponentDOM extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentView: '',
            component: null,
            openOption: false,
            config: {},
            triggerOpening: false,
            componentsOnLocalStorage: false
        };
    }

    componentDidMount = async () => {
        this.setState({component: this.props.component});
        this.checkLocalStorage();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.component, prevProps.component)) {
            this.setState({component: this.props.component});
        }

        if (this.props.versionStorage !== prevProps.versionStorage) {
            this.checkLocalStorage();
        }
    }

    checkLocalStorage = () => {
        try {
            if (localStorage && localStorage.getItem('copiedComponents')) {
                this.setState({componentsOnLocalStorage: true});
            }
        } catch (e) {
            console.log('private navigation');
        }
    }

    updateModel = model => {
        this.setState({
            component: update(this.state.component, {
                model: {$set: model},
            })
        });
    }

    updateName = name => {
        this.setState(prevState => ({
            component: update(prevState.component, {
                name: {$set: name}
            })
        }));
    }

    updateOrder = order => {
        this.setState(prevState => ({
            component: update(prevState.component, {
                order: {$set: order}
            })
        }));
    }

    toggleActive = () => this.props.dispatch(toggleComponentActive(!this.props.component.active, this.props.index, this.props.indexParent));

    toggleOptions = () => this.setState({
        openOption: !this.state.openOption
    })

    triggerOpening = () => this.setState(prevState => ({
        triggerOpening: !prevState.triggerOpening
    }))

    isUpdated = () => (this.state.component && (
        this.state.component.name !== this.props.component.name ||
        this.state.component.model !== this.props.component.model ||
        this.state.component.order !== this.props.component.order
    ))

    getComponentFields = () => {
        return componentConfig[this.props.component.model].default.fields;
    }

    getComponentFieldsByState = () => {
        return componentConfig[this.state.component.model].default.fields;
    }

    pastComponent = () => {
        const componentToPast = JSON.parse(localStorage.getItem('copiedComponents'));
        if (!componentToPast) {
            notifierError(this.props.extensionInfo.extension, ALERT.ERROR_MEMORY_COMPONENT);
        } else {
            const pasted = componentToPast[0];
            this.setState(prevState => ({
                currentView: 'presets',
                component: update(prevState.component, {
                    name: {$set: pasted.name},
                    model: {$set: pasted.model},
                    order: {$set: pasted.order},
                    fields: {$set: pasted.fields}
                })
            }), () => {
                notifierSuccess(this.props.extensionInfo.extension, ALERT.SUCCESS_PAST_COMPONENT);
            })
        }
    }

    updateView = (view) => this.setState(prevState => ({currentView: prevState.currentView === view ? '' : view}));

    closeOption = () => this.setState({openOption: false});

    render() {
        const {dispatch, component, index, indexParent, lengthParent} = this.props;
        let inputName, selectModel;

        if (!this.state.component) return null;

        return (
            <ContainerComponent>
                <TopBar
                    borderBottom={this.state.currentView === 'presets' || this.state.currentView === 'formDelete' || this.state.currentView === 'configuration'}>
                    <Description>
                        <Active
                            className={component.active ? 'active' : ''}
                            onClick={e => {
                                this.toggleActive();
                            }}>
                            <SvgCheck/>
                        </Active>
                        <h3>{component.name} </h3>
                        <h4>{component.model} </h4>
                    </Description>
                    <ActionBarComponent openOption={this.state.openOption}
                                        currentView={this.state.currentView}
                                        updateView={this.updateView}
                                        triggerOpening={this.state.triggerOpening}
                                        toggleTrigger={this.triggerOpening}
                                        closeOption={this.closeOption}
                                        pastComponent={this.pastComponent}
                                        component={this.state.component}
                                        index={index}
                                        indexParent={indexParent}
                                        toggleOptions={this.toggleOptions}
                                        lengthParent={lengthParent}
                    />
                </TopBar>
                {
                    this.state.currentView === 'formDelete' &&
                    <SafeDelete>
                        <p>The deletion is final. Are you sure you want to delete this component?</p>
                        <div className={'buttons'}>
                            <ButtonBasic label={'Cancel'} action={() => {
                                this.updateView('');
                                this.closeOption();
                            }}/>
                            <ButtonDelete label={'Delete'} action={() => {
                                dispatch(removeComponent(index, indexParent));
                                this.updateView('');
                                this.closeOption();
                            }}/>
                        </div>
                    </SafeDelete>
                }
                {
                    this.state.currentView === 'configuration' &&
                        <CodeHighlightJSON content={`<pre><code class="json">${JSON.stringify(this.state.component, null,  4)}</code></pre></pre>`}/>
                }
                {
                    this.state.currentView === 'presets' || this.isUpdated() ?
                        <div><FormComponent onSubmit={e => {
                            e.preventDefault();
                            if (!this.isUpdated()) return;
                            dispatch(updateComponent(this.state.component, index, indexParent));
                        }}
                        >
                            <Column>
                                <div>
                                    <label>Component Name</label>
                                    <input ref={node => (inputName = node)} type={'text'}
                                           value={this.state.component.name || ''}
                                           onChange={e => {
                                               this.updateName(e.target.value);
                                           }}/>
                                </div>
                                <div>
                                    <label>Model</label>
                                    <p> {this.state.component.model || ''}</p>
                                </div>
                            </Column>
                            <Column>
                                <div>
                                    <label>Order</label>
                                    <OrderFieldsContent componentModel={this.state.component.model}
                                                        fields={this.getComponentFieldsByState()}
                                                        order={this.state.component.order}
                                                        updateOrder={this.updateOrder}/>
                                </div>
                            </Column>
                            {
                                this.isUpdated() && <Buttons className={'buttons'}>
                                    <ButtonBasic
                                        label={'Cancel'}
                                        disabled={!this.isUpdated()}
                                        action={e => {
                                            e.preventDefault();
                                            this.setState(prevState => ({
                                                component: update(prevState.component, {
                                                    name: {$set: this.props.component.name},
                                                    model: {$set: this.props.component.model},
                                                    order: {$set: this.props.component.order},
                                                    fields: {$set: this.props.component.fields}
                                                })
                                            }));
                                            if (inputName) inputName.value = component.name;
                                            if (selectModel) selectModel.value = component.model;
                                        }}/>
                                    <ButtonValidate label={'Update'} type={'submit'} disabled={!this.isUpdated()}/>
                                </Buttons>
                            }
                        </FormComponent></div> : null

                }
                {
                    this.state.currentView === 'presets' &&
                    <FieldsContainer>
                        <Fields>
                            <FieldsList triggerOpening={this.state.triggerOpening} fields={this.getComponentFields()}
                                        fieldsComponent={component.fields}
                                        index={index} indexParent={indexParent}/>
                        </Fields>
                    </FieldsContainer>
                }
            </ContainerComponent>
        );
    }
};

ComponentDOM.propTypes = {
    component: PropTypes.shape({
        active: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,
    indexParent: PropTypes.number.isRequired,
    lengthParent: PropTypes.number.isRequired
};


const mapStateToProps = state => ({
    extensionInfo: getCurrentExtension(state),
    versionStorage: getVersionStorage(state).versionStorage,
});
export default connect(mapStateToProps)(ComponentDOM);


/*

FIRST TRY TO PASS CLASS TO FUNCTIONNAL

import React, {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import componentConfig from '../../config/components/*.js';
import {
    removeComponent,
    updateComponent,
    toggleComponentActive,
    getCurrentExtension,
    getVersionStorage
} from '../../actions';
import {notifierError, notifierSuccess, ALERT} from "../../utils/Notifier";

import {SafeDelete} from '../../style/styledComponents';
import {
    ContainerComponent,
    FormComponent,
    Description,
    Active,
    TopBar,
    FieldsContainer,
    Fields,
    Column,
    Buttons
} from './styled';

import ButtonBasic from '../../components/ui/ButtonBasic';
import ButtonValidate from '../../components/ui/ButtonValidate';
import ButtonDelete from '../../components/ui/ButtonDelete';
import FieldsList from '../../components/FieldsList';
import OrderFieldsContent from '../OrderFieldsContent';
import SvgCheck from '../../components/svg/SvgCheck';
import ActionBarComponent from './ActionBarComponent';
import isEqual from "lodash/isEqual";

const ComponentDOM = (props) => {
    const [currentView, setCurrentView] = useState('');
    const [component, setComponent] = useState(null);
    const [openOption, setOpenOption] = useState(false);
    const [config, setConfig] = useState({});
    const [triggerOpening, setTriggerOpening] = useState(false);
    const [componentsOnLocalStorage, setComponentsOnLocalStorage] = useState(false);

    useEffect(() => {
        setComponent(props.component);
        checkLocalStorage();
    }, [props.versionStorage, props.component]);

    const checkLocalStorage = () => {
        try {
            if (localStorage && localStorage.getItem('copiedComponents')) {
                setComponentsOnLocalStorage(true);
            }
        } catch (e) {
            console.log('private navigation');
        }
    }

    const updateModel = model => {
        setComponent(prev => ({
            ...prev,
            model: model
        }));
    }

    const updateName = name => {
        setComponent(prev => ({
            ...prev,
            name: name
        }));
    }

    const updateOrder = order => {
        setComponent(prev => ({
            ...prev,
            order: order
        }));
    }

    const toggleActive = () => props.dispatch(toggleComponentActive(!props.component.active, props.index, props.indexParent));

    const toggleOptions = () => setOpenOption(prev => !prev);

    const toggleTriggerOpening = () => setTriggerOpening(prev => !prev);

    const isUpdated = () => (component && (
        component.name !== props.component.name ||
        component.model !== props.component.model ||
        component.order !== props.component.order
    ))

    const getComponentFields = () => {
        return componentConfig[props.component.model].default.fields;
    }

    const getComponentFieldsByState = () => {
        return componentConfig[component.model].default.fields;
    }

    const pastComponent = () => {
        const componentToPast = JSON.parse(localStorage.getItem('copiedComponents'));
        if (!componentToPast) {
            notifierError(props.extensionInfo.extension, ALERT.ERROR_MEMORY_COMPONENT);
        } else {
            const pasted = componentToPast[0];
            setComponent(prev => ({
                ...prev,
                name: pasted.name,
                model: pasted.model,
                order: pasted.order,
                fields: pasted.fields
            }), () => {
                setCurrentView('presets');
                notifierSuccess(props.extensionInfo.extension, ALERT.SUCCESS_PAST_COMPONENT);
            });
        }
    }

    const updateView = (view) => setCurrentView(prev => prev === view ? '' : view);


    const closeOption = () => setOpenOption(false);

    let inputName, selectModel;

    if (!component) return null;

    return (
        <ContainerComponent>
            <TopBar borderBottom={currentView === 'presets' || currentView === 'formDelete'}>
                <Description>
                    <Active
                        className={props.component.active ? 'active' : ''}
                        onClick={() => toggleActive()}>
                        <SvgCheck/>
                    </Active>
                    <h3>{props.component.name} </h3>
                    <h4>{props.component.model} </h4>
                </Description>
                <ActionBarComponent openOption={openOption}
                                    currentView={currentView}
                                    updateView={updateView}
                                    triggerOpening={triggerOpening}
                                    toggleTrigger={toggleTriggerOpening}
                                    closeOption={closeOption}
                                    pastComponent={pastComponent}
                                    component={component}
                                    index={props.index}
                                    indexParent={props.indexParent}
                                    toggleOptions={toggleOptions}
                                    lengthParent={props.lengthParent}
                />
            </TopBar>
            {
                currentView === 'formDelete' &&
                <SafeDelete>
                    <p>The deletion is final. Are you sure you want to delete this component?</p>
                    <div className={'buttons'}>
                        <ButtonBasic label={'Cancel'} action={() => {
                            updateView('');
                            closeOption();
                        }}/>
                        <ButtonDelete label={'Delete'} action={() => {
                            props.dispatch(removeComponent(props.index, props.indexParent));
                            updateView('');
                            closeOption();
                        }}/>
                    </div>
                </SafeDelete>
            }
            {
                currentView === 'presets' || isUpdated() ?
                    <div><FormComponent onSubmit={e => {
                        e.preventDefault();
                        if (!isUpdated()) return;
                        props.dispatch(updateComponent(component, props.index, props.indexParent));
                    }}
                    >
                        <Column>
                            <div>
                                <label>Component Name</label>
                                <input ref={node => (inputName = node)} type={'text'}
                                       value={component.name || ''}
                                       onChange={e => {
                                           updateName(e.target.value);
                                       }}/>
                            </div>
                            <div>
                                <label>Model</label>
                                <p> {component.model || ''}</p>
                            </div>
                        </Column>
                        <Column>
                            <div>
                                <label>Order</label>
                                <OrderFieldsContent componentModel={component.model}
                                                    fields={getComponentFieldsByState()}
                                                    order={component.order}
                                                    updateOrder={updateOrder}/>
                            </div>
                        </Column>
                        {
                            isUpdated() && <Buttons className={'buttons'}>
                                <ButtonBasic
                                    label={'Cancel'}
                                    disabled={!isUpdated()}
                                    action={e => {
                                        e.preventDefault();
                                        setComponent(prev => ({
                                            ...prev,
                                            name: props.component.name,
                                            model: props.component.model,
                                            order: props.component.order,
                                            fields: props.component.fields
                                        }))
                                        if (inputName) inputName.value = component.name;
                                        if (selectModel) selectModel.value = component.model;
                                    }}/>
                                <ButtonValidate label={'Update'} type={'submit'} disabled={!isUpdated()}/>
                            </Buttons>
                        }
                    </FormComponent></div> : null
            }
            {
                currentView === 'presets' &&
                <FieldsContainer>
                    <Fields>
                        <FieldsList triggerOpening={triggerOpening} fields={getComponentFields()}
                                    fieldsComponent={props.component.fields}
                                    index={props.index} indexParent={props.indexParent}/>
                    </Fields>
                </FieldsContainer>
            }
        </ContainerComponent>
    );

};

ComponentDOM.propTypes = {
    component: PropTypes.shape({
        active: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,
    indexParent: PropTypes.number.isRequired,
    lengthParent: PropTypes.number.isRequired
};


const mapStateToProps = state => ({
    extensionInfo: getCurrentExtension(state),
    versionStorage: getVersionStorage(state).versionStorage,
});
export default connect(mapStateToProps)(ComponentDOM);

*/
