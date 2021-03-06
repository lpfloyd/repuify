'use strict'

import { expect } from 'chai'
import { repuify } from '../../src'
import { RepuProvider } from '../../src/provider'
const Web3 = require('web3')

describe('initialization', () => {
    it('init repuify should not throw error', () => {
        const web3 = new Web3()
        repuify(web3, 'http://localhost:8669', 0)
    })

    it('init repuify without host', () => {
        const web3 = new Web3()
        repuify(web3)

        expect(web3.currentProvider).to.have.property('RESTHost', 'http://localhost:8669')
        expect(web3.currentProvider).to.have.property('timeout', 0)
    })

    it('init repuify with timeout', () => {
        const web3 = new Web3();
        repuify(web3, 'http://localhost:8669', 10)

        expect(web3.currentProvider).to.have.property('timeout', 10);
    });

    it('providers should be RepuProvider', () => {
        const web3 = new Web3()
        repuify(web3)

        expect(web3.currentProvider instanceof RepuProvider).to.be.equal(true)
        expect(web3.eth.currentProvider instanceof RepuProvider).to.be.equal(true)
        expect(web3.eth.accounts.currentProvider instanceof RepuProvider).to.be.equal(true)
        expect(web3.eth.Contract.currentProvider instanceof RepuProvider).to.be.equal(true)
    })

})
