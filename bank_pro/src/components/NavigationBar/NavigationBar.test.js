import React from 'react'    
import ReactDOM from 'react-dom'    
import NavigationBar from './NavigationBar'
import {MemoryRouter} from 'react-router-dom'
import Title from '../Title/Title'
import Cookies from "universal-cookie";
import { shallow } from 'enzyme';
import { expect } from 'chai';

const cookie = new Cookies()
cookie.remove("login")

describe('Navigation Bar Test', () => {
    it('renders on component it is assigned to', () => {
        const div = document.createElement('div')    
        ReactDOM.render(
            <MemoryRouter initialEntries={['/Title']}>
                <Title>
                    <NavigationBar />
                </Title>
            </MemoryRouter>
        , div)    
        ReactDOM.unmountComponentAtNode(div)    
    });

    it('has default input', () => {
        const wrapper = shallow(<NavigationBar />);
        expect(wrapper.state('loggedIn')).to.equal(false);
        expect(wrapper.state('cookie')).to.equal(undefined);
    });

    it('has different when state is set', () => {
        const wrapper = shallow(<NavigationBar />);
        wrapper.setState({loggedIn: true});
        wrapper.setState({cookie: undefined});
        expect(wrapper.state('loggedIn')).to.equal(true);
        expect(wrapper.state('cookie')).to.equal(undefined);
    });
});

