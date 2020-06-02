//create variables for document elements
var lookupBook = document.getElementById("lookupBook");
var searchparm = document.getElementById("searchparm");
var details = document.getElementById("details");
var searcharr = [];
var bookarr = [];
//on click event, execute function lookupBook
lookupBook.addEventListener("click", function () {
    searchBooks = function (data) {
    //check if input empty or repeated
    if(searchparm.value===""||searchparm.value===" "||searcharr.includes(searchparm.value)){
        alert("Please enter book details/ new details");
    }
    else{
        var addButton = document.createElement("button");
        addButton.className = "add";
        var title = "";
        var author = "";
        var publisher = "";
        var bookimage = "";
        for (i = 0; i < data.items.length; i++) {
          //iterate through JSON object and display all books
            var book = data.items[i];
            title = ("<h4 class='container-item'>Title: " + book.volumeInfo.title + "</h4>");
            author = ("<h5 class='container-item'>Author: " + book.volumeInfo.authors + "</h5>");
            publisher = ("<h5 class='container-item'>Publisher: " + book.volumeInfo.publisher + "</h5>");
            bookimage = ("<img src = "+book.volumeInfo.imageLinks.smallThumbnail+"class='container-item'><br><button id='addButton' onclick='addBook()'class='add'></button></img>")
            details.innerHTML += title;
            details.innerHTML += author;
            details.innerHTML += publisher;
            details.innerHTML += bookimage;
            // var bookobj = {};
            // bookobj["title"] = book.volumeInfo.title;
            // bookobj["author"] = book.volumeInfo.author;
            // bookobj["publisher"] = book.volumeInfo.publisher;
            // bookarr.push(bookobj);
          }
          // console.log(data);
          
          
          searcharr.push(searchparm.value);
          //array to save search values and avoid repeated searches

          // bookarr.push();
          // console.log(bookarr);
        };
    }

  const script = document.createElement("script");
  script.src =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    searchparm.value +
    "&key=AIzaSyAnvqGpTfpnKImtQARBxHGwKoHAidbTDGs&callback=searchBooks"; // URL for the third-party library being loaded.
  script.id = "booksAPI"; // e.g., googleMaps or stripe
  script.async = true;
  document.querySelector("head").appendChild(script);
  //dynamically add script tag to fetch data
});

function addBook() {
//   var row = document.getElementById("bookrow");
//   row.appendChild(details);

    var row = document.getElementById("bookrow");
    var booktitle = bookarr[0]["title"] , bookauthor = bookarr[0]['author'] ;
    row.appendChild('<tr><td>'+booktitle.value+'</td><td>'+ bookauthor.value+'</td></tr>');
    console.log(booktitle);
    console.log(bookauthor);
}
