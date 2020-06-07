import * as React from 'react';
import {observer} from "mobx-react";
import {TShirtIconWrapper, ElementTitle, Rows} from './List.styles';

interface RowDataPropsType {
    rowTitle: string;
    indexID: number;
}

export const RowData = observer((props: RowDataPropsType) => {
    return (
        <Rows>
            <ElementTitle>{props.rowTitle}</ElementTitle>
            <ElementTitle>
                <TShirtIconWrapper size={props.indexID + 1} />
            </ElementTitle>
        </Rows>
    );
});