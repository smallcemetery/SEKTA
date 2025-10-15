<script>
    // Инициализация
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    feather.replace();

    // Функциональность вкладок
    function initializeTabs() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок и контента
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('border-blue-400', 'text-blue-400');
                    btn.classList.add('border-transparent', 'text-gray-500');
                });
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Добавляем активный класс текущей кнопке и контенту
                this.classList.remove('border-transparent', 'text-gray-500');
                this.classList.add('border-blue-400', 'text-blue-400');
                
                const tabId = this.dataset.tab;
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }

    // Смена основного изображения
    function changeMainImage(src, element) {
        const mainImage = document.getElementById('main-image');
        if (mainImage) {
            mainImage.src = src;
        }
        
        // Обновляем активную миниатюру
        document.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
            thumb.classList.remove('selected-thumbnail');
        });
        if (element) {
            element.classList.add('selected-thumbnail');
        }
    }

    // Выбор размера
    function initializeSizeSelection() {
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('selected-size');
                });
                this.classList.add('selected-size');
            });
        });
    }

    // Управление количеством
    function initializeQuantityControl() {
        let quantity = 1;
        const quantityElement = document.querySelector('.quantity');
        const minusButton = document.querySelector('.quantity-minus');
        const plusButton = document.querySelector('.quantity-plus');

        if (!quantityElement || !minusButton || !plusButton) return;

        minusButton.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
            }
        });

        plusButton.addEventListener('click', function() {
            quantity++;
            quantityElement.textContent = quantity;
        });
    }

    // Добавление в корзину
    function initializeAddToCart() {
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        if (!addToCartBtn) return;

        addToCartBtn.addEventListener('click', function() {
            const selectedSize = document.querySelector('.selected-size');
            if (!selectedSize) {
                alert('Пожалуйста, выберите размер');
                return;
            }

            const quantityElement = document.querySelector('.quantity');
            const quantity = quantityElement ? parseInt(quantityElement.textContent) : 1;

            const product = {
                id: 'pajama-1',
                name: 'Пижама "Нежность"',
                price: 2990,
                size: selectedSize.textContent,
                quantity: quantity,
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            };

            addToCart(product);
            showNotification('Товар добавлен в корзину!');
        });
    }

    // Рейтинг в отзывах
    function initializeStarRating() {
        document.querySelectorAll('.star-rating').forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                const stars = document.querySelectorAll('.star-rating');
                
                stars.forEach((starElement, index) => {
                    if (index < rating) {
                        starElement.classList.add('text-yellow-400');
                        starElement.classList.remove('text-gray-300');
                    } else {
                        starElement.classList.remove('text-yellow-400');
                        starElement.classList.add('text-gray-300');
                    }
                });
            });
        });
    }

    // Функции корзины
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => 
            item.id === product.id && item.size === product.size
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += product.quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Инициализация миниатюр галереи
    function initializeGalleryThumbnails() {
        document.querySelectorAll('.gallery-thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    changeMainImage(img.src.replace('/200x200/', '/1200x630/'), this);
                }
            });
            
            // Активируем первую миниатюру при загрузке
            if (index === 0) {
                thumb.classList.add('selected-thumbnail');
            }
        });
    }

    // Инициализация при загрузке
    document.addEventListener('DOMContentLoaded', function() {
        // Проверяем наличие необходимых элементов перед инициализацией
        updateCartCount();
        
        // Инициализируем компоненты только если они есть на странице
        if (document.querySelector('.tab-button')) {
            initializeTabs();
            // Активируем первую вкладку по умолчанию
            const firstTab = document.querySelector('.tab-button');
            if (firstTab) {
                firstTab.click();
            }
        }
        
        if (document.querySelector('.gallery-thumbnail')) {
            initializeGalleryThumbnails();
        }
        
        if (document.querySelector('.size-option')) {
            initializeSizeSelection();
        }
        
        if (document.querySelector('.quantity')) {
            initializeQuantityControl();
        }
        
        if (document.querySelector('.add-to-cart-btn')) {
            initializeAddToCart();
        }
        
        if (document.querySelector('.star-rating')) {
            initializeStarRating();
        }
        
        // Инициализируем мобильное меню если есть кнопка меню
        const mobileMenuButton = document.querySelector('[onclick*="toggleMobileMenu"]');
        if (mobileMenuButton) {
            // Убираем inline обработчик и добавляем через JS
            mobileMenuButton.removeAttribute('onclick');
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
        }
    });

    // Функция мобильного меню (добавляем если её нет)
    function toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('open');
        }
    }

    // Обработчик для кликов вне мобильного меню
    document.addEventListener('click', function(event) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuButton = document.querySelector('[onclick*="toggleMobileMenu"]');
        
        if (mobileMenu && mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(event.target) && 
            !menuButton.contains(event.target)) {
            mobileMenu.classList.remove('open');
        }
    });

    // Предотвращаем закрытие меню при клике внутри него
    document.addEventListener('click', function(event) {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.contains(event.target)) {
            event.stopPropagation();
        }
    });
</script>