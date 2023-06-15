function showDetailModal(db) {
    
    /* Elementos del DOM */
    const productsDOM = document.querySelector('.product__container')
    const modal = document.querySelector('.modal')
    const modalDOM = document.querySelector('.modal__container')

    /* Funciones */
    function printModal(id) {
        let htmlModal = ''
        
            const product = db.find(p => p.id === id)

            if (product.length === 0) {
                htmlModal += `
                <div class="modal__emty">
                    <p class="modal__empty--text">No hay productos en el carrito</p>
                </div>
                `
            } else {
                htmlModal += ` 
                <article class="modal__detail">
                  <h2 class="modal__tittle">${product.name}</h2>
                  <div class="modal__image">
                    <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="modal__content">
                    <p class="modal__paragraph">Description: ${product.description}</p>
                    <span class="modal__price">Price: ${product.price}</span>
                    <span class="modal__category">Category: ${product.category}</span>
                    <span class="modal__quantify">Quantify: ${product.quantify}</span>
                    <button type="button" class="modal__close" data-id="${product.id}">
                      Cerrar Modal
                    </button>
                  </div>
                </article>
                `
            }
        modalDOM.innerHTML = htmlModal    
        
    }
}

export default showDetailModal