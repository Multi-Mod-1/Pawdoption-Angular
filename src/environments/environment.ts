
// export const environment = {
//   production: false,
  
// };

import {default as auth} from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain: auth.domain,
    clientId: auth.clientId,
    redirectUri: window.location.origin,
  },
};