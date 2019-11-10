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
    accountAddress: 'cosmos1vfpdz6wpyq7f6qw843t2qehqmf42f2fuc7u9n3',
    gas: '200000',
  }

  return new request_chain_storage.RequestChainStorage(requestChainOptionsTest);
}
