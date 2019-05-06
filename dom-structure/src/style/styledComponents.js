import styled from 'styled-components';
import { contentfulTheme , extensionTheme} from "./theme";

export const Extension = styled.div`
    width : auto;
    height : auto;
    p {
        margin : 0;
    }
    
    
`;
export const MainContainer = styled.div`
    border-radius : 2px;
    box-shadow : 0 1px 3px rgba(0,0,0,0.08);
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
        height : 33px;
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
        background-size : 10px, 100%;
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
    }
    
    label{
        font-size : 13px;
        line-height : 24px;
        color : ${ contentfulTheme.grey };
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
  border: 1px solid ${ extensionTheme.grey };
  border-left : 5px solid ${ extensionTheme.orange };
  background : ${ extensionTheme.grey10 };
  margin-bottom : 10px;
  padding-left : 8px;
  padding-right :8px;

  
  h3, h4{
    font-size : 13px;
    width : fit-content;
    padding : 0 5px;
    margin : 0;line-height : 40px;

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


export const ButtonBasic = styled.button`
   background :  ${ extensionTheme.grey60 };
   color : white;
   font-family:${ contentfulTheme.basicFont };
   font-size : 14px;
   cursor : pointer;xz
   height : fit-content;
   border : 1px solid  ${ extensionTheme.white };
   border-radius : 4px;
   padding : 10px;
   line-height : 11px;
   font-weight : 300;
   height : 33px;
   transition : background .2s ease, background-image .2s ease,opacity .2s ease-in-out,border-color .2s ease;

   
   &:hover{
    background :  ${ extensionTheme.grey50 };
   }
  
`;


export const ButtonGreen = styled.button`
   background :  ${ extensionTheme.grey20 };
   color : white;
   font-family:${ contentfulTheme.basicFont };
   font-size : 14px;
   cursor : pointer;
   height : fit-content;
   border : 1px solid  ${ extensionTheme.grey10 };
   border-radius : 4px;
   padding : 10px;
   line-height : 11px;
   font-weight : 300;
   height : 33px;
   transition : background .2s ease, background-image .2s ease,opacity .2s ease-in-out,border-color .2s ease;

   
   &.active{
    background : ${ contentfulTheme.greenM };
    background-image : -webkit-gradient(linear,left bottom,left top,from(#0eb87f),to(#14d997));
    background-size : 100% 200%;
    border : 1px solid  ${ contentfulTheme.greyL };
    color : white;
    
        &:hover{
          background : ${ contentfulTheme.greenXL };
          background-image : transparent;
          cursor : pointer !important;
        }
    
    }
  
`;


export const Form = styled.form`
  display : flex;
  justify-content: space-between;
  padding : 10px 0;
  
  button:not(:first-child){
    margin-left : 10px;
  }
  
  &>div{
    display: flex;
    flex-direction : column;
    
    &.buttons{
        flex-direction : row;
       align-items : flex-end;
    }
    
  }
`;