document.addEventListener("DOMContentLoaded", function() {
fetchUser()
fetchBooks()

});

const bookUl = document.querySelector(`#list`)
let allBooks;

function fetchUser() {
  let user;
  fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(users => {
    user = users[0]
  })
  userLiker(user)
}


function fetchBooks() {
  fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(books => {
    allBooks = books
    books.forEach(book => {
      renderBook(book)
    })
  })
}

function renderBook(book) {
  const bookLi = document.createElement(`li`)
  bookLi.dataset.id = book.id
  bookLi.innerHTML = `
  <img src=${book.img_url} class="book-image">
  <h2>${book.title}</h2>
  <p class="users">Liked by: ${book.users.map(user => user.username).join(', ')}</p>
  <button class="like-button"><3</button>
  <div class="description">${book.description}</div>
  `
  
  bookUl.append(bookLi)
}

bookUl.addEventListener("click", event => {
  if(event.target.className === "like-button") {
    console.log(user)
    

  if(event.target.className === "book-image") {
    const desc = event.target.parentElement.querySelector(".description")
    if(desc.style.display === "none") {
      desc.style.display = "inline-block"
    } else {
      desc.style.display = "none"
    }
  }
})

function userLiker(user) {
  fetch('http://localhost:3000/books/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({users: users.push(user) }),
      })
      .then(response => response.json())
      .then(console.log)
}
