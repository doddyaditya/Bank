import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Login from './Login';

describe('Initial state', () => {
    it('has false login state with empty query', () => {
        const wrapper = mount (
            <MemoryRouter initialEntries={['/Login']}>
                <Login />
            </MemoryRouter>
        );
        const tested = wrapper.find('Login');
        expect(tested.state('loginFail')).to.equal(false);
    });

    it('has undefined status of login', () => {
        const wrapper = shallow (
            <Login />
        );
        expect(wrapper.state('status')).to.equal("");
    });

    it('changes the status of login and status', () => {
        const wrapper = shallow (
            <Login />
        );
        wrapper.setState({loginFail: true});
        wrapper.setState({status: "You fail"});
        expect(wrapper.state('loginFail')).to.equal(true);
        expect(wrapper.state('status')).to.equal("You fail");
    });

    it('submits form', () => {
        const wrapper = shallow (
            <Login />
        );
        const form = wrapper.find('form').first();
        form.simulate('submit');
        expect(wrapper.state('loginFail')).to.equal(false);
    });

    
});