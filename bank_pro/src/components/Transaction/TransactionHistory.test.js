import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import TransactionHistory from './TransactionHistory';

describe('Initial state', () => {
    it('has undefined status of login', () => {
        const wrapper = shallow (
            <TransactionHistory />
        );
        chai.expect(wrapper.state('data')).to.be.empty;
        chai.expect(wrapper.state('balance')).to.be.empty;
        chai.expect(wrapper.state('virtual')).to.be.empty;
        chai.expect(wrapper.state('transaksi')).to.be.empty;
    });

    it('shows transaction history', () => {
        const wrapper = shallow (
            <TransactionHistory />
        );
        wrapper.setState({balance: 1000});
        chai.expect(wrapper.state('balance')).to.equal(1000);
    });
});