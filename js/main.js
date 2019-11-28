var books;

fetch("https://api.myjson.com/bins/zyv02")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    data = json;
    books = data.books;
    console.log(books);
    spinner.style = "display:none";
    displayBooks(books);
    filter();
  })
  .catch(function(error) {
    console.log(error);
  });

function displayBooks(books) {
  var covers = document.getElementById("list-books");
  covers.innerHTML = "";
  books.sort(function(a, b) {
    return a.title - b.title;
  });

  for (i = 0; i < books.length; i++) {
    var flipCard = document.createElement("div");
    flipCard.setAttribute("class", "flip-card");

    var book = document.createElement("div");
    book.setAttribute("class", "flip-card-front");
    var cover = document.createElement("img");
    cover.src = books[i].cover;
    cover.alt = books[i].title;
    book.appendChild(cover);

    var back = document.createElement("div");
    back.setAttribute("class", "flip-card-back");
    var title = document.createElement("h3");
    title.textContent = books[i].title;
    var details = document.createElement("p");
    details.textContent = books[i].description;
    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-outline-light event");
    var link = document.createElement("a");
    link.textContent = "SHOW MORE";
    link.setAttribute("data-fancybox", "gallery");
    link.setAttribute("href", books[i].detail);
    button.appendChild(link);
    back.append(title, details, button);

    var flip = document.createElement("div");
    flip.setAttribute("class", "flip-card-inner");
    flip.append(book, back);
    flipCard.append(flip);

    covers.append(flipCard);
  }
}

function searchField() {
  var input = document.getElementById("input-search");
  var filter = input.value.toUpperCase();
  // var list = document.getElementById("list-books");
  var book = document.getElementsByClassName("flip-card-back");
  var title;
  var i;
  var txtValue;
  var cover = document.getElementsByClassName("flip-card");
  console.log(cover);

  for (i = 0; i < book.length; i++) {
    title = book[i].getElementsByTagName("h3")[0];
    txtValue = title.textContent || title.innerText;
    if (txtValue.toUpperCase().includes(filter)) {
      cover[i].style.display = "";
    } else {
      cover[i].style.display = "none";
    }
  }
}

function filter() {
  document
    .getElementById("input-search")
    .addEventListener("change", function() {
      searchField();
    });
}
