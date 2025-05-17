// Dados completos do cardápio
const menuItems = [
    { id: 1, name: "Canjica (Mungunzá Doce)", price: 8.00, image: "assets/canjica.jpg", category: "doces" },
    { id: 2, name: "Pamonha", price: 7.50, image: "assets/pamonha.jpg", category: "doces" },
    { id: 3, name: "Bolo de Milho", price: 6.50, image: "assets/bolo-milho.jpg", category: "doces" },
    { id: 4, name: "Milho Cozido", price: 5.00, image: "assets/milho-cozido.jpg", category: "salgados" },
    { id: 5, name: "Curau de Milho", price: 6.00, image: "assets/curau.jpg", category: "doces" },
    { id: 6, name: "Arroz Doce", price: 7.00, image: "assets/arroz-doce.jpg", category: "doces" },
    { id: 7, name: "Cuscuz Nordestino", price: 6.50, image: "assets/cuscuz.jpg", category: "salgados" },
    { id: 8, name: "Pé de Moleque", price: 5.50, image: "assets/pe-moleque.jpg", category: "doces" },
    { id: 9, name: "Paçoca de Amendoim", price: 4.50, image: "assets/pacoca.jpg", category: "doces" },
    { id: 10, name: "Maçã do Amor", price: 8.00, image: "assets/maca-amor.jpg", category: "doces" },
    { id: 11, name: "Bolo de Mandioca", price: 6.00, image: "assets/bolo-mandioca.jpg", category: "doces" },
    { id: 12, name: "Cocada", price: 4.00, image: "assets/cocada.jpg", category: "doces" },
    { id: 14, name: "Pipoca", price: 3.50, image: "assets/pipoca.jpg", category: "salgados" },
    { id: 18, name: "Broa de Milho", price: 5.00, image: "assets/broa-milho.jpg", category: "doces" },
    { id: 19, name: "Tapioca", price: 6.00, image: "assets/tapioca.jpg", category: "salgados" },
    { id: 20, name: "Bolo de Fubá", price: 5.50, image: "assets/bolo-fuba.jpg", category: "doces" },
    { id: 21, name: "Bolo de Cenoura", price: 6.50, image: "assets/bolo-cenoura.jpg", category: "doces" },
    { id: 22, name: "Caldinho", price: 6.00, image: "assets/caldinho.jpg", category: "salgados" }
];

// Variáveis globais
let cart = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartCount();
    
    // Adiciona animação sequencial aos itens do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animação do header no scroll
    window.addEventListener('scroll', handleScroll);
});

// Animação do header no scroll
let lastScroll = 0;
function handleScroll() {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.navbar');
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
        header.classList.add('scrolled');
    } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}

