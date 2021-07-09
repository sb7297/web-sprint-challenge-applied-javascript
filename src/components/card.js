import axios from 'axios';
const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const divCard = document.createElement("div");
  divCard.classList.add("card");

  const divHeadline = document.createElement("div");
  divHeadline.classList.add("headline");
  divHeadline.textContent = article.headline;

  const divAuthor = document.createElement("div");
  divAuthor.classList.add("author");

  const divImgCon = document.createElement("div");
  divImgCon.classList.add("img-container");

  const img = document.createElement("img");
  img.src = article.authorPhoto;

  const spanAuthorName = document.createElement("span");
  spanAuthorName.textContent = `By ${article.authorName}`;

  divCard.appendChild(divHeadline);
  divCard.appendChild(divAuthor);
  divAuthor.appendChild(divImgCon);
  divAuthor.appendChild(spanAuthorName);
  divImgCon.appendChild(img);

  return divCard;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get("http://localhost:5000/api/articles").then(response => {
    const parent = document.querySelector(selector);
    Object.values(response.data.articles).forEach(articles => {
      articles.forEach(article => {
        const card = Card(article);
        parent.appendChild(card);
      });
    });
  });
}

export { Card, cardAppender }
