const request_chain_storage = require('request-chain-storage');

/**
 * Get the request chain storage with values from env
 * @returns request chain storage object
 */
export function getRequestChainStorage(): any {

  const requestChainOptionsTest = {
    restUrl: 'http://localhost:1317',
    chainId: 'wacken',
    accountNumber: '0',
    accountName: 'pierre',
    accountPassword: 'aaaaaaaa',
    accountAddress: 'cosmos1z9nmdk7emrr5h92hws8gmssy8zc6h0tx68awpp',
    gas: '200000',
  }

  return new request_chain_storage.RequestChainStorage(requestChainOptionsTest);
}
