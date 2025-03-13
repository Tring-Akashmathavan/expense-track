import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  uri: "http://localhost:4000", // Replace with your GraphQL server URL
});

// Add authentication token to headers
const authLink = setContext((_, { headers }) => {
  // Get the token from local storage
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;