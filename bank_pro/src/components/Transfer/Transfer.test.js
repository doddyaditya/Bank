import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Transfer from './Transfer';

describe('Initial state', () => {
    it('has false login state with empty query', () => {
        const wrapper = mount (
            <MemoryRouter initialEntries={['/Transfer']}>
                <Transfer />
            </MemoryRouter>
        );
        const tested = wrapper.find('Transfer');
        expect(tested.state('cookieId')).to.equal(undefined);
    });

    it('has undefined status of login', () => {
        const wrapper = shallow (
            <Transfer />
        );
        expect(wrapper.state('cookieId')).to.equal(undefined);
    });

    it('has can change the status of login', () => {
        const wrapper = shallow (
            <Transfer />
        );
        wrapper.setState({cookieId: 1});
        expect(wrapper.state('cookieId')).to.equal(1);
    });

    it('shows failed transfer', () => {
        const wrapper = shallow (
            <Transfer />
        );
        wrapper.setState({cookieId: 1, smShow: true, trfStatus: 4005, trfMessage: "Failed to update receiver account's data."});
        expect(wrapper.state('cookieId')).to.equal(1);
    });

    it('submits transfer', () => {
        const wrapper = shallow (
            <Transfer />
        );
        const form = wrapper.find('form').first();
        wrapper.setState({cookieId: 1});
        form.simulate('submit');
        expect(wrapper.state('cookieId')).to.equal(1);
    });
});