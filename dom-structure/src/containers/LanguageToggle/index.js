import React from 'react';
import PropTypes from 'prop-types';
import {Languages, ToogleLanguage} from './styled';
import {connect} from 'react-redux';
import {getCurrentExtension, getCurrentLanguage, toggleLanguage} from '../../actions/index';
import {getCountryISO} from '../../utils/functions';

const LanguageToggle = ({dispatch, extension, indexLanguage, hidden}) => {
    if (!extension.locales) return null;
    return (
        <Languages className={hidden ? 'hidden' : ''}>
            {
                extension.locales.available.map((language, i) => {
                    return <ToogleLanguage
                        key={i}
                        className={indexLanguage === i ? 'active' : ''}
                        onClick={() => {
                            dispatch(toggleLanguage(i));
                        }}>{getCountryISO(language)}</ToogleLanguage>;
                })
            }
        </Languages>
    );
};

LanguageToggle.propTypes = {
    hidden: PropTypes.bool,
    indexLanguage: PropTypes.number
};

const mapStateToProps = state => ({
    extension: getCurrentExtension(state).extension,
    indexLanguage: getCurrentLanguage(state).language
});

export default connect(mapStateToProps)(LanguageToggle);
