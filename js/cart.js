

let cart = {}; //cart

$.getJSON('goods.json', function(data){
  let goods = data;// all goods in array
  // console.log(goods);
  checkCart();
  // console.log(cart);

  showCart(); // swow goods on the page
  function showCart() {
    if(  $.isEmptyObject(cart)  ) {
      //cart is empty
      let out = "Cart is empty.Add goods to the cart <a href= index.html >main page</a>";
      $('#my-cart').html(out);
    }
    else {
    let out = "";
    for(let key in cart) {
      out += `<button class ='delete' data-art="${key}">X</button>`;
      out += `<img src = "${goods[key].image}" width ="48">`
      out += `${goods[key].name}`
      out += `<button class ='minus' data-art="${key}">-</button>`;
      out += `${cart[key]}`;
      out += `<button class ='plus' data-art="${key}">+</button>`;
      out += cart[key]*goods[key].cost;
      out += `<br>`;

      // out+= `${key}______${cart[key]} <br>`
    }
    $('#my-cart').html(out);
    $('.plus').on('click', plusGoods);
    $('.minus').on('click', minusGoods);
    $('.delete').on('click', deleteGoods);
    }
  }

  function plusGoods() {
    let articul = $(this).attr('data-art');
    cart[articul]++;//save cart in localStorage
    saveCartToLs();
    showCart();
  }

  function minusGoods() {
    let articul = $(this).attr('data-art');
    if(cart[articul]>1) {
    cart[articul]--;
    }
    else {
      delete cart[articul];
    }
    saveCartToLs();//save cart in localStorage
    showCart();
  }


  function deleteGoods() {
    let articul = $(this).attr('data-art');
    delete cart[articul];
    saveCartToLs();//save cart in localStorage
    showCart();
  }
});

function checkCart(){
  //check goods in localStorage
  if(localStorage.getItem('cart') != null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
};

function saveCartToLs() {
  localStorage.setItem('cart', JSON.stringify(cart));
};
