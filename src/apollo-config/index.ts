import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { logErrorMessages } from "@vue/apollo-util";
import { getMainDefinition } from "@apollo/client/utilities";

const errorLink = onError((error) => {
  if (process.env.NODE_ENV !== "production") {
    logErrorMessages(error);
  }

  if (
    error.response &&
    error.response.errors &&
    error.response.errors[0].message.match(/token/i)
  ) {
    localStorage.clear();

    window.location.replace(
      process.env.NODE_ENV === "development"
        ? import.meta.env.LOCAL_VITE_WEB_URL
        : import.meta.env.VITE_WEB_URL
    );

    // console.log("error", error.response.errors[0].message);
  }
});

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     )
//   },
//   new WebSocketLink({
//     uri: import.meta.env.VITE_WEBSOCKET_API_URL,
//     options: {
//       reconnect: true,
//       connectionParams: {
//         authToken: localStorage.getItem('token') || null
//       }
//     }
//   })
// )

const authHttpLink = from([
  new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("accessToken");
    const bearerToken = token ? `Bearer ${token}` : null;
    // @ts-ignore
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: bearerToken,
      },
    }));
    return forward(operation);
  }),
  new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? import.meta.env.LOCAL_VITE_API_URL
        : import.meta.env.VITE_API_URL,
  }),
]);

const apolloClient = new ApolloClient({
  link: errorLink.concat(authHttpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
