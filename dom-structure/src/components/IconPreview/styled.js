import { IconContainer } from '../../style/styledComponentsFields';
import styled from 'styled-components';
import { extensionTheme } from '../../style/theme';

export const PreviewContainer = styled.div`
    display : flex;
`;
export const TextContainer = styled.div`
    max-height : 115px;
    overflow : hidden;
    display : flex;
    border-bottom : 1px solid ${ extensionTheme.grey20 }
    position : relative;
    min-height : 115px;
    width : 100%;
    box-sizing : border-box;

    &.is-open{
        height : 240px;
        max-height : none;
        max-width : 100%;
        
        & p{
            max-width : 100%;
        }
    }
    
    &.on-dark{
        background : black;
        color : white;
    }
    
    & p{
        margin:0;
        padding :10px;
        word-break : break-word;
        box-sizing : border-box;
    }
`;
export const Options = styled.div`
    position: absolute;
    right : 10px;
    top : 10px;    
    
    & ${ IconContainer }{
        background : white;
        border : 1px solid ${ extensionTheme.grey30 }; 
        border-radius : 4px;
        width : 22px;
        height : 22px;
        margin-bottom : 5px;
    }
`;

export const Error = styled.p`
    display : flex;
    width : 100%;
    height : 100%;
    padding : 20px;
    font-size : 12px;
    align-items : center;
    justify-content : center;
    text-align : center;
    color : ${ extensionTheme.grey40 };
`;


