import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

describe('Test without cookie', () => {
    // Testing for render
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router />
            , div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
})

describe('Test with cookie', () => {
    it('renders without crashing too', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router />
            , div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
})