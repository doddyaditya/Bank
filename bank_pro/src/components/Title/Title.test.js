import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import Title from './Title';

describe('Init state', () => {
    // Testing for empty route
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <Title />
            </MemoryRouter>
            , div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
    
    // Testing for title route
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter initialEntries={['/Title']}>
                <Title />
            </MemoryRouter>
            , div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
})