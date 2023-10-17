# Motorhead and Redis LLM Chat example

[Motorhead](https://github.com/getmetal/motorhead) is an LLM chat memory server that leverages Redis to offer a variety of features essential for chat applications. It facilitates the concurrent management of context windows for multiple users, enabling the maintenance of an ongoing conversation with individual context awareness.

Motorhead simplifies the storage and indexing of messages through easy-to-use APIs, allowing chat applications to retain a long-term memory. This is further augmented with the capability to retrieve indexed messages using Redis' [vector similarity search](https://redis.com/solutions/use-cases/vector-database/), enhancing the chat experience by providing relevant and contextually aware responses.

## Prerequisites

Ensure you have the following software installed on your system:

* Docker
* Node.js (v16 or later)
* npm (v7 or later)

## Setup.

### Step 1: Obtain an OpenAI API Key

* Get an OpenAI API key from the [OpenAI Developer Platform](https://platform.openai.com/account/api-keys).


### Step 2: Configure Environment Variables

* Create a `.env` file in the root of the directory with your key:
```
OPENAI_API_KEY=sk_...
```

* Duplicate the `.env` file and move it to the chatbot directory, renaming it to `.env.local`.

### Step 3: Run Services with Docker

* Run `docker-compose up` to run Motorhead and Redis.


### Step 4: Install Dependencies and Run the Chatbot

* In a separate terminal `cd chatbot && npm i`

* After all the dependencies are installed, run `npm run dev` 

* Go to `localhost:3000` in your browser and start chatting!

