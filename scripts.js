// Menu items
const menuItems = [
    { name: 'Espresso', price: '$2.50', category: 'coffee', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Cappuccino', price: '$3.00', category: 'coffee', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Latte', price: '$3.50', category: 'coffee', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Bagel', price: '$1.99', category: 'food', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Croissant', price: '$2.50', category: 'food', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Chocolate Cake', price: '$3.99', category: 'desserts', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Cookies', price: '$2.00', category: 'desserts', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    // New items added
    { name: 'Mocha', price: '$3.75', category: 'coffee', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Blueberry Muffin', price: '$2.80', category: 'food', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
    { name: 'Cheesecake', price: '$4.25', category: 'desserts', image: 'C:/Users/Kanda/OneDrive/Desktop/NAN/assets/coffee-cup.png' },
];

// Function to render menu items
function renderMenu(filteredItems) {
    const menuDashboard = document.getElementById('menuDashboard');
    menuDashboard.innerHTML = ''; // Clear current menu
    
    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-image">
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p class="price">${item.price}</p>
        `;
        
        menuDashboard.appendChild(menuItem);
    });
}

// Function to search menu
function searchMenu() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(searchQuery));
    renderMenu(filteredItems);
}

// Function to filter menu by category
function filterMenu() {
    const category = document.getElementById('categoryFilter').value;
    
    let filteredItems;
    
    if (category === 'all') {
        filteredItems = menuItems;
    } else {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    renderMenu(filteredItems);
}

// Initial render
renderMenu(menuItems);
