import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { RequestsProvider } from "./src/context/RequestsContext";

function App() {
  return (
    <RequestsProvider>
      <RootNavigator />
    </RequestsProvider>
  );
}

export default App;