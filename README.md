# @requestnetwork/request-node

A request-node that uses request-chain-storage instead of ethereum-storage for the storage layer.

Request Nodes are the basic servers used to allow any user to communicate with the Request Network protocol, these servers abstract the complexity of the storage layer for the users. The users can easily create a request or execute an action on a request by sending messages to the Node.

The Request Node runs the two bottom layers of the Request Network protocol:

- **Data-access layer**: Indexes request transactions and batches them into blocks.
- **Storage layers**: Persists data from Data-access layer.

Therefore, the Node receives request transactions from users, batches them into blocks and persists them into the storage.

Once received by the Node, other request actors connecting to this Node can directly read the request transaction before it is persisted into the storage layer.

## Usage

The users can interact with a Request Node either by using the official [Client-side Library](/packages/request-client.js) or by sending manual HTTP requests to the API exposed by the server.

### API

The API has the following endpoints:

#### persistTransaction

Persists a request transaction and make it available for the other actors of the request.

```
POST /persistTransaction {BODY}
```

##### Body

| Field           | Type           | Description                                                                                 | Requirement   |
| --------------- | -------------- | ------------------------------------------------------------------------------------------- | ------------- |
| transactionData | {data: string} | Data of the request transaction from the [transaction layer](/packages/transaction-manager) | **Mandatory** |
| channelId       | string         | Channel used to group the transactions, a channel is used to represent a request            | **Mandatory** |
| topics          | string[]       | Topics to attach to the channel to allows the retrieval of the channel's transactions       | Optional      |

##### Example

```
curl \
	-d '{"channelId": "channelExample", "topics":["topicExample"], "transactionData":{"data": "someData"}}' \
	-H "Content-Type: application/json" \
	-X POST http://localhost:3000/persistTransaction
```

##### Success 200

| Field  | Type   | Description              |
| ------ | ------ | ------------------------ |
| meta   | Object | Metadata of the response |
| result | {}     | Empty object             |

##### Error

| Code | Description                                            |
| ---- | ------------------------------------------------------ |
| 422  | The input fields of the request are incorrect          |
| 500  | The persistTransaction operation from DataAccess fails |

#### getTransactionsByChannelId

Get list of transactions corresponding to a specified channel id.

```
GET /getTransactionsByChannelId?{PARAMETER}
```

##### Parameter

| Field               | Type                       | Description                                                            | Requirement   |
| ------------------- | -------------------------- | ---------------------------------------------------------------------- | ------------- |
| channelId           | string                     | Channel used to search for transactions                                | **Mandatory** |
| timestampBoundaries | {from: number, to: number} | Timestamps to search for transations in a specific temporal boundaries | Optional      |

##### Example

```
curl -i "http://localhost:3000/getTransactionsByChannelId?channelId=channelExample"
```

##### Success 200

| Field  | Type                     | Description              |
| ------ | ------------------------ | ------------------------ |
| meta   | Object                   | Metadata of the response |
| result | {transactions: string[]} | List of transaction      |

##### Error

| Code | Description                                                    |
| ---- | -------------------------------------------------------------- |
| 422  | The input fields of the request are incorrect                  |
| 500  | The getTransactionsByChannelId operation from DataAccess fails |

##### Note

Since the Node doesn't implement a cache yet, all transactions have to be retrieved directly on IPFS.
As a consequence, this request can take a long time if the topic requested indexes many transactions.
This delay will be optimized with the implementation of a cache.

#### getChannelsByTopic

Get transactions from channels indexed by a specified topic.

```
GET /getChannelsByTopic?{PARAMETER}
```

##### Parameter

| Field          | Type                       | Description                                                  | Requirement   |
| -------------- | -------------------------- | ------------------------------------------------------------ | ------------- |
| topic          | string                     | Topic used to search for channels                            | **Mandatory** |
| updatedBetween | {from: number, to: number} | Temporal boundaries when the channel has been lately updated | Optional      |

##### Example

```
curl -i "http://localhost:3000/getChannelsByTopic?topic=topicExample"
```

##### Success 200

| Field  | Type                                    | Description                                |
| ------ | --------------------------------------- | ------------------------------------------ |
| meta   | Object                                  | Metadata of the response                   |
| result | {transactions: {[channelId]: string[]}} | List of transaction indexed by channel ids |

##### Error

| Code | Description                                            |
| ---- | ------------------------------------------------------ |
| 422  | The input fields of the request are incorrect          |
| 500  | The getChannelsByTopic operation from DataAccess fails |

## License

[MIT](/LICENSE)
