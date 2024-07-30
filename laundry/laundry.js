// Sticky header on scroll
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Preloader functionality
const preLoad = document.querySelector('.preloader');
const body = document.querySelector('body');

window.addEventListener('load', () => {
    setTimeout(() => {
        body.style.overflowY = 'scroll';
        preLoad.classList.add('fadeOut');
    }, 3000);
});

// Scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const arrowButton = document.getElementById('arrow');

    // Show or hide the button based on scroll position
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            arrowButton.style.display = "block";
        } else {
            arrowButton.style.display = "none";
        }
    };

    // Scroll to the top of the document on button click
    arrowButton.addEventListener('click', function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});

// Render price list from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const result = document.querySelector('.dat');

    function renderPriceList() {
        const items = JSON.parse(localStorage.getItem('priceList')) || [];

        if (items.length > 0) {
            result.innerHTML = items.map((item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.clothType}</td>
                    <td><span>₦</span> ${item.price}</td>
                </tr>
            `).join('');
        } else {
            result.innerHTML = '<tr><td colspan="3">No items found.</td></tr>';
        }
    }

    // Initial render of the price list
    renderPriceList();
});

// Handle form submission and localStorage operations
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('for');
    const user = document.getElementById('name');
    const mail = document.getElementById('mail');
    const inform = document.getElementById('info');
    const successMessage = document.getElementById('success-message');
    const clear = document.getElementById('clear');

    if (form && user && mail && inform && successMessage && clear) {
        // Initialize messageList if it doesn't exist
        if (!localStorage.getItem('messageLists')) {
            localStorage.setItem('messageLists', JSON.stringify([]));
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const one = user.value.trim();
            const two = mail.value.trim();
            const three = inform.value.trim();

            if (one && two && three) {
                let items = JSON.parse(localStorage.getItem('messageLists')) || [];
                items.push({ person: one, gmail: two, response: three });
                localStorage.setItem('messageLists', JSON.stringify(items));

                user.value = '';
                mail.value = '';
                inform.value = '';

                successMessage.style.display = "block";
            }
        });

        clear.addEventListener('click', () => {
            successMessage.style.display = "none";
        });
    }
});
