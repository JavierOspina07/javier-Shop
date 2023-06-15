function showDetailModal(db) {
  let modal = []

  /* Elementos del DOM */
  const productsDOM = document.querySelector('.product__container')
  const modalDOM = document.querySelector('.modal__container')

  
  /* Funciones */
  function printModal() {

    let htmlModal = ''
    if (product.length === 0) {
      htmlModal += `
      <div class="modal__emty">
        <i class='bx bxs-detail'></i>
        <p class="modal__empty--text">No hay productos en el carrito</p>
      </div>
      `
    } else {
      for (const item of modal) {
        const product = db.find(p => p.id === item.id)
        htmlModal += ` 
        <article class="modal__detail">
          <h2 class="modal__title">${product.name}</h2>
          <div class="modal__image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="modal__content">
            <p class="modal__paragraph">Description: ${product.description}</p>
            <span class="modal__price">Price: ${product.price}</span>
            <span class="modal__category">Category: ${product.category}</span>
            <span class="modal__quantity">Quantity: ${product.quantify}</span>
          </div>
        </article>
        `
      }

    }
    modalDOM.innerHTML = htmlModal
  }

  printModal()

  /* Eventos */

}


export default showDetailModal;