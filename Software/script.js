document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productQuantityInput = document.getElementById('productQuantity');
    const productMeasureSelect = document.getElementById('productMeasure');
    const productPriceInput = document.getElementById('productPrice');
    const inventoryTableBody = document.querySelector('#inventoryTable tbody');
    const dialog = document.getElementById('lowStockDialog');
    const dialogProductName = document.getElementById('dialogProductName');
    const dialogCloseButton = document.getElementById('dialogCloseButton');

    let productId = 1;
    const lowStockThreshold = 5;

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addProduct(productNameInput.value, productQuantityInput.value, productMeasureSelect.value, productPriceInput.value);
        productForm.reset();
    });

    dialogCloseButton.addEventListener('click', function () {
        dialog.close();
    });

    function addProduct(name, quantity, measure, price) {
        const row = document.createElement('tr');
        row.dataset.productId = productId;

        // Atualizei para incluir a medida junto com a quantidade
        row.innerHTML = `
            <td>${name}</td>
            <td>${quantity} ${measure}</td>
            <td>R$ ${parseFloat(price).toFixed(2)}</td>
            <td class="actions">
                <button class="edit">Editar</button>
                <button class="delete">Excluir</button>
            </td>
        `;

        inventoryTableBody.appendChild(row);

        checkLowStock(name, quantity);
        productId++;

        row.querySelector('.delete').addEventListener('click', function () {
            row.remove();
        });

        row.querySelector('.edit').addEventListener('click', function () {
            editProduct(row);
        });
    }

    function checkLowStock(name, quantity) {
        if (quantity <= lowStockThreshold) {
            dialogProductName.textContent = name;
            dialog.showModal();
            placeOrder(name);
        }
    }

    function placeOrder(productName) {
        console.log(`IA: Iniciando nova encomenda para o produto: ${productName}`);
        // Lógica para encomendar automaticamente (simulação por enquanto)
    }

    function editProduct(row) {
        const name = row.children[0].textContent;
        const quantityMeasure = row.children[1].textContent;
        const [quantity, measure] = quantityMeasure.split(' ');
        const price = row.children[2].textContent.replace('R$ ', '');

        productNameInput.value = name;
        productQuantityInput.value = quantity;
        productMeasureSelect.value = measure;
        productPriceInput.value = price;

        row.remove();
    }

    const style = document.createElement('style');
    style.textContent = `
        dialog#lowStockDialog {
            border: none;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            background-color: #ffffff;
            color: #333;
        }
        dialog#lowStockDialog p {
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        dialog#lowStockDialog button {
            padding: 10px 20px;
            font-size: 1em;
            color: white;
            background-color: #4CAF50;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        dialog#lowStockDialog button:hover {
            background-color: #45a049;
        }
    `;
    document.head.appendChild(style);
});
