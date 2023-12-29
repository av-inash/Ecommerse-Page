


import apiData from './ApiData.js';

function createCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');
  const shortenedTitle = product.title.length > 10 ? product.title.substring(0, 10) + '...' : product.title;
  card.innerHTML = `
          <img class="product-image" src="${product.image}" alt="${product.title}">
        ${product.badge_text ? `<div class="discount-badge">${product.badge_text}</div>` : ''}
          <div id="title">
            <div class="leftBox">
              <p>${shortenedTitle}</p>
            </div>
            <div class="rightBox">
              <p>${product.vendor}</p>
            </div>
          </div>
          <div class="price">
            <div class="newprice">
              <p>Rs ${product.price}</p>
            </div>
            <div class="oldPrice">
              <p>Rs<strike>${product.compare_at_price}</strike></p>
            </div>
            <div class="discount">
              <p>${calculateDiscountPercentage(product.price, product.compare_at_price)} % Off
            </div>
          </div>
          <button id="AddToCart">Add To Cart</button>
        `;
  return card;
}

function calculateDiscountPercentage(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}

function displayCards(category) {
  const cardContainer = document.getElementById('card-container');
  const categoryData = apiData.categories.find((cat) => cat.category_name.toLowerCase() === category.toLowerCase());

  if (categoryData) {
    // Clear existing cards
    cardContainer.innerHTML = '';

    categoryData.category_products.forEach((product) => {
      const card = createCard(product);
      cardContainer.appendChild(card);
    });
  } else {
    console.error('Category not found');
  }
}


document.getElementById('men-tab').addEventListener('click', () => displayCards('Men'));
document.getElementById('women-tab').addEventListener('click', () => displayCards('Women'));
document.getElementById('kids-tab').addEventListener('click', () => displayCards('Kids'));


displayCards('Men');
