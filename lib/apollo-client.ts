import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_DB_ENDPOINT,
  headers: {
    //@ts-ignore
    authorization: `Bearer ${process.env.TOKEN}`,
  },
  cache: new InMemoryCache(),
});

export default client;
