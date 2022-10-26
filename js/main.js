document.addEventListener('DOMContentLoaded', function () {
    //Главный слайдер
    const hero = new Swiper('.hero-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
        },
        speed: 1000,
    });


    //Слайдер о нас
    const about = new Swiper('.about-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    //Галерея загрузить еще
    let photoMore = document.getElementById('photo-more');
    photoMore.addEventListener('click', function () {
        let invisibles = document.querySelectorAll('.photogalery__invisible');
        invisibles.forEach(invisible => {
            invisible.classList.toggle('active');
        });
        if (photoMore.textContent.trim() === 'Загрузить ещё') {
            photoMore.textContent = 'Скрыть';
        } else {
            photoMore.textContent = 'Загрузить ещё'
        }
    })


    //Карта
    var myMap;
    // Дождёмся загрузки API и готовности DOM.
    ymaps.ready(init);

    function init() {
        myMap = new ymaps.Map('map', {
            center: [55.76, 37.64], // Москва
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
    }

    //Фиксированная шапка
    let fixedHeader = document.getElementById('fixedHeader');
    let headerHeight = document.querySelector('header');

    document.addEventListener('scroll', () => {
        let scrollPage = window.pageYOffset;
        if (scrollPage > headerHeight.clientHeight && !fixedHeader.classList.contains('active')) {
            fixedHeader.classList.add('active');
        } else if (scrollPage < headerHeight.clientHeight && fixedHeader.classList.contains('active')) {
            fixedHeader.classList.remove('active');
        }
    })


    //Больше акций
    let moreStock = document.getElementById('more-stock');
    let stockCardInvisibles = document.querySelectorAll('.stock__infvisible');

    moreStock.addEventListener('click', () => {
        stockCardInvisibles.forEach(el => {
            el.classList.toggle('active');
        })
        if (moreStock.textContent.trim() === 'Посмотреть другие акции') {
            moreStock.textContent = 'Скрыть другие акции';
        } else if (moreStock.textContent.trim() === 'Скрыть другие акции') {
            moreStock.textContent = 'Посмотреть другие акции';
        }
    })


    //Модалки акции

    let stockBtns = document.querySelectorAll('.stock__more');
    stockBtns.forEach(el => {
        el.addEventListener('click', function () {
            let modal = document.getElementById(el.dataset.modal);
            modal.classList.add('popup__opened');
        })
    })

    let modalCloses = document.querySelectorAll('.popup__close');
    modalCloses.forEach(el => {
        el.addEventListener('click', function () {
            el.parentNode.parentNode.classList.remove('popup__opened');
        })
    })

    window.addEventListener('click', e => { // при клике в любом месте окна браузера
        const target = e.target // находим элемент, на котором был клик
        if (!target.closest('popup__container')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
            stockBtns.forEach(el => {
                el.classList.remove('popup__opened');
                console.log('asd')
            })
        }
    })


    //Анимация 
    /* window.addEventListener('scroll', function () {
        gsap.from(".hero__title", { opacity: 0, y: 500, ease: "power3.out", duration: 1 });
        gsap.from(".hero__descr", { delay: 0.8, opacity: 0, ease: "power3.out", duration: 1 });
        gsap.from(".photos-wrap__one", { scale: 0.5, delay: 1.3, opacity: 0, ease: "power3.out", duration: 1 });
        gsap.from(".photos-wrap__two", { scale: 0.5, delay: 1.6, opacity: 0, ease: "power3.out", duration: 1 });
        gsap.from(".photos-wrap__three", { scale: 0.5, delay: 1.9, opacity: 0, ease: "power3.out", duration: 1 });
        gsap.from(".photos__author", { delay: 2.2, opacity: 0, ease: "power3.out", duration: 2 });
    }); */




});