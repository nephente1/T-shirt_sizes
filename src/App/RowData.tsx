import * as React from 'react';
import {observer} from "mobx-react";
import {TShirtIconWrapper, ElementTitle, Rows, DeleteButton} from './List.styles';

interface RowDataPropsType {
    rowTitle: string;
    indexID: number;
    itemID: number;
    handleDelete:(id: number) => void;
}

export const RowData = observer((props: RowDataPropsType) => {

    const onHandleDelete = () => {
        const {itemID, handleDelete } = props;
        handleDelete(itemID)
    }

    return (
        <Rows>
            <ElementTitle>{props.rowTitle}</ElementTitle>
            <ElementTitle>
                <TShirtIconWrapper size={props.indexID + 1} />
            </ElementTitle>
            <DeleteButton onClick={onHandleDelete}>Delete</DeleteButton>
        </Rows>
    );
});