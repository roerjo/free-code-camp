var search = document.querySelector("input");
var xhr = new XMLHttpRequest();

search.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
        var searchTerm = search.value;
        xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&list=&indexpageids=1&gsrsearch=" + searchTerm);
        xhr.response = "json";
        xhr.send();
    }
});

xhr.onreadystatechange = function(e) {
    if (e.target.readyState === 4 && e.target.status === 200) {
        res = JSON.parse(e.target.response);
        console.log(res);
        var list = res.query.pageids;
        for (var i = 0; i < list.length; i++) {
            var link = document.createElement("a");
            var box = document.createElement("DIV");
            var heading = document.createElement("H1");
            var p = document.createElement("P");
            heading.innerHTML = res.query.pages[list[i]].title;
            p.innerHTML = res.query.pages[list[i]].extract;
            box.appendChild(heading);
            box.appendChild(p);
            link.href = "https://en.wikipedia.org/?curid=" + res.query.pages[list[i]].pageid;
            link.appendChild(box);
            document.getElementById("results").appendChild(link);
        }
    }
    else {
        console.log("Error:", xhr.status);
    }
};