// Renderiza o menu
function renderMenu(filterCategory = 'todos') {
    const menuGrid = document.getElementById('menu-grid');
    
    const filteredItems = filterCategory === 'todos' 
        ? menuItems 
        : menuItems.filter(item => item.category === filterCategory);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-price">R$ ${item.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i> Adicionar
                </button>
            </div>
        </div>
    `).join('');
}

// Filtra por categoria
function filterByCategory(category) {
    renderMenu(category);
    toggleSideMenu();
}

// Menu lateral
function toggleSideMenu() {
    document.getElementById('side-menu-overlay').classList.toggle('hidden');
    document.getElementById('side-menu').classList.toggle('hidden');
    document.querySelector('.menu-toggle').classList.toggle('active');
}

// Adiciona item ao carrinho
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    cart.push(item);
    updateCart();
    showNotification(`${item.name} adicionado ao carrinho!`);
}

// Remove item do carrinho
function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    updateCart();
    showNotification(`${removedItem.name} removido do carrinho`, 'warning');
}

// Atualiza o carrinho
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    
    updateCartCount();
}

// Atualiza o contador do carrinho
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// Alterna a visibilidade do carrinho
function toggleCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.classList.toggle('active');
}

// Vai para a página de checkout
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }
    
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    const pixAmountElement = document.getElementById('pix-amount');
    
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    orderTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    pixAmountElement.textContent = `R$ ${total.toFixed(2)}`;
    
    // Adiciona botão de confirmação de pagamento
    const pixInfo = document.querySelector('.pix-info');
    pixInfo.innerHTML += `
        <button id="confirm-payment" class="checkout-btn" style="margin-top: 20px;">
            <i class="fas fa-check-circle"></i> Pagamento Aprovado
        </button>
    `;
    
    document.getElementById('cart-overlay').classList.remove('active');
    document.getElementById('checkout-page').classList.add('active');
    
    // Adiciona evento ao botão de confirmação
    document.getElementById('confirm-payment').addEventListener('click', function() {
        generateVouchers();
        document.getElementById('checkout-page').classList.remove('active');
    });
}
// Volta para o menu
function backToMenu() {
    document.getElementById('checkout-page').classList.remove('active');
}

// Gera fichas virtuais
// Substitua a função generateVouchers por esta versão nova
function generateVouchers() {
    const vouchersGrid = document.getElementById('voucher-screen-grid');
    vouchersGrid.innerHTML = '';
    
    cart.forEach((item, index) => {
        const voucherCode = `FV-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        
        const voucher = document.createElement('div');
        voucher.className = 'voucher-screen-card';
        voucher.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Código:</strong> ${voucherCode}</p>
            <p><strong>Valor:</strong> R$ ${item.price.toFixed(2)}</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${voucherCode}" alt="QR Code">
            <p><strong>Validade:</strong> ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}</p>
        `;
        
        vouchersGrid.appendChild(voucher);
    });
    
    // Mostra a tela de vouchers
    document.getElementById('checkout-page').classList.remove('active');
    document.getElementById('voucher-screen').classList.add('active');
    
    // Limpa o carrinho
    cart = [];
    updateCart();
    updateCartCount();
}

// Adicione esta nova função para imprimir
function printAllVouchers() {
    const voucherScreen = document.getElementById('voucher-screen');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = voucherScreen.innerHTML;
    window.print();
    
    document.body.innerHTML = originalContents;
    document.getElementById('voucher-screen').classList.add('active');
}
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }
    
    // ... (mantenha o código existente de atualização dos itens)
    
    // Adiciona o botão de aprovação
    const pixInfo = document.querySelector('.pix-info');
    if (!document.getElementById('confirm-payment')) {
        pixInfo.innerHTML += `
            <button id="confirm-payment" class="checkout-btn" style="margin-top: 20px;">
                <i class="fas fa-check-circle"></i> Simular Pagamento Aprovado
            </button>
        `;
        
        document.getElementById('confirm-payment').addEventListener('click', generateVouchers);
    }
    
    document.getElementById('cart-overlay').classList.remove('active');
    document.getElementById('checkout-page').classList.add('active');
}

// Variável global para armazenar vouchers
let vouchers = [];

// Modifique a função generateVouchers
function generateVouchers() {
    // Salva os itens do carrinho como vouchers
    vouchers = [...cart];
    
    // Atualiza a exibição
    showVouchers();
    
    // Limpa o carrinho
    cart = [];
    updateCart();
    updateCartCount();
    
    // Mostra a tela de vouchers
    document.getElementById('checkout-page').classList.remove('active');
    document.getElementById('voucher-screen').classList.add('active');
}

// Nova função para mostrar vouchers
function showVouchers() {
    const vouchersGrid = document.getElementById('voucher-screen-grid');
    
    if (vouchers.length === 0) {
        vouchersGrid.innerHTML = `
            <div class="no-vouchers">
                <p>Nenhum voucher disponível ainda</p>
                <p>Faça uma compra para receber seus vouchers!</p>
            </div>
        `;
        return;
    }
    
    vouchersGrid.innerHTML = vouchers.map(item => `
        <div class="voucher-screen-card">
            <h3>${item.name}</h3>
            <div class="voucher-price">R$ ${item.price.toFixed(2)}</div>
            <img src="${item.image}" alt="${item.name}" style="max-height: 150px; width: auto; border-radius: 8px;">
        </div>
    `).join('');
}

// Nova função para voltar ao menu
function backToMenuFromVouchers() {
    document.getElementById('voucher-screen').classList.remove('active');
}

// Modifique a função goToCheckout no script.js
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!', 'error');
        return;
    }
    
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    const pixAmountElement = document.getElementById('pix-amount');
    
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    orderTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    pixAmountElement.textContent = `R$ ${total.toFixed(2)}`;
    
    // Remove qualquer botão de confirmação existente
    const existingBtn = document.getElementById('confirm-payment');
    if (existingBtn) existingBtn.remove();
    
    // Adiciona o novo botão de confirmação
    const pixInfo = document.querySelector('.pix-info');
    pixInfo.innerHTML += `
        <button id="confirm-payment" class="checkout-btn" style="margin-top: 20px;">
            <i class="fas fa-check-circle"></i> Simular Pagamento Aprovado
        </button>
    `;
    
    // Fecha o carrinho e abre o checkout
    document.getElementById('cart-overlay').classList.remove('active');
    document.getElementById('checkout-page').classList.add('active');
    
    // Adiciona evento ao novo botão
    document.getElementById('confirm-payment').addEventListener('click', function() {
        // Simula a aprovação do pagamento
        simulatePaymentApproval();
    });
}

// Nova função para simular aprovação de pagamento
function simulatePaymentApproval() {
    // Gera os vouchers
    generateVouchers();
    
    // Fecha a tela de checkout
    document.getElementById('checkout-page').classList.remove('active');
    
    // Mostra notificação
    showNotification('Pagamento aprovado! Vouchers gerados.', 'success');
}

// Adicione esta função para mostrar vouchers no menu lateral
// Atualize a função showVouchersInSideMenu
function showVouchersInSideMenu() {
    const sideMenu = document.querySelector('.side-menu');
    const categoryList = sideMenu.querySelector('.category-list');
    const existingOption = sideMenu.querySelector('.vouchers-option');
    
    if (!existingOption) {
        const li = document.createElement('li');
        li.className = 'vouchers-option';
        
        if (vouchers.length > 0) {
            li.innerHTML = `
                <a href="#" onclick="showVouchersScreen()">
                    <i class="fas fa-ticket-alt"></i> Meus Vouchers (${vouchers.length})
                </a>
            `;
        } else {
            li.innerHTML = `
                <a href="#" style="color: var(--text-light);">
                    <i class="fas fa-ticket-alt"></i> Sem Vouchers
                </a>
                <small style="display: block; padding-left: 28px; color: var(--text-light);">
                    Compre algo para receber vouchers!
                </small>
            `;
        }
        
        categoryList.prepend(li);
    } else {
        // Atualiza a opção existente
        if (vouchers.length > 0) {
            existingOption.innerHTML = `
                <a href="#" onclick="showVouchersScreen()">
                    <i class="fas fa-ticket-alt"></i> Meus Vouchers (${vouchers.length})
                </a>
            `;
        } else {
            existingOption.innerHTML = `
                <a href="#" style="color: var(--text-light);">
                    <i class="fas fa-ticket-alt"></i> Sem Vouchers
                </a>
                <small style="display: block; padding-left: 28px; color: var(--text-light);">
                    Compre algo para receber vouchers!
                </small>
            `;
        }
    }
}

// Atualize a função showVouchers
function showVouchers() {
    const vouchersGrid = document.getElementById('voucher-screen-grid');
    
    if (vouchers.length === 0) {
        vouchersGrid.innerHTML = `
            <div class="no-vouchers">
                <p>Nenhum voucher disponível ainda</p>
                <p>Faça uma compra para receber seus vouchers!</p>
            </div>
        `;
    } else {
        vouchersGrid.innerHTML = vouchers.map(item => `
            <div class="voucher-screen-card">
                <h3>${item.name}</h3>
                <div class="voucher-price">R$ ${item.price.toFixed(2)}</div>
                <img src="${item.image}" alt="${item.name}" class="voucher-image">
            </div>
        `).join('');
    }
    
    // Atualiza o menu lateral
    showVouchersInSideMenu();
}

// Nova função para mostrar a tela de vouchers
function showVouchersScreen() {
    showVouchers();
    document.getElementById('voucher-screen').classList.add('active');
    document.getElementById('side-menu-overlay').classList.add('hidden');
    document.getElementById('side-menu').classList.add('hidden');
    document.querySelector('.menu-toggle').classList.remove('active');
}

// Chame esta função no DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartCount();
    showVouchersInSideMenu();
    
    // ... (restante do código de inicialização)
});

// Imprime as fichas
function printVouchers() {
    window.print();
}

// Compartilha as fichas
function shareVouchers() {
    if (navigator.share) {
        navigator.share({
            title: 'Minhas Fichas Virtuais - Feira Gourmet',
            text: 'Confira minhas fichas virtuais para retirada dos produtos:',
            url: window.location.href
        }).catch(err => {
            console.log('Erro ao compartilhar:', err);
            showNotification('Não foi possível compartilhar', 'error');
        });
    } else {
        // Fallback para navegadores sem API de compartilhamento
        const textToCopy = `Minhas Fichas Virtuais:\n\n${cart.map(item => `- ${item.name} (R$ ${item.price.toFixed(2)})`).join('\n')}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Fichas copiadas para a área de transferência!', 'success');
        });
    }
}

// Mostra notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adiciona estilo dinâmico para notificações
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 4000;
}

.notification.show {
    opacity: 1;
    bottom: 30px;
}

.notification.success {
    background-color: #27ae60;
}

.notification.warning {
    background-color: #f39c12;
}

.notification.error {
    background-color: #e74c3c;
}
`;
document.head.appendChild(style);

function approve() {
    // Simula itens no carrinho para teste
    cart = [
        { id: 1, name: "Canjica (Mungunzá Doce)", price: 8.00 },
        { id: 3, name: "Bolo de Milho", price: 6.50 },
        { id: 5, name: "Curau de Milho", price: 6.00 }
    ];
    
    // Atualiza o carrinho
    updateCart();
    
    // Gera os vouchers automaticamente
    generateVouchers();
    
    // Mostra mensagem
    showNotification('Compra aprovada para teste! Vouchers gerados.', 'success');
}