import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = (props:any) => {
  const navigate = useNavigate();

  // const domain:any = process.env.REACT_APP_AUTH0_DOMAIN;
  // const clientId:any = process.env.REACT_APP_AUTH0_CLIENT_ID;
  // const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

  const onRedirectCallback = (appState:any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={"dev-mujh303ammb4fy01.uk.auth0.com"} //TODO add to .env file(auth0 joseph's domain)
      clientId={"O94ycBixGyrF1fRoyebadt9aJf7MzyRA"} //TODO add to .env file(auth0 joseph's clientID)
      redirectUri={"http://localhost:5173/callback"}
      onRedirectCallback={onRedirectCallback}
      audience={"https://amaze-thing-dev.com"}
    >
     {props.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;