import React from 'react';
import { Container, ViewPort, IconContainer, Actions } from './styled';

import SvgAddSmall from '../svg/SvgAddSmall';
import SvgAttachement from '../svg/SvgAttachement';
import SvgTrashSmall from '../svg/SvgTrashSmall';

export default function UploadView (props) {
    return (
        <Container>
            <ViewPort isDraggingOver={props.isDraggingOver} >
                <span>upload asset</span>
            </ViewPort>
            {!props.isDraggingOver ? (
                <Actions>
                    <div>
                        <IconContainer onClick={props.onClickLinkExisting}>
                            <SvgAttachement/>
                        </IconContainer>
                        <IconContainer onClick={props.onClickNewAsset}>
                            <SvgAddSmall/>
                        </IconContainer>
                    </div>
                    <IconContainer className={'delete'}>
                        <SvgTrashSmall/>
                    </IconContainer>
                </Actions>
            ) : null}
        </Container>
    );
}
