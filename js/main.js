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


    //Валидация формы
    let form = document.querySelector('.popup__form');
    let inputs = form.querySelectorAll('input');
    let submitBtn = document.getElementById('submit');
    let ch1 = false;
    let ch2 = false;
    let ch3 = false;
    let ch4 = false;

    inputs.forEach(el => {
        el.addEventListener('input', function () {
            let rule = el.dataset.rule;
            switch (rule) {
                case 'text':
                    if (el.value.length >= 2) {
                        ch1 = true;
                    } else {
                        ch1 = false;
                    }
                    break;
                case 'tel':
                    if (!el.value.includes('_')) {
                        ch2 = true;
                    } else {
                        ch2 = false;
                    }
                    break;
                case 'number':
                    if (!el.value == '') {
                        ch3 = true;
                    } else {
                        ch3 = false;
                    }
                    break;
                case 'checkbox':
                    if (el.checked) {
                        ch4 = true;
                    } else {
                        ch4 = false;
                    }
                    break;
            }
            if (ch1 && ch2 && ch3 && ch4) {
                submitBtn.disabled = false;
            } else {
                submitBtn.disabled = true;
            }
        })
    })


    //Бургер меню
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('menuContainer');

    btn.addEventListener('click', showMenu);

    function showMenu() {
        menu.classList.toggle('menu-show');
        this.classList.toggle('opened');
    }



    //Фото галерея
    let photos = document.querySelectorAll('.photogalery__card');
    let modalPhoto = document.getElementById('photos');
    let modalImg = document.getElementById('photoSize');
    photos.forEach(photo => {
        photo.addEventListener('click', function () {
            let img = photo.querySelector('img');
            modalImg.src = img.src;
            modalPhoto.classList.add('popup_opened');
        })
    })


    //Маска телефона
    var selector = document.querySelector("input[type='tel']");
    var im = new Inputmask("+7 (999)-999-99-99");

    im.mask(selector);


    // Popups
    class Popup {
        constructor(popupElement) {
            this._popupElement = popupElement;
            this._closeButton = this._popupElement.querySelector('.popup__close');
            this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
            this._handleEscClose = this._handleEscClose.bind(this)
            this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
            this.setEventListeners()
        }

        open(el) {
            if (this._img) this._img.src = el.src
            document.body.style.overflow = "hidden";
            this._popupElement.classList.add('popup_opened')
            document.addEventListener('keydown', this._handleEscClose);
        }

        close() {
            if (this._img) this._img.src = ""
            this._popupElement.classList.remove('popup_opened');
            document.body.style.overflow = "visible";
            document.removeEventListener('keydown', this._handleEscClose);
        }

        _handleEscClose(evt) {
            if (evt.keyCode === 27) {
                this.close();
            }
        }

        _handleOverlayClick(evt) {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        }

        setEventListeners() {
            this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
            this._closeButton.addEventListener('click', () => this.close());
            this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
        }
    }

    const popups = document.querySelectorAll('.popup')
    let popupsObj = {}
    if (popups.length > 0) popups.forEach(item => { popupsObj[item.id] = new Popup(item) })




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