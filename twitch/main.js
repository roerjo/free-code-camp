function newRequest (user) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://wind-bow.gomix.me/twitch-api/users/" + user);
  xhr.send();

  xhr.onreadystatechange = function(e) {
    if (e.target.readyState === 4 && e.target.status === 200) {
            res = JSON.parse(e.target.response);
            console.log(res);
        }
        else {
            console.log("Error:", xhr.status);
        }
  };
}

newRequest('freeCodeCamp');
