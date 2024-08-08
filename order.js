

document.addEventListener("DOMContentLoaded", function() {
    const products = {
        Apple: 300, 
        Banana: 100,
        Orange: 250,
        Grape: 500,
        Mango: 400,
        Strawberry: 600,
        Carrot: 120,
        Broccoli: 250,
        Spinach: 180,
        Tomato: 90,
        Cucumber: 80,
        Potato: 60,
        Milk: 200, 
        Cheese: 150, 
        Yogurt: 100, 
        Butter: 150, 
        Cream: 400, 
        "Cottage Cheese": 120, 
        Chicken: 450,
        Beef: 650,
        Salmon: 1200,
        Shrimp: 1500,
        Flour: 50, 
        Sugar: 40, 
        "Baking Powder": 100, 
        "Olive Oil": 1500, 
        Salt: 20, 
        Vinegar: 200 
    };

    const summaryBody = document.getElementById("summary-body");
    const totalPriceElement = document.getElementById("total-price");
    let total = 0;

    function updateTotal() {
        totalPriceElement.textContent = `LKR ${total.toFixed(2)}`;
    }

    function addToCart(product, quantity) {
        const pricePerUnit = products[product];
        const totalPrice = pricePerUnit * quantity;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product}</td>
            <td>${quantity}</td>
            <td>LKR ${pricePerUnit.toFixed(2)}</td>
            <td>LKR ${totalPrice.toFixed(2)}</td>
            <td><button type="button" class="remove-from-cart">Remove</button></td>
        `;

        summaryBody.appendChild(row);
        total += totalPrice;
        updateTotal();

        row.querySelector(".remove-from-cart").addEventListener("click", function() {
            const totalPriceToRemove = parseFloat(row.cells[3].textContent.replace('LKR ', ''));
            total -= totalPriceToRemove;
            updateTotal();
            row.remove();
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const product = button.dataset.product;
            const input = button.closest("tr").querySelector("input[type=number]");
            const quantity = parseFloat(input.value);

            if (quantity > 0) {
                addToCart(product, quantity);
                input.value = ""; 
            } else {
                alert("Please enter a valid quantity.");
            }
        });
    });

   
    document.getElementById("add-to-favorites").addEventListener("click", function() {
        const favoriteOrder = [];
        summaryBody.querySelectorAll("tr").forEach(row => {
            const product = row.cells[0].textContent;
            const quantity = row.cells[1].textContent;
            favoriteOrder.push({ product, quantity });
        });

        if (favoriteOrder.length > 0) {
            localStorage.setItem("favoriteOrder", JSON.stringify(favoriteOrder));
            alert("Order saved as favorite.");
        } else {
            alert("No items in the cart to save as favorite.");
        }
    });

   
    document.getElementById("apply-favorites").addEventListener("click", function() {
        const favoriteOrder = JSON.parse(localStorage.getItem("favoriteOrder"));

        if (favoriteOrder) {
            summaryBody.innerHTML = ""; 
            total = 0; 

            favoriteOrder.forEach(item => {
                addToCart(item.product, parseFloat(item.quantity));
            });

            alert("Favorite order applied.");
        } else {
            alert("No favorite order found.");
        }
    });

    
    document.getElementById("buy-now").addEventListener("click", function() {
        const currentOrder = [];
        summaryBody.querySelectorAll("tr").forEach(row => {
            const product = row.cells[0].textContent;
            const quantity = parseFloat(row.cells[1].textContent);
            const price = parseFloat(row.cells[2].textContent.replace('LKR ', ''));
            currentOrder.push({ product, quantity, price });
        });
    
        
        localStorage.setItem('orderSummary', JSON.stringify(currentOrder));
    
        
        window.location.href = "checkout.html"; 
    });;
});
