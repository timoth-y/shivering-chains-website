import React, { useState, createRef } from 'react';
import { Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { AppStyles, AppTheme } from './framework/theme/Theme';
import Nav from "./framework/components/navigation/Nav"
import { SubstrateContextProvider, useSubstrate } from './infrastructure/substrate';
import { DeveloperConsole } from './framework/components/substrate';
import AccountSelector from './framework/components/substrate/AccountSelector';
import { ThemeProvider } from '@mui/styles';
import CreatorPage from './framework/pages/Creator';


function Main() {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState, apiError } = useSubstrate();
  const theme = AppTheme();
  const classes = AppStyles();
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const loader = (text: string) =>
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>;

  const message = (err: Error) =>
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message negative compact floating
          header='Error Connecting to Substrate'
          content={`${JSON.stringify(err, null, 4)}`}
        />
      </Grid.Column>
    </Grid>;

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader('Loading accounts (please review any extension\'s authorization)');
  }

  console.log(accountAddress);
  const contextRef = createRef<HTMLDivElement>();

  return (
    <ThemeProvider theme={theme}>
      <div ref={contextRef} className={classes.root} >
        <Nav>
          <AccountSelector setAccountAddress={setAccountAddress} />
        </Nav>
        <CreatorPage accountPair={accountPair} />
        <DeveloperConsole />
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
