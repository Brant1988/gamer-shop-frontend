import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import { persistor, store } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PersistGate persistor={persistor} loading={<LoadingSpinner />}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </PersistGate>
);
