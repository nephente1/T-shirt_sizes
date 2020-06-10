import * as React from 'react';
import { List } from './List';
import styled from '@emotion/styled';

const AppContainer = styled('div')`
    width: auto;
    @media screen and (min-width: 768px) {
        width: 700px;
    }
`;

export class App extends React.Component {
    render(){
        return (
            <AppContainer>
                <List />
            </AppContainer>
        );
    }
}
