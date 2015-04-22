'use strict';

import * as UserSessionStreams from './UserSessionStreams';

let body = window.document.body;

////
//// Super-simple view functions
////
function showLogin() {
  body.innerHTML = `
    <form id="loginForm">
      Login<br>
      Username: <input name="username" /><br>
      <input type="submit" value="Submit" />
    </form>
  `;

  document.querySelector('#loginForm').onsubmit = function(e) {
    e.preventDefault();

    // ordinarily, gather up the form data and emit it into the login signal
    UserSessionStreams
      .UserLoginSignal.emit({});
  }
}

function showLogout(user) {
   body.innerHTML = `
    Hello ${user.username}! Perhaps you'd like to <a href id="logoutLink">Logout</a>?
  `;

  document.querySelector('#logoutLink').onclick = function(e) {
    e.preventDefault();
    UserSessionStreams
      .UserLogoutSignal.emit();
  }
}

///
/// Init
///
UserSessionStreams
  .UserSession.onValue(userSession => {
    if (userSession) showLogout(userSession);
    else showLogin();
  });
