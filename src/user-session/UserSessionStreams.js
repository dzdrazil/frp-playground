'use strict';

import Kefir from 'kefir';

export function UserSession() {
  let mod = {
    Login: null,
    Logout: null,
    Current: null
  };

  let loginStream = Kefir
    .stream(function(emitter) {
      mod.Login = emitter;
    })
    .valuesToErrors(x =>
      ({convert: x.username.length <= 3, error: 'Usernames must have 4 or more characters'}));

  let logoutStream = Kefir.stream(function(emitter) {
    mod.Logout = emitter;
  });

  mod.Current = Kefir.merge([
      loginStream.map(({username}) => ({username: username, id: 1})),
      logoutStream.map(() => null)
    ])
    .toProperty(() => null);

  return mod;
}
