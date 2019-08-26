import {extensionTheme} from "../../style/theme";
import styled from "styled-components";
import {ChoiceConfirm} from "../../style/styledComponentsFields";

export const Languages = styled.div`
  display : flex;
  height : auto;
  align-items : center;
  width : fit-content;
  justify-content : space-between;
  border-right : 1px solid ${ extensionTheme.grey30 }; 
  padding-right : 20px;
`;

export const ToogleLanguage = styled.div`
  width : 22px;
  height : 20px;
  display : flex;
  border-width : 1px;
  border-style : solid;
  border-color :  ${ extensionTheme.grey40 }; 
  color :  ${ extensionTheme.grey40 }; 
  border-radius : 3px;
  font-size : 11px;
  letter-spacing:1px;
  justify-content : center;
  align-items : center;
  cursor : pointer;
  background : ${ extensionTheme.white }; 
  transition: background 0.6s ease, color 0.6s ease;
  margin-left : 10px;
  
  &.active{
    color :  ${ extensionTheme.white }; 
    background : ${ extensionTheme.blueM }; 
    border-color :  ${ extensionTheme.blueM }; 
  }
`;


export const ChoiceItemsConfirm = styled(ChoiceConfirm)`
    padding : 10px 15px 10px 20px;
    width : 100%;
    border-top : 1px solid ${ extensionTheme.grey20 };
    box-sizing : border-box;
`;
export const Content = styled.div`
   display: flex;
    flex-wrap : wrap;
`;
export const Settings = styled.div`
   
`;



export const Choices = styled.div`
   display : flex;
`;


export const Column = styled.div`
   display : flex;
    flex-direction : column;
    width : 100%;
    border-right : 1px solid ${ extensionTheme.grey20 }

    
    &.full-width{
        width : 100%;
        
       
    }
`;