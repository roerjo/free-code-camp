function newRequest (user, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://wind-bow.gomix.me/twitch-api/streams/" + user);
  xhr.send();

  xhr.onreadystatechange = function(e) {
    if (e.target.readyState === 4 && e.target.status === 200) {
        callback.apply(e);
    }
    else {
        console.log("Error:", xhr.status);
    }
  };
}

function dataHandler () {
    var resp = JSON.parse(this.target.response);
    console.log(resp);

    if (resp.stream === null) {
    var box = document.createElement("div");
    var status = document.createElement("h4");
    var heading = document.createElement("h2");
    box.className = "stream";
    status.innerHTML = "Offline";
    heading.innerHTML = "Some loser";
    box.appendChild(status);
    box.appendChild(heading);
    document.getElementById("streamers").appendChild(box); 
} else {
	  
    var box = document.createElement("div");
    var status = document.createElement("h4");
    var logo = document.createElement("img");
    var heading = document.createElement("h2");
    var p = document.createElement("p");
    var link = document.createElement("a");
    box.className = "stream";
    status.innerHTML = resp.stream.stream_type;
    heading.innerHTML = resp.stream.channel.display_name;
    logo.src = resp.stream.channel.logo;
    p.innerHTML = resp.stream.channel.status;
    box.appendChild(status);
    box.appendChild(logo);
    box.appendChild(heading);
    box.appendChild(p);
    link.href = resp.stream.channel.url;
    link.innerHTML = "Link to stream";
    box.appendChild(link);
    document.getElementById("streamers").appendChild(box);   
}
}

var users = ["ESL_SC2", "OgamingSC2", "SnasGG"];

users.forEach(function(user) {
	newRequest(user, dataHandler);
});

var all = document.getElementById("all");
var online = document.getElementById("online");
var offline = document.getElementById("offline");

window.onload = function() {

var statuses = document.getElementsByClassName("stream");

all.onclick = function() {
	for (i=0;i<statuses.length;i++) {
		statuses[i].style.display = "block";
}
};

online.onclick = function() {
	for (i=0;i<statuses.length;i++) {

		if(statuses[i].childNodes[0].innerHTML == "live")
		statuses[i].style.display = "block";
		else
		statuses[i].style.display = "none";
}
};

offline.onclick = function() {
	for (i=0;i<statuses.length;i++) {

		if(statuses[i].childNodes[0].innerHTML != "live")
		statuses[i].style.display = "block";
		else
		statuses[i].style.display = "none";
}
};
};

