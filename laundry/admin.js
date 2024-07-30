window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    const icon = document.getElementById('log');
    const log = document.getElementById('logout');
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
    }
    if (window.scrollY > 0) {
        if (log) log.style.display = 'none';
        if (icon) icon.style.display = 'block';
    } else {
        if (log) log.style.display = "block";
        if (icon) icon.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('important-form');
    const inputField = document.getElementById('idk');
    const priceField = document.getElementById('price');
    const result = document.querySelector('.dat');
    const clearButton = document.getElementById('clear');
    const messageResult = document.querySelector('.datam');
    const loggedIn = localStorage.getItem('loggedIn');

    console.log('Form:', form);
    console.log('Input Field:', inputField);
    console.log('Price Field:', priceField);
    console.log('Price List Table:', result);
    console.log('Clear Button:', clearButton);
    console.log('Message Table:', messageResult);

    if (form && inputField && priceField && result && clearButton && messageResult) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            const task = inputField.value.trim();
            const price = priceField.value.trim();

            if (task && price) {
                let items = JSON.parse(localStorage.getItem('priceList')) || [];
                items.push({ clothType: task, price: price });
                localStorage.setItem('priceList', JSON.stringify(items));
                inputField.value = '';
                priceField.value = '';
                renderList();
            }
        });

        function renderList() {
            const items = JSON.parse(localStorage.getItem('priceList')) || [];
            if (result) {
                result.innerHTML = items.length > 0
                    ? items.map((item, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.clothType}</td>
                            <td><span>₦</span> ${item.price}</td>
                            <td><button class="del" data-index="${index}">Delete</button></td>
                        </tr>
                    `).join('')
                    : '<tr><td colspan="4">No items found.</td></tr>';
            }
        }

        result.addEventListener('click', (event) => {
            if (event.target.classList.contains('del')) {
                const index = event.target.getAttribute('data-index');
                let items = JSON.parse(localStorage.getItem('priceList')) || [];
                items.splice(index, 1);
                localStorage.setItem('priceList', JSON.stringify(items));
                renderList();
            }
        });

        if (clearButton) {
            clearButton.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('priceList');
                renderList();
            });
        }

        if (loggedIn !== 'true') {
            window.location.href = 'login.html';
        }

        const logoutButton = document.getElementById('logout');
        const logButton = document.getElementById('log');

        if (logoutButton) {
            logoutButton.addEventListener('click', function () {
                localStorage.removeItem('loggedIn');
                window.location.href = 'login.html';
            });
        }

        if (logButton) {
            logButton.addEventListener('click', function () {
                localStorage.removeItem('loggedIn');
                window.location.href = 'login.html';
            });
        }

        function renderPriceLists() {
            try {
                const messageList = localStorage.getItem('messageLists');
                console.log('Message List from Local Storage:', messageList);
                const consist = messageList ? JSON.parse(messageList) : [];
                console.log('Parsed Message List:', consist);
        
                if (Array.isArray(consist)) {
                    if (consist.length > 0) {
                        messageResult.innerHTML = consist.map((item) => `
                            <tr>
                                <td>${item.person}</td>
                                <td>${item.gmail}</td>
                                <td>${item.response}</td>
                            </tr>
                        `).join('');
                    } else {
                        messageResult.innerHTML = '<tr><td colspan="3">No items found.</td></tr>';
                    }
                } else {
                    console.error('Parsed items is not an array:', consist);
                    messageResult.innerHTML = '<tr><td colspan="3">Error in data format.</td></tr>';
                }
            } catch (error) {
                console.error('Error rendering price lists:', error);
                if (messageResult) {
                    messageResult.innerHTML = '<tr><td colspan="3">Error loading data.</td></tr>';
                }
            }
        }
        
        

        renderPriceLists();

        const deleteButton = document.getElementById('delete');
        if (deleteButton) {
            deleteButton.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('messageList');
                renderPriceLists();
            });
        }
    } else {
        console.error('Some required elements are missing from the DOM.');
    }
});
