import * as React from 'react';
import {observer} from "mobx-react";
import {ErrorsRow} from './List.styles';

interface ErrorsPropsType {
    message: string,
 }

 export const Errors = observer((props:ErrorsPropsType) => {
     return(
         <ErrorsRow>{props.message}</ErrorsRow>
     )
 });