import React from 'react';
import { Text, TextInput } from "react-native";
import RootNavigator from './src/navigation/RootNavigator';
import { RequestsProvider } from "./src/context/RequestsContext";
import Toast from 'react-native-toast-message';

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.style = [{ fontFamily: "Inter-Regular" }, Text.defaultProps.style];

// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.style = [{ fontFamily: "Inter-Regular" }, TextInput.defaultProps.style];

function App() {
  return (
    <RequestsProvider>
      <RootNavigator />
      <Toast />
    </RequestsProvider>
  );
}

export default App;