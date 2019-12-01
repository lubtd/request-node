const request_chain_storage = require('request-chain-storage');

/**
 * Get the request chain storage with values from env
 * @returns request chain storage object
 */
export function getRequestChainStorage(): any {

  const requestChainOptionsTest = {
    restUrl: 'http://rccli:1317',
    chainId: 'wacken',
    accountNumber: '1',
    accountName: 'perrine',
    accountPassword: 'hahahaha',
    accountAddress: 'cosmos1xnvwlt8zh6s0gg9vnxw2yj2vxdn070kt7v9akf',
    gas: '200000',
  }

  return new request_chain_storage.RequestChainStorage(requestChainOptionsTest);
}
