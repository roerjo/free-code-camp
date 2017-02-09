var quote = document.getElementById('quote');
var author = document.getElementById('author');
var xhr = new XMLHttpRequest();

xhr.open('GET','http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
xhr.responseType = 'json';
xhr.send(null);

xhr.onreadystatechange = function(e) {
    var DONE = 4;
    var OK = 200;
    if(xhr.readyState === DONE) {
        if(xhr.status === OK){
            quote.innerHTML = e.target.response.quoteText;
            author.innerHTML = e.target.response.quoteAuthor;
        }else 
        console.log('Error: ' + xhr.status);
    }
}; 

window.onload = function() {
    var newQuote = document.getElementById('newQuote');
    newQuote.addEventListener("click", function() {
        xhr.open('GET','http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
        xhr.responseType = 'json';
        xhr.send();
    });
}

var twit = document.getElementById('twitter');
twit.addEventListener("click", function() {
    twit.setAttribute("href", "https://twitter.com/intent/tweet?text="+encodeURIComponent(quote.innerHTML+" "+author.innerHTML));
});
