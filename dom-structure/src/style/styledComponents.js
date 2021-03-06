import styled from 'styled-components';
import { contentfulTheme, extensionTheme } from './theme';

export const Extension = styled.div`
    width : auto;
    height : auto;
    p {
        margin : 0;
    }
    
    
`;
export const MainContainer = styled.div`
    border-radius : 2px;
    padding-bottom : 20px;
    margin-bottom : 20px;
    padding-top : 20px;
    display : flex;
    flex-direction : column;
    flex-wrap : wrap;
    height : auto;
    font-family :${ contentfulTheme.basicFont };
    font-size : 14px;
    font-weight : 400;

    
    h2{
       font-weight : 300; 
       font-size : 14px;
       color : ${ contentfulTheme.grey };
    }
    
    select{
        height : 30px;
        box-sizing : border-box;
        padding-top : 6px;
        padding-bottom : 7px;
        padding-left : 1ex;
        padding-right : 8ex;
        border : 1px solid  ${ contentfulTheme.grey };
        border-radius : 2px;
        background : none;
         appearance : none;
        -webkit-appearance : none;
        text-overflow : ellipsis;
        overflow : hidden;
        white-space : nowrap;
        background-color : white;
        background-image : url('https://static.contentful.com/app/svg/dd-arrow-down-9ca5518bcf.svg'), none;
        background-position:center right 0.8em;
        background-repeat : no-repeat, repeat;
        background-size : 12px, 100%;
        font-size : 13px;       
    }

    input {
        font-size : 14px;
        color : ${ contentfulTheme.black };
        border-width : 0 0 1px 0;
        border-style : solid;
        border-color : transparent;
        border-image-width : 0 0 1px 0;
        border-image-source :url("https://static.contentful.com/app/svg/dotted-border.svg");
        border-image-repeat : round;
        border-image-slice : 1.1; 
        height : 30px;
        background : transparent;
        
        &[type='text']{
            border-width : 0 0 1px 0;
            border-style : solid;
            border-color : transparent;
            border-image-width : 0 0 1px 0;
            border-image-source :url("https://static.contentful.com/app/svg/dotted-border.svg");
            border-image-repeat : round;
            border-image-slice : 1.1; 
            
            
        }
       
        
      
    }
    
    label{
        font-size : 12px;
        line-height : 24px;
        font-weight : 200;
        color : ${ extensionTheme.grey40 };
        font-family :${ contentfulTheme.basicFont };

    }
    
    section{
      width : 100%;
      margin-bottom : 15px;
    }
    
    section.reset{
        width : 100%;
        display : flex;
        justify-content:flex-end;
        align-items : center;
        padding-top : 10px;
        
        button {
            cursor : pointer;
            height : fit-content;
            border : 1px solid  ${ contentfulTheme.grey };
            background : transparent;
            border-radius : 4px;
            padding : 6px;
            font-size : 11px;
            line-height : 11px;
            opacity : 0.8;
        }
    }
    
    section.field{
        display : flex;
        flex-direction : column;
        width : fit-content;
        
        p{
            margin : 0;
            font-family:${ contentfulTheme.basicFont };
            font-size : 14px;
            font-weight : 100;
        }
    }
   
    section.textPreview{
        width : 100%;
    }

    p.subtext{
        font-size : 12px !important;
        font-family :${ contentfulTheme.basicFont };
        padding-top : 10px;
        color : ${ contentfulTheme.black };
        opacity : 0.6;
    }
    
    .hidden{
        display : none;
    }
    
    
`;

export const Container = styled.div`
  border: 1px solid ${ extensionTheme.grey30 };
  border-left : 5px solid ${ extensionTheme.orange };
  background : ${ extensionTheme.grey10 };
  margin-bottom : 10px;
  width : 100%;
  
  box-sizing : border-box;

  
  h3, h4{
    font-size : 13px;
    width : fit-content;
    padding : 0 0 0 10px;
    margin : 0;
    line-height : 40px;

  }
  h3{
    font-weight : 400;
   }
   h4{
    color :  ${ extensionTheme.grey };
    font-weight : 300;
   }
  
  .hidden{
    display : none;
  }
`;

export const Form = styled.form`
  display : flex;
  width : 100%;
  justify-content: space-between;
  padding : 15px 0;
  box-sizing : border-box;
  
  button{
    margin-right : 15px;
  }
  
  &>div{
    display: flex;
    flex-direction : column;
    
    &.buttons{
        flex-direction : row;
       align-items : flex-end;
    }
    
  }
  
   &>div:nth-child(1),   &>div:nth-child(2){
        padding-right : 15px;
    }
`;

export const OptionsBlock = styled.div`
  display : flex;
  flex-direction : column;
  width : 100%;
  height : fit-content;

`;

export const Icon = styled.div`
  width : 40px;
  height : 40px;
  cursor  : pointer;
  display :flex;
  align-items : center;
  transition : transform 0.3s ease; 
  position : relative;
  
  &>svg g path, &>svg path, &>svg rect, &>svg g circle {
        fill : ${ extensionTheme.grey40 };
    }

  &.active{
    &>svg g path, &>svg path, &>svg rect, &>svg g circle {
        fill : ${ extensionTheme.greenM };
    }
  }
  
  &.disable{
    &>svg g path, &>svg  path, &>svg g circle {
        fill : ${ extensionTheme.grey20 };
    }
  }
  
  &:not(.disable):hover{
    &>svg g path, &>svg  path, &>svg rect, , &>svg g circle {
        fill : ${ extensionTheme.greenM };
    }
  }
  
   &.trash:hover{
    &>svg g path, &>svg path, &>svg  rect {
        fill : ${ extensionTheme.redM };
    }
  }
  &.trash.active{
    &>svg g path, &>svg path, &>svg  rect {
        fill : ${ extensionTheme.redM };
    }
  }
  
  &.rotate{
    transform : rotate(180deg);
  }
  
  &.toggleAll{
    &>svg g path, &>svg path, &>svg  rect {
        fill : ${ extensionTheme.white };
    }
    
    &:hover{
        &>svg g path, &>svg path, &>svg  rect {
            fill : ${ extensionTheme.white };
        }
    }
  }
  
`;

export const Range = styled.div`
  display : flex;
  flex-direction : column;
  width : 40px;
  
  & ${ Icon }{
    height : 20px;
    
    &:nth-child(2){
        transform:rotate(180deg);
    }
  }
`;

export const SafeDelete = styled.div`
  display : flex;
  justify-content : space-between;
  width : 100%;
  background: ${ extensionTheme.redXS };  
  color: ${ extensionTheme.redM };  
  padding-left : 8px; 
  padding-top : 15px;
  padding-bottom : 15px;
  align-items : center;
  box-sizing : border-box;
  
  &>p{
    padding-right : 10px;
  }
  
  & div.buttons{
    min-width : 160px;
    
    &>button{
        margin-right : 15px;
        margin-left : 0;

    }
  }
`;

export const ErrorBanner = styled.div`
  width : 100%;
  background: ${ extensionTheme.redXS };  
  color: ${ extensionTheme.redM };  
  padding: 15px;
  margin-bottom: 30px;
  align-items : center;
  box-sizing : border-box;
  
  
`;

export const Error = styled.div`
  
  & h2{
    color : ${ extensionTheme.redM };
    font-weight : 700;
    font-size : 16px;
  } 
  & p{
    color : ${ extensionTheme.redM };
  }
`;


export const ChoiceInterface = styled.div`
   display : flex;
   & button{
    margin-right : 10px;
   }
`;
