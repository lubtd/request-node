import { LogTypes } from '@requestnetwork/types';
import { argv } from 'yargs';
import { modeType } from './logger';

/**
 * This contains default values used for the server and storage initialization
 * when environment variable is not specified
 */
const defaultValues: any = {
  ethereumStorage: {
   lastBlockNumberDelay: 10000,
   maxConcurrency: 5,
   persistTransactionTimeout: 600,
   retryDelay: 1000,
  },
  log: {
    level: LogTypes.LogLevel.INFO,
    mode: modeType.human,
  },
  server: {
    headers: '{}',
    port: 3000,
  },
};

/**
 * Get the port from command line argument, environment variables or default values to allow user to connect to the server
 * @returns the port to listen to connection on the server
 */
export function getServerPort(): number {
  return (
    (argv.port && Number(argv.port)) ||
    (process.env.PORT && Number(process.env.PORT)) ||
    defaultValues.server.port
  );
}

/**
 * Get custom headers as a JSON stringified object from command line argument, environment variables or default values
 * @returns an object with the custom headers to be set
 */
export function getCustomHeaders(): object {
  const headersString = argv.headers || (process.env.HEADERS || defaultValues.server.headers);

  try {
    return JSON.parse(headersString);
  } catch (e) {
    throw new Error('Custom headers must be a valid JSON object');
  }
}

/**
 * Get log configs: level and mode, from command line argument, environment variables or default values.
 * logLevel is the maximum level of messages we will log
 * logMode defines the log format to display: `human` is a more readable log, `machine` is better for parsing
 *
 * @returns the log level
 */
export function getLogConfig(): { logLevel: LogTypes.LogLevel; logMode: modeType } {
  return {
    logLevel:
      LogTypes.LogLevel[
        (argv.logLevel || process.env.LOG_LEVEL) as keyof typeof LogTypes.LogLevel
      ] || defaultValues.log.level,
    logMode:
      modeType[(argv.logMode || process.env.LOG_MODE) as keyof typeof modeType] ||
      defaultValues.log.mode,
  };
}

/**
 * Get the minimum delay between getLastBlockNumber calls
 *
 * @returns the minimum delay between last block number fetches
 */
export function getLastBlockNumberDelay(): number {
  return (
    argv.lastBlockNumberDelay ||
    process.env.LAST_BLOCK_NUMBER_DELAY ||
    defaultValues.ethereumStorage.lastBlockNumberDelay
  );
}

/**
 * Get the initialization storage (a json-like file) path.
 * @returns the path to the json-like file that stores the initialization data (ethereum metadata and transaction index).
 */
export function getInitializationStorageFilePath(): string | null {
  return (
    (argv.initializationStorageFilePath as string) ||
    process.env.INITIALIZATION_STORAGE_FILE_PATH ||
    null
  );
}

/**
 * Get the delay to wait before sending a timeout when performing a persistTransaction request
 * persistTransaction is called when a request is created or updated and need to wait for Ethereum to commit the transaction
 * PROT-300: This configuration value can be removed once batching is implenented
 * because there will be no more need to wait for the smart contract
 * @returns THe delay to wait for the timeout
 */
export function getPersistTransactionTimeout(): number {
  return (
    argv.persistTransactionTimeout ||
    process.env.PERSIST_TRANSACTION_TIMEOUT ||
    defaultValues.ethereumStorage.persistTransactionTimeout
  );
}

/**
 * Get the mnemonic from command line argument, environment variables or default values to generate the private key for the wallet
 * The default value must only be used for test purposes
 * For production, mnemonic should always be provided as environment variable
 * @returns the mnemonic for HDWallet
 */
export function getHelpMessage(): string {
  const message = `USAGE
    request-node - Node for request protocol v2

    yarn start <options>

    OPTIONS
      SERVER OPTIONS
        port (${defaultValues.server.port})\t\t\t\tPort for the server to listen for API requests
        headers (${
          defaultValues.server.headers
        })\t\t\t\tCustom headers to send with the API responses

      OTHER OPTIONS
        storageMaxConcurrency (${
          defaultValues.ethereumStorage.concurrency
        })\t\t\tMaximum number of concurrent calls to Ethereum or IPFS

        logLevel (${defaultValues.log.level})\t\t\tThe node log level (ERROR, WARN, INFO or DEBUG)
        logMode (${defaultValues.log.mode})\t\t\tThe node log mode (human or machine)

    EXAMPLE
      yarn start --port 5000 --networkId 1 --ipfsPort 6000

  All options are optional, not specified options are read from environment variables
  If the environment variable is not specified, default value is used
`;

  return message;
}
