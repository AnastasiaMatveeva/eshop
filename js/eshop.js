let cart = {}; //my cart

$('document').ready(function(){
  loadGoods();
  checkCart();
});
function loadGoods() {
  //added goods on the page
  $.getJSON('goods.json', function(data) {
    let out = "";
    for (let key in data) {
      out += `<div class = "single-goods">`;
      out +=`<p> ${data[key]['name']} </p>`;
      out += `<p> Цена: ${data[key]['cost']} </p>`;
      out += `<img src ="${data[key].image}">`;
      out += `<button class = "add-to-cart" data-art =${key}>Купить</button>`;
      out += `</div>`;
    }
    $('#goods').html(out);
    $('button.add-to-cart').on('click', addToCart);
  });
}

function addToCart() {
  //added goods to cart
  let articul = $(this).attr('data-art');
  if(cart[articul] !=undefined) {
    cart[articul]++;
  }
  else {
    cart[articul] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showMiniCart()
}

function checkCart(){
  //check goods in localStorage
  if(localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function showMiniCart(){
  //show cart content
  let out ='';
  for(let w in cart) {
    out += `${w} _____ ${cart[w]}<br/>`;
  }
  out += "<a href =cart.html>Cart</a>"
  $('#mini-cart').html(out);
}
