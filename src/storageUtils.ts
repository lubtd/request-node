const request_chain_storage = require('request-chain-storage');

/**
 * Get the request chain storage with values from env
 * @returns request chain storage object
 */
export function getRequestChainStorage(): any {

  const requestChainOptionsTest = {
    restUrl: 'http://rccli:1317',
    chainId: 'wacken',
    accountNumber: '0',
    accountName: 'pierre',
    accountPassword: 'hahahaha',
    accountAddress: 'cosmos1en2n7qy77su9c8uw8hgecvfg8czdrfpu2x5qxl',
    gas: '200000',
  }

  return new request_chain_storage.RequestChainStorage(requestChainOptionsTest);
}
