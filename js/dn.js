google.load("feeds", "1");

function checkValid(url){
  var pattern = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(url);
}

function feedLoaded(result) {
  if (!result.error) {
    var container = document.getElementById("content");
    container.innerHTML = '';
    for (var i = 0; i < result.feed.entries.length; i++) {
      var entry = result.feed.entries[i];
      // create article > heading
      var article = document.createElement("article");
      var heading = document.createElement("heading");

      // create <a> and title
      var a = document.createElement("a");
      var linkText = document.createTextNode(entry.title);
      a.appendChild(linkText);

      // regex on entry.content for valid URL
      if (checkValid(entry.content)) {
        a.href = entry.content;
      }
      else {
        a.href = entry.link;
      }

      heading.appendChild(a);
      article.appendChild(heading);
      container.appendChild(article);
    }
  }
}

function OnLoad() {
  var feed = new google.feeds.Feed("https://news.layervault.com/?format=rss");
  feed.setNumEntries(20);
  feed.load(feedLoaded);
}

google.setOnLoadCallback(OnLoad);

var nodes = document.querySelectorAll("#logo, #refresh");

for (var i = 0; i < nodes.length; i++){
  nodes[i].addEventListener("click", function(event){
    location.reload();
  });
}