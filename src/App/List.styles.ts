import styled from '@emotion/styled';
import {TShirtIcon} from "./TShirtIcon";

interface TshirtIconPropsTypes {
    size: number;
}
export const TShirtIconWrapper = styled(TShirtIcon)<TshirtIconPropsTypes>`
    width: ${props => props.size ? props.size+'1px' : '10px'};
`;

export const Description = styled('p')`
    font-size: 16px;
    margin: 0 10px 20px 10px;
`;

export const InputsContainer = styled('div')`
    display:flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
`;

export const MainTitle = styled('h1')`
    font-size: 48px;
    margin: 15px;
    color: orangered;
`;

export const AddButton = styled('button')`
    border: 0px;
    padding: 10px 15px;
    background: #b8e748;
    color: white;
    box-shadow: 0px 0px 15px 0px #797979;
    font-size: 24px;
    cursor: pointer;
    border-radius: 5%;
    &:hover{
        background: #c0ee56;
`;

export const DeleteButton = styled('button')`
    border: 0px;
    color: white;
    box-shadow: 0px 0px 5px 0px #797979;
    cursor: pointer;
    border-radius: 5%;
    background: orangered;
    font-size: 18px;
    padding: 5px 15px;
    &:hover{
        background: red;
    }
`;

export const Input = styled('input')`
    padding: 8px 12px;
    border: none;
    box-shadow: 0px 0px 10px 0px #797979;
    font-size: 22px;
    margin: 0 10px 10px 20px;;
    border-radius: 5%;
`;

export const ErrorsRow = styled('div')`
    color: white;
    background: red;
    padding: 5px 10px;
`;

export const TableHeader = styled('div')`
    display: flex;
    flex-direction: row;
    padding:10px 5px;
    color: white;
    background: #0ab83e;
    margin-top: 10px;
`;

export const ElementTitle = styled('div')`
    flex: 1 1 100px;
    padding: 0 15px;
`;

export const Rows = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid silver;
    width: 100vw;
    overflow-x: scroll;
    @media screen and (min-width: 768px){
        width: 700px;
    }
`;

export const InputContainer = styled('div')`
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 768px){
        display: block;
    }
`;