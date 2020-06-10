import * as React from 'react';
import {observable, computed, action} from "mobx";
import {observer} from "mobx-react";
import {RowData} from './RowData';
import {Errors} from './Errors';
import {Description, InputsContainer, AddButton,
        MainTitle, Input, ElementTitle, TableHeader, InputContainer} from './List.styles';

interface Row {
    itemID: number;
    title: string;
}

class ListState {
    @observable inputTitle: string = '';
    @observable mainItems: Array<Row>;
    @observable xlItems: Array<Row>;
    @observable xsItems: Array<Row>
    @observable errors: Array<string> = [];
    @observable komunikat: string = '';
    @observable counter: number = 0;
    @observable finalListArray: Array<any>;

    constructor() {
        this.mainItems = [];
        this.xlItems = [];
        this.xsItems = [];
        this.finalListArray = []
    }

    @action handleClick = () => {
        this.errors = [];
        const regex = /^s$|^m$|^l$|^\x+s$|^\x+l$/;
        const matchRegex = this.inputTitle.match(regex);

        //validation conditions
        if(this.inputTitle.length < 1){
            this.errors.push("Title should have at least 1 characters");
        };

        if(!matchRegex){
            this.errors.push("not match to regex");
        };

        if(this.inputTitle.includes('xxl') && matchRegex && this.xlItems.map(el => el.title).includes(this.inputTitle) === false) {
            this.xlItems.push({
                title: this.inputTitle,
                itemID: this.counter++
            });
        };

        if(this.inputTitle.includes('xxs') && matchRegex && this.xsItems.map(el => el.title).includes(this.inputTitle) === false) {
            this.xsItems.push({
                title: this.inputTitle,
                itemID: this.counter++
            });
        };

        if(this.inputTitle.length <= 2 && matchRegex && this.mainItems.map(el => el.title).includes(this.inputTitle) === false) {
            this.mainItems.push({
                title: this.inputTitle,
                itemID: this.counter++
            });
            this.inputTitle = '';
        };

        if(this.inputTitle.length >= 1) {
            this.inputTitle = '';
        };
        return null;
    }

    handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
        this.inputTitle = e.currentTarget.value;
    }

    @computed get xsList() {
        return this.xsItems.sort((a, b) => b.title.length - a.title.length);
    }

    @computed get xlList() {
        return this.xlItems.sort((a, b) => a.title.length - b.title.length);
    }

    @computed get mainList() {
        const item_order = ["xs", "s", "m", "l", "xl"];
        const orderedItems = this.mainItems.sort((a, b) => item_order.indexOf(a.title) - item_order.indexOf(b.title));
        return orderedItems;
    }

    @computed get finalList() {
        const finalList = [...this.xsList, ...this.mainList, ...this.xlList];
        return finalList;
    }

    @action handleDelete = (idToDelete: number ) => {
        const newList = this.mainItems.filter((el) => el.itemID !== idToDelete );
        this.mainItems = newList;
        const newListXS = this.xsItems.filter((el) => el.itemID !== idToDelete );
        this.xsItems = newListXS;
        const newListXL = this.xlItems.filter((el) => el.itemID !== idToDelete );
        this.xlItems = newListXL;
    }

    @computed get renderList() {
        const out = Array.from(this.finalList).map((el, i) => <RowData rowTitle={el.title} itemID={el.itemID} indexID={i} handleDelete={this.handleDelete}/>)
        return out;
    }

    renderError() {
        if(this.errors.length > 0) {
            return this.errors.map(
                (el, id) => <Errors message={el} key={id}/>
            );
        }
    }

}

export const List = observer(() => {
    const [state] = React.useState(() => new ListState());

    return (
        <>
            <InputsContainer>
                <MainTitle>T-shirt sizes</MainTitle>
                <Description>you can type only t-shirt sizes like +xs, s, m, l, +xl and its will be sorted below</Description>
                {state.renderError()}
                <InputContainer>Type T-shirt size
                    <Input onChange={state.handleChangeTitle} type="text" value={state.inputTitle}/>
                    <AddButton onClick={state.handleClick}>ADD</AddButton>
                </InputContainer>
            </InputsContainer>

            <TableHeader>
                <ElementTitle>T-shirt size</ElementTitle>
                <ElementTitle>T-shirt</ElementTitle>
            </TableHeader>
            {state.renderList}
        </>
    );
});