// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const numModelsInput = document.getElementById('numModels');
    const modelsFieldsDiv = document.getElementById('modelsFields');
    const pickupOption = document.getElementById('pickupOption');
    const pickupFields = document.getElementById('pickupFields');
    const confirmNumModelsButton = document.getElementById('confirmNumModels');

    function createModelFields(numModels) {
        modelsFieldsDiv.innerHTML = ''; // Limpiar campos anteriores

        for (let i = 1; i <= numModels; i++) {
            const modelFieldset = document.createElement('fieldset');
            modelFieldset.innerHTML = `
                <legend>Modelo de Pieza ${i}</legend>
                <label for="modelName${i}">Nombre del Producto:</label>
                <input type="text" id="modelName${i}" name="modelName${i}" required>

                <label for="modelDescription${i}">Descripción del Producto:</label>
                <textarea id="modelDescription${i}" name="modelDescription${i}" required></textarea>

                <label for="modelDimensions${i}">Dimensiones del Producto (superficie m²):</label>
                <input type="number" id="modelDimensions${i}" name="modelDimensions${i}" required step="0.01">

                <label for="modelColor${i}">Color del Producto:</label>
                <input type="color" id="modelColor${i}" name="modelColor${i}" required>

                <label for="modelQuantity${i}">Cantidad:</label>
                <input type="number" id="modelQuantity${i}" name="modelQuantity${i}" required min="1">

                <label for="modelFinish${i}">Acabado del Producto:</label>
                <select id="modelFinish${i}" name="modelFinish${i}" required>
                    <option value="fino">Fino</option>
                    <option value="medio">Medio</option>
                    <option value="grueso">Grueso</option>
                </select>

                <label for="modelSheen${i}">Tono del Producto:</label>
                <select id="modelSheen${i}" name="modelSheen${i}" required>
                    <option value="brillante">Brillante</option>
                    <option value="mate">Mate</option>
                    <option value="semimate">Semimate</option>
                </select>

                <label for="modelUsage${i}">Uso del Producto:</label>
                <select id="modelUsage${i}" name="modelUsage${i}" required>
                    <option value="interior">Interior</option>
                    <option value="exterior">Exterior</option>
                    <option value="alto_impacto">Condiciones de Alto Impacto</option>
                </select>
            `;
            modelsFieldsDiv.appendChild(modelFieldset);
        }
    }

    function togglePickupFields() {
        if (pickupOption.value === 'direccion') {
            pickupFields.style.display = 'block';
        } else {
            pickupFields.style.display = 'none';
        }
    }

    function calculateTotalPrice() {
        let totalPrice = 0;
        let modelsTotal = [];

        for (let i = 1; i <= numModelsInput.value; i++) {
            const quantity = parseInt(document.getElementById(`modelQuantity${i}`).value);
            const dimensions = parseFloat(document.getElementById(`modelDimensions${i}`).value);
            const usage = document.getElementById(`modelUsage${i}`).value;

            let pricePerPiece = 0;
            if (usage === 'interior') {
                pricePerPiece = 250;
            } else if (usage === 'exterior') {
                pricePerPiece = 300;
            } else if (usage === 'alto_impacto') {
                pricePerPiece = 350;
            }

            const modelTotal = quantity * dimensions * pricePerPiece;
            modelsTotal.push(modelTotal);

            totalPrice += modelTotal;
        }

        return { totalPrice, modelsTotal };
    }

    function showSummary() {
        const { totalPrice, modelsTotal } = calculateTotalPrice();
        const iva = totalPrice * 0.16;

        let modelsSummary = '';
        for (let i = 0; i < modelsTotal.length; i++) {
            modelsSummary += `<p>Total del Modelo ${i + 1}: $${modelsTotal[i].toFixed(2)}</p>`;
        }

        const summary = `
            <h2>Resumen del Pedido</h2>
            ${modelsSummary}
            <p>Total sin IVA: $${totalPrice.toFixed(2)}</p>
            <p>IVA (16%): $${iva.toFixed(2)}</p>
            <p>Total con IVA: $${(totalPrice + iva).toFixed(2)}</p>
            <p>En breve recibirá una llamada para confirmar y ajustar detalles.</p>
            <button id="confirmOrder">Confirmar Pedido</button>
            <button id="cancelOrder">Cancelar</button>
        `;

        const summaryWindow = window.open('', 'Pedido', 'width=400,height=400');
        summaryWindow.document.body.innerHTML = summary;

        summaryWindow.document.getElementById('confirmOrder').addEventListener('click', function() {
            alert('Pedido confirmado. Gracias por su compra.');
            summaryWindow.close();
        });

        summaryWindow.document.getElementById('cancelOrder').addEventListener('click', function() {
            summaryWindow.close();
        });
    }

    pickupOption.addEventListener('change', togglePickupFields);

    confirmNumModelsButton.addEventListener('click', function() {
        const numModels = parseInt(numModelsInput.value);
        createModelFields(numModels);
    });

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        showSummary();
    });
});

