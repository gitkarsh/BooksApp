function init() {
    var button = document.getElementById("addButton");
    button.addEventListener('click', addBook);
    showBooks();
}

var arr = new Array();
function addBook() {
    if (inputSufficiency()) {
        getBook();
        arr.push({
            author: document.getElementById("Author").value,
            title: document.getElementById("Title").value,
            publisher: document.getElementById("Publisher").value,
        });

    }

    localStorage.setItem("localbooks", JSON.stringify(arr));
    showBooks();
}



function getBook() {
    var fromStr = localStorage.getItem("localbooks");
    if (fromStr != null)
        arr = JSON.parse(fromStr);
}

function showBooks() {
    getBook();
    var table = document.getElementById("book-table");
    var x = table.rows.length;
    while (--x) {
        table.deleteRow(x);
    }
    for (i = 0; i < arr.length; i++) {
        var newRow = table.insertRow(table.length),
            cell1 = newRow.insertCell(0),
            cell2 = newRow.insertCell(1),
            cell3 = newRow.insertCell(2),
            cell4 = newRow.insertCell(3),

            author = document.getElementById("Author").value,
            title = document.getElementById("Title").value,
            publisher = document.getElementById("Publisher").value;

        cell1.innerHTML = arr[i].author;
        cell2.innerHTML = arr[i].title;
        cell3.innerHTML = arr[i].publisher;
        cell4.innerHTML = "X";
        cell4.addEventListener('click', event => {
            var table = document.getElementById("book-table");
            var row = event.target.closest('tr');
            var id = row.rowIndex;
            console.log(id);
            row.remove();
            arr.splice(id - 1, 1);
            console.log(arr);
            localStorage.setItem("localbooks", JSON.stringify(arr));

        });

    }

}

function inputSufficiency() {

    var author = document.getElementById("Author").value;
    var title = document.getElementById("Title").value;
    var publisher = document.getElementById("Publisher").value;

    if (author == null || author == "", title == null || title == "", publisher == null || publisher == "") {
        alert("Field(s) cannot be empty!");
        return false;
    }
    return true;

}

function sortTable(n) {
    var table;
    table = document.getElementById("book-table");
    var rows, i, x, y, count = 0;
    var switching = true;
    var direction = "ascending";
    // Run loop until no switching is needed 
    while (switching) {
        switching = false;
        var rows = table.rows;
        //Loop through every row
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;
            // Compare 2 Rows
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            var xbar = isNaN(parseInt(x.innerHTML)) ? x.innerHTML.toLowerCase() : parseInt(x.innerHTML);
            var ybar = isNaN(parseInt(y.innerHTML)) ? y.innerHTML.toLowerCase() : parseInt(y.innerHTML);

            if (direction == "ascending") {

                // To Check for Row Switch
                if (xbar > ybar) {
                    Switch = true;
                    break;

                }


            } else if (direction == "descending") {

                // Check direction 
                if (xbar < ybar) {
                    Switch = true;
                    break;
                }
            }
        }
        if (Switch) {
            // Function to switch rows and mark switch as completed 
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            // Increase count for each switch 
            count++;
        } else {
            // Loop for Descending Order
            if (count == 0 && direction == "ascending") {
                direction = "descending";
                switching = true;
            }
        }
    }
}

var table = document.getElementById("book-table");