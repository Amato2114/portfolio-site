// Модальное окно для сертификатов
const modal = document.querySelector('.modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');
const modalClose = document.querySelector('.modal-close');

// Открытие модального окна для сертификатов с событием Google Analytics
document.querySelectorAll('.modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        modalTitle.textContent = btn.dataset.title;
        modalDesc.textContent = btn.dataset.desc;
        modalImg.src = btn.dataset.img;
        modalImg.alt = `Сертификат: ${btn.dataset.title}, 2024`;
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Событие Google Analytics для просмотра сертификата
        gtag('event', 'view_certificate', {
            'event_category': 'Certificates',
            'event_label': btn.dataset.title
        });
    });
});

// Закрытие модального окна
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
});

// Закрытие модального окна при клике вне контента
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
});

// Событие Google Analytics для скачивания резюме
document.querySelector('.cta-button').addEventListener('click', () => {
    gtag('event', 'download_resume', {
        'event_category': 'Resume',
        'event_label': 'Resume PDF'
    });
});

// События Google Analytics для ссылок портфолио
document.querySelectorAll('.portfolio-item a').forEach(link => {
    link.addEventListener('click', () => {
        gtag('event', 'click_portfolio', {
            'event_category': 'Portfolio',
            'event_label': link.parentElement.querySelector('h3').textContent
        });
    });
});

// Переключение вкладок в разделе "Резюме"
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        tabLinks.forEach(l => {
            l.classList.remove('active');
            l.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));
        link.classList.add('active');
        link.setAttribute('aria-selected', 'true');
        const tabId = link.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Фильтрация сертификатов
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        const filter = btn.dataset.filter;
        certificateCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Адаптивное бургер-меню
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
    const isOpen = navLinks.classList.contains('active');
    burger.setAttribute('aria-expanded', isOpen);
});

// Закрытие бургер-меню при клике на ссылку
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        burger.setAttribute('aria-expanded', 'false');
    });
});

// Закрытие бургер-меню при клике вне меню
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        burger.setAttribute('aria-expanded', 'false');
    }
});

// Обработка аккордеона в разделе "Опыт работы"
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.style.display === 'block';
        accordionHeaders.forEach(h => {
            h.nextElementSibling.style.display = 'none';
            h.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            content.style.display = 'block';
            header.setAttribute('aria-expanded', 'true');
        }
    });
});
