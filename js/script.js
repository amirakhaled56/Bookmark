var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var boxinfo = document.getElementById("box-info")
var bookmarks = [];

var nameRegex = /^\w{3,}(\s+\w+)*$/; 
var urlRegex = /^(https?:\/\/)?(www\.)?\w+\.\w{2,}(\/[\w\-]+)*\/?$/; 


// Load existing bookmarks from local storage
if (localStorage.getItem("mybookmark")) {
    bookmarks = JSON.parse(localStorage.getItem("mybookmark"));
    displayBookmarks(bookmarks);
}

// Add a new bookmark with validation
function addBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteURL.value,
    };
    var isNameValid = validateInput("bookmarkName", nameRegex);
    var isURLValid = validateInput("bookmarkURL", urlRegex);
  
    if (isNameValid && isURLValid) {
     
        bookmarks.push(bookmark);
        localStorage.setItem("mybookmark", JSON.stringify(bookmarks));
        clearForm();
        displayBookmarks(bookmarks);
    } else {
        boxinfo.classList.remove("d-none")
    }
}

// Validate input fields
function validateInput(id, regex) {
    var element = document.getElementById(id);
    if (regex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}


// Clear input fields and reset validation
function clearForm() {
    siteName.value = "";
    siteURL.value = "";
    siteName.classList.remove("is-valid", "is-invalid");
    siteURL.classList.remove("is-valid", "is-invalid");
}

// Display bookmarks
function displayBookmarks(list) {
    var output = "";
    for (var i = 0; i < list.length; i++) {
        // Ensure the URL has a protocol
        var url = list[i].url;
        if (!url.match(/^(https?:\/\/)/)) {
            url = "https://" + url;
        }

        output += `
            <tr>
                <td>${i + 1}</td>
                <td>${list[i].name}</td>
                <td><a href="${url}" target="_blank" class="btn btn-success btn-sm">Visit</a></td>
                <td><button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm">Delete</button></td>
            </tr>`;
    }
    tableContent.innerHTML = output;
}
// Delete a bookmark
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("mybookmark", JSON.stringify(bookmarks));
    displayBookmarks(bookmarks);
}

// Search bookmarks by site name
function searchBookmark() {
    var searchKey = document.getElementById("search").value.toLowerCase();
    var filteredBookmarks = bookmarks.filter(bookmark =>
        bookmark.name.toLowerCase().includes(searchKey)
    );
    displayBookmarks(filteredBookmarks);
}

function closeModal() {
    boxinfo.classList.add("d-none");
}