document.addEventListener("DOMContentLoaded", function() {
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || [];
    const summaryBody = document.getElementById("summary-body");
    const totalPriceElement = document.getElementById("total-price");

    
    function updateOrderSummary() {
        let total = 0;
        summaryBody.innerHTML = ""; 

        orderSummary.forEach(item => {
            const { product, quantity, price } = item;
            const totalItemPrice = quantity * price;
            total += totalItemPrice;

            const row = document.createElement("tr");

            const productCell = document.createElement("td");
            productCell.textContent = product;

            const quantityCell = document.createElement("td");
            quantityCell.textContent = quantity;

            const priceCell = document.createElement("td");
            priceCell.textContent = `LKR ${price.toFixed(2)}`;

            const totalCell = document.createElement("td");
            totalCell.textContent = `LKR ${totalItemPrice.toFixed(2)}`;

            row.appendChild(productCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            row.appendChild(totalCell);

            summaryBody.appendChild(row);
        });

        totalPriceElement.textContent = `LKR ${total.toFixed(2)}`;
    }

    
    updateOrderSummary();

    
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        const formattedDeliveryDate = deliveryDate.toDateString();

        document.getElementById("thank-you-message").style.display = "block";
        document.getElementById("delivery-date").textContent = formattedDeliveryDate;

        checkoutForm.style.display = "none";
        document.getElementById("order-summary").style.display = "none";

        localStorage.removeItem('orderSummary');
    });
});
