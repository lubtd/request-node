const request_chain_storage = require('request-chain-storage');

/**
 * Get the request chain storage with values from env
 * @returns request chain storage object
 */
export function getRequestChainStorage(): any {

  const requestChainOptionsTest = {
    restUrl: process.env.RCCLI_URL,
    chainId: process.env.CHAIN_ID,
    accountNumber: process.env.ACCOUNT_NUMBER,
    accountName: process.env.ACCOUNT_NAME,
    accountPassword: process.env.ACCOUNT_PASSWORD,
    accountAddress: process.env.ACCOUND_ADDRESS,
    gas: '200000',
  }

  return new request_chain_storage.RequestChainStorage(requestChainOptionsTest);
}
