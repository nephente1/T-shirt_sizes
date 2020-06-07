import * as React from 'react';
import {observable, computed, action} from "mobx";
import {observer} from "mobx-react";
import {RowData} from './RowData';
import {Errors} from './Errors';
import {Description, InputsContainer, AddButton,
        MainTitle, Input, ElementTitle, TableHeader} from './List.styles';

class ListState {
    @observable inputTitle: string = '';
    @observable mainItems: Array<string>;
    @observable xlItems: Array<string>;
    @observable xsItems: Array<string>
    @observable errors: Array<string> = [];
    @observable komunikat: string = '';

    constructor() {
        this.mainItems = [];
        this.xlItems = [];
        this.xsItems = [];
    }

    @action handleClick = () => {
        this.errors = [];
        const regex = /s|m|l|\x+s|\x+l/;
        const matchRegex = this.inputTitle.match(regex);

        //validation conditions
        if(this.inputTitle.length < 1){
            this.errors.push("Title should have at least 1 characters");
        };
        if(!matchRegex){
            this.errors.push("not match to regex");
        };
        if(this.inputTitle.includes('xxl') && matchRegex){
            this.xlItems.push(this.inputTitle);
        };
        if(this.inputTitle.includes('xxs') && matchRegex){
            this.xsItems.push(this.inputTitle);
        };
        if(this.inputTitle.length <= 2 && matchRegex) {
            this.mainItems.push(this.inputTitle);
            this.inputTitle = '';
        };
        if(this.inputTitle.length >= 1){
            this.inputTitle = '';
        };
        return null;
    }

    handleChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
        this.inputTitle = e.currentTarget.value;
    }

    @computed get xsList() {
        return this.xsItems.sort((a, b) => b.length - a.length);
    }

    @computed get xlList() {
        return this.xlItems.sort((a, b) => a.length - b.length);
    }

    @computed get mainList() {
        const item_order = ["xs", "s", "m", "l", "xl"];
        const orderedItems = this.mainItems.sort((a, b) => item_order.indexOf(a) - item_order.indexOf(b));
        return orderedItems;
    }

    @computed get finalList() {
        const finalList = [...this.xsList, ...this.mainList, ...this.xlList];
        const finalList1 = new Set(finalList);
        return Array.from(finalList1).map((el, i) => <RowData rowTitle={el} key={i} indexID={i}/>);
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
                <div>Type T-shirt size
                    <Input onChange={state.handleChangeTitle} type="text" value={state.inputTitle}/>
                    <AddButton onClick={state.handleClick}>ADD</AddButton>
                </div>
            </InputsContainer>

            <TableHeader>
                <ElementTitle>T-shirt size</ElementTitle>
                <ElementTitle>T-shirt</ElementTitle>
            </TableHeader>
            {state.finalList}
        </>
    );
});