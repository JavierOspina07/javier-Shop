function cart(db, printProducts) {
  let cart = []

  // Elementos del DOM
  const productsDOM = document.querySelector('.products__container')
  const notifyDOM = document.querySelector('.notify')
  const cartDOM = document.querySelector('.cart__body')
  const countDOM = document.querySelector('.cart__count--item')
  const totalDOM = document.querySelector('.cart__total--item')
  const checkoutDOM = document.querySelector('.btn--buy')

  // Funciones
  function printCart() {
    
    let htmlCart = ''

    if (cart.length === 0) {
      htmlCart += `
      <div class="cart__empty">
        <i class='bx bx-cart'></i>
        <p class="cart__empty--text">No hay productos en el carrito</p>
      </div>
      `
      notifyDOM.classList.remove('show--notify')
    } else {
      for (const item of cart) {
        const product = db.find(p => p.id === item.id)
        htmlCart += `
        <article class="article">
          <div class="article__image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="article__content">
            <h3 class="article__title">${product.name}</h3>
            <span class="article__price">${product.price}</span>
            <div class="article__quantity">
              <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                <i class='bx bx-minus'></i>
              </button>
              <span class="article__quantity-text">${item.qty}</span>
              <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                <i class='bx bx-plus'></i>
              </button>
            </div>
            <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
              <i class='bx bx-trash'></i>
            </button>
          </div>
        </article>
        `
      }
      notifyDOM.classList.add('show--notify')
    }

    cartDOM.innerHTML = htmlCart
    notifyDOM.innerHTML = showItemsCount()
    countDOM.innerHTML = showItemsCount()
    totalDOM.innerHTML = showTotal()
  }

  function addToCart(id, qty = 1) {

    const itemFinded = db.find(i => i.id === id)
    if (itemFinded && itemFinded.quantity > 0) {
      const item = cart.find(item => item.id === id)
      if (item) {
        if (checkStock (id, qty + item.qty)) {
          item.qty++
        } else {
          window.alert('No hay stock disponible')
        }
      } else {
        cart.push({id, qty})
      }
    }
    printCart()
  }

  function checkStock (id, qty) {
    const product = db.find(product => product.id === id)
    return product.quantity - qty >=0
  }

  function removeFromCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)
    const result = itemFinded.qty - qty

    if (result > 0) {
      itemFinded.qty -= qty
      
    } else {
      cart = cart.filter(i => i.id !== id)
    }

    printCart()
  }

  function deleteFromCart(id) {
    cart = cart.filter(i => i.id !== id)

    printCart()
  }

  function showItemsCount() {
    let suma = 0
    for (const item of cart) {
      suma += item.qty
    }
    return suma
  }

  function showTotal() {
    let total = 0
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      total += item.qty * productFinded.price
    }
    return total
  }

  function checkout() {

    if (cart.length === 0) {
      window.alert('No hay artículos en el carrito')
    } else {
      for (const item of cart) {
        const productFinded = db.find(p => p.id === item.id)
        productFinded.quantity -= item.qty
      }
  
      cart = []
      printCart()
      printProducts()
      window.alert('Gracias por su compra')
    }
  }

  printCart()

  // Eventos
  productsDOM.addEventListener('click', function (e) {
    
    if (e.target.closest('.add--to--cart')) {
      const id = +e.target.closest('.add--to--cart').dataset.id
      addToCart(id)
    }
  })

  cartDOM.addEventListener('click', function (e) {
    if (e.target.closest('.article--minus')) {
      const id = +e.target.closest('.article--minus').dataset.id
      removeFromCart(id)
    }

    if (e.target.closest('.article--plus')) {
      const id = +e.target.closest('.article--plus').dataset.id
      addToCart(id)
    }

    if (e.target.closest('.remove-from-cart')) {
      const id = +e.target.closest('.remove-from-cart').dataset.id
      deleteFromCart(id)
    }
  })

  checkoutDOM.addEventListener('click', function () {
    checkout()
  })

}

export default cart