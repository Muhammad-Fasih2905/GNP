import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persister, store } from './src/store/store';

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51Pyb9QP47LpK2aUh5zjhzeE7LLzAqxkkS2I0rmzeGFzCibxIfojhp0XxJlIvK3dOVO00bYVOZSPIivJj6X72NCDM00veMrXKE3">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Navigation />
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

export default App;
