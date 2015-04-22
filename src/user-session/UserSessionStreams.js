'use strict';

import Kefir from 'kefir';

export const UserLoginSignal = Kefir.emitter();

export const UserLogoutSignal = Kefir.emitter();

let userSessionAuthenticationRequest = UserLoginSignal
  .map((/* userInput */) => {
    // ordinarily, this would be an ajax call
    // for the sake of simplicity, pretend it succeeded
    // and we would use `flatMapLatest` instead of `map`
    return {
      username: 'test@test.com',
      id: 404
    };
  });


export const UserSession = Kefir
  .merge([
    userSessionAuthenticationRequest,
    UserLogoutSignal.map(() => null)
  ])
  .toProperty(null);
