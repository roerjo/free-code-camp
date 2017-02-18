var search = document.querySelector("input");
var xhr = new XMLHttpRequest();

search.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
        var searchTerm = search.value;
        xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + searchTerm);
        xhr.response = "json";
        xhr.send();
    }
});

xhr.onreadystatechange = function(e) {
    if (e.target.readyState === 4 && e.target.status === 200) {
        res = JSON.parse(e.target.response);
        console.log(res);
        var list = res.query.search;
        debugger;
        for (var i = 0; i < list.length; i++) {
            var box = document.createElement("DIV");
            var p = document.createElement("P");
            p.innerHTML = list[i].title;
            box.appendChild(p);
            document.getElementById("results").appendChild(box);
        }
    }
    else {
        console.log("Error:", xhr.status);
    }
};


