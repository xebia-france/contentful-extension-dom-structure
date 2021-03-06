import styled from 'styled-components';
import { extensionTheme} from "../../style/theme";

export const Element = styled.div`
   width : 100px;
   position : relative;
   height : 30px;
   display : flex;
   justify-content : center;
   align-items : center;
   border-left : 1px solid ${ extensionTheme.grey80 };
   border-right : 1px solid ${ extensionTheme.grey80 };
   border-top : 1px solid ${ extensionTheme.grey80 };
   
   &>svg{
        width : 100px;
        height : 20px;
   }
    
`;

export const Preview = styled.div`
    display : flex;
    width : auto;
    align-items : center;
`;

export const Label = styled.p`
    position : absolute;
    color : ${ extensionTheme.grey30};
    font-size : 12px;
    top : 10px;
    left : calc(100% + 40px);
    width : fit-content;  
`;

export const PreviewContainer = styled.div`
    display : flex;
    flex-direction : column;
    width : auto;
    box-sizing : border-box;
    
    & ${Preview}:last-child ${Element}{
        border-bottom : 1px solid ${ extensionTheme.grey80 };
    }  
`;

export const Container = styled.div`
    display : flex;
    flex-direction : column;
`;

export const Button = styled.div`
   width : 50%;
   opacity : 0;
   transition : opacity 0.25s ease;
   display :flex;
   justify-content : center;
   align-items : center;
   
   & svg{
    width : 8px;
   }
`;

export const ButtonsMove = styled.div`
    position : absolute;
    display : flex;
    width : 100%;
    height : 100%;
    
    &:hover{
        &>${Button}{
            opacity : 0.4;
            
            &:hover{
                background-color : ${ extensionTheme.blueM};
                opacity : 0.9;
            }
        }
    }
    
    &>${Button}{
       background-color : ${ extensionTheme.grey30};
        
        &:nth-child(1){
            transform : rotate(180deg);
        }
    }
    
`;

export const Wrapper = styled.div`
    padding : 20px;
    border : 1px solid ${ extensionTheme.grey30};
    width : fit-content;
`;

