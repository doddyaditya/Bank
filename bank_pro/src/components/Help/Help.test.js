import React from 'react'    
import ReactDOM from 'react-dom'    
import Help from './Help'
import {MemoryRouter} from 'react-router-dom'


describe('Help', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')    
        ReactDOM.render(
            <MemoryRouter initialEntries={['/Help']}>
                <Help />
            </MemoryRouter>
        , div)    
        ReactDOM.unmountComponentAtNode(div)    
    });
});  