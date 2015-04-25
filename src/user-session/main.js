'use strict';

import {UserSession} from './UserSessionStreams';

let User = UserSession();

let body = window.document.body;

////
//// Super-simple view functions
////
function showLogin() {
  body.innerHTML = `
    <form id="loginForm">
      Login<br>
      Username: <input id="username" name="username" /><br>
      <input type="submit" value="Submit" />
    </form>
  `;

  document.querySelector('#loginForm').onsubmit = function(e) {
    e.preventDefault();

    // ordinarily, gather up the form data and emit it into the login signal
    User
      .Login
      .emit({username: this.username.value});
  }
}

function showLogout(user) {
   body.innerHTML = `
    Hello ${user.username}! Perhaps you'd like to <a href id="logoutLink">Logout</a>?
  `;

  document.querySelector('#logoutLink').onclick = function(e) {
    e.preventDefault();
    User
      .Logout
      .emit();
  }
}

///
/// Init
///
User
  .Current
  .onValue(userSession => {
    if (userSession) showLogout(userSession);
    else showLogin();
  })
  .onError(e => alert(e));
