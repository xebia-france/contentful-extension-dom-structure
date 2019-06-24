import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BoxesContainer } from '../style/styledComponentsBoxes';

class BoxesContent extends Component {
    render () {
        const { fields, index, indexParent, open } = this.props;
        return (
            <BoxesContainer>
                <React.Suspense fallback={<div>Loading Box...</div>}>

                    {
                        fields.map((box, i) => {
                            switch (box) {
                            case 'Title':
                                return React.createElement(React.lazy(() => import('../boxes/content/Title')), { indexComponent: index, indexSection: indexParent, name: box, open: open });

                            case 'Tagline':
                                return React.createElement(React.lazy(() => import('../boxes/content/Tagline')), { indexComponent: index, indexSection: indexParent, name: box, open: open });
                            case 'Text':
                                return React.createElement(React.lazy(() => import('../boxes/content/Text')), { indexComponent: index, indexSection: indexParent, name: box, open: open });

                            default :
                                return <div className={'error'}><p>No content-box <strong>{box}</strong> matches</p></div>;
                            }
                        })
                    }
                </React.Suspense>
            </BoxesContainer>
        );
    }
};

BoxesContent.propTypes = {
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    indexParent: PropTypes.number.isRequired
};

export default BoxesContent;
