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
        var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
        // Создаем геообъект с типом геометрии "Точка".
            myGeoObject = new ymaps.GeoObject({
                // Описание геометрии.
                geometry: {
                    type: "Point",
                    coordinates: [55.8, 37.8]
                },
                // Свойства.
                properties: {
                    // Контент метки.
                    iconContent: 'Я тащусь',
                    hintContent: 'Ну давай уже тащи'
                }
            }, {
                // Опции.
                // Иконка метки будет растягиваться под размер ее содержимого.
                preset: 'islands#blackStretchyIcon',
                // Метку можно перемещать.
                draggable: true
            }),
            myPieChart = new ymaps.Placemark([
                55.847, 37.6
            ], {
                // Данные для построения диаграммы.
                data: [
                    {weight: 8, color: '#0E4779'},
                    {weight: 6, color: '#1E98FF'},
                    {weight: 4, color: '#82CDFF'}
                ],
                iconCaption: "Диаграмма"
            }, {
                // Зададим произвольный макет метки.
                iconLayout: 'default#pieChart',
                // Радиус диаграммы в пикселях.
                iconPieChartRadius: 30,
                // Радиус центральной части макета.
                iconPieChartCoreRadius: 10,
                // Стиль заливки центральной части.
                iconPieChartCoreFillStyle: '#ffffff',
                // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeStyle: '#ffffff',
                // Ширина линий-разделителей секторов и внешней обводки диаграммы.
                iconPieChartStrokeWidth: 3,
                // Максимальная ширина подписи метки.
                iconPieChartCaptionMaxWidth: 200
            });
    
        myMap.geoObjects
            .add(myGeoObject)
            .add(myPieChart)
            .add(new ymaps.Placemark([55.833436, 37.715175], {
                balloonContent: '<strong>серобуромалиновый</strong> цвет'
            }, {
                preset: 'islands#dotIcon',
                iconColor: '#735184'
            }))
            .add(new ymaps.Placemark([55.782392, 37.614924], {
                balloonContent: 'цвет <strong>детской неожиданности</strong>'
            }, {
                preset: 'islands#circleDotIcon',
                iconColor: 'yellow'
            }))
    }

    //Фиксированная шапка
    let fixedHeader = document.getElementById('fixedHeader');
    let headerHeight = document.querySelector('header');

    document.addEventListener('scroll', () => {
        let scrollPage = window.pageYOffset;
        if (scrollPage > headerHeight.clientHeight && !fixedHeader.classList.contains('active')) {
            fixedHeader.classList.add('active');
            menuFix.classList.add('menu-fix');
        } else if (scrollPage < headerHeight.clientHeight && fixedHeader.classList.contains('active')) {
            fixedHeader.classList.remove('active');
            menuFix.classList.remove('menu-fix');
        }
    })

    //Бургер меню
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('menuContainer');
    const btnFix = document.getElementById('menuBtnFix');
    const menuFix = document.getElementById('menuContainerFix');

    btn.addEventListener('click', showMenu);
    btnFix.addEventListener('click', showMenu);

    function showMenu() {
        menu.classList.toggle('menu-show');
        btn.classList.toggle('opened');
        btnFix.classList.toggle('opened');
        menuFix.classList.toggle('menu-show');
    }

    

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


    //Контент модалки категории номеров отеля
    let swiperFund = document.getElementById('swiperFund'); //Слайдер модалка
    let tabsPopups = document.querySelectorAll('.popup__tab');  //Кнопки табов
    let fundModal = document.getElementById('fundModal');

    //Открытие модалки и клик по нужному номеру
    let cardFunds = document.querySelectorAll('.fund__item');
    cardFunds.forEach(el => {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            fundModal.classList.add('popup_opened');
            tabsPopups.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.funds == this.dataset.target) {
                    btn.classList.add('active');
                }
            })
            let fund = el.dataset.target;
            switch (fund) {
                case 'luxe':
                    catalogContent('luxe');
                    break;
                case 'juniorSuite':
                    catalogContent('juniorSuite');
                    break;
                case 'luxeFamily':
                    catalogContent('luxeFamily');
                    break;
                case 'comfort':
                    catalogContent('comfort');
                    break;
                case 'juniorSuiteFamily':
                    catalogContent('juniorSuiteFamily');
                    break;
            }
        })
    })

    //Пробегаем по всем кнопкам
    tabsPopups.forEach(el => {
        el.addEventListener('click', function () {
            //Удаляем активный класс (серый фон) у кнопки
            tabsPopups.forEach(el => {
                el.classList.remove('active');
            })

            //Добавляем активный класс(серый фон) нажатой кнопке
            this.classList.add('active');

            //Определяем по как кнопке был клик и вызываем функции отрисовки контента
            let fund = el.dataset.funds;
            switch (fund) {
                case 'luxe':
                    catalogContent('luxe');
                    break;
                case 'juniorSuite':
                    catalogContent('juniorSuite');
                    break;
                case 'luxeFamily':
                    catalogContent('luxeFamily');
                    break;
                case 'comfort':
                    catalogContent('comfort');
                    break;
                case 'juniorSuiteFamily':
                    catalogContent('juniorSuiteFamily');
                    break;
            }
        })
    })

    //Получаем кнопку по которой был клик и из объекта рисуем контент
    let fundSwiper;
    function catalogContent(fund) {

        if (fundSwiper) {
            fundSwiper.destroy()
        }
        let nameFund = document.getElementById('nameFund');
        let priceFund = document.getElementById('priceFund');
        let textFund = document.getElementById('textFund');
        let termsFund = document.getElementById('termsFund');
        let fundBook = document.getElementById('fundBook');

        termsFund.innerHTML = catalog[fund].term;
        textFund.textContent = catalog[fund].description;
        nameFund.textContent = catalog[fund].name;
        priceFund.textContent = catalog[fund].price;
        swiperFund.innerHTML = '';
        fundBook.href = catalog[fund].link;

        for (let i = 0; i < catalog[fund].src.length; i++) {
            let slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img class="fund__swiper-img" src="${catalog[fund].src[i]}" alt="Фото номера">`;
            swiperFund.append(slide);
        }

        fundSwiper = new Swiper('.fund-swiper', {
            // Optional parameters
            direction: 'horizontal',

            loop: true,
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    //Объект с контентом модалки каталога номеров
    let catalog = {
        luxe: {
            name: 'Luxe',
            price: 'от 8880 ₽/ночь',
            description: `Уникальные номера, исполненные в классическом стиле и индивидуальной цветовой гамме и планировке, вам предстоит нелегкий выбор, но каждый номер придется по вкусу. Сегодня рекомендуем обратить на номер "Пион" класса Люкс с двумя балконами, полноценной ванной комнатой с беде. Интерьер выполнен в оттенках цветущего пиона.`,
            term: `<li class="popup__terms squere">35 м <sup>2</sup></li ><li class="popup__terms kondicioner">Кондиционер</li><li class="popup__terms wi_fi">Wi-Fi</li><li class="popup__terms wash">Душ</li>
            <li class="popup__terms fridge">Холодильник</li><li class="popup__terms dryer">Фен</li><li class="popup__terms slippers">Тапочки</li>
            <li class="popup__terms tv">Телевидение</li>`,
            src: ['./img/catalog_fund/luxe/luxe1.jpg', './img/catalog_fund/luxe/luxe2.jpg', './img/catalog_fund/luxe/luxe3.jpg'],
            link: 'link',
        },
        juniorSuite: {
            name: 'Junior Suite',
            price: 'от 5890 ₽/ночь',
            description: `С трудом можно отнести номера к категории Полу Люкс, так как они не уступают люксовым номерам в комфорте, уюте и сервисе. Номера оснащены с учетом всех современных тенденций.`,
            term: `<li class="popup__terms squere">25 м <sup>2</sup></li ><li class="popup__terms kondicioner">Кондиционер</li><li class="popup__terms wi_fi">Wi-Fi</li><li class="popup__terms wash">Душ</li>
            <li class="popup__terms fridge">Холодильник</li><li class="popup__terms dryer">Фен</li><li class="popup__terms slippers">Тапочки</li>
            <li class="popup__terms tv">Телевидение</li>`,
            src: ['./img/catalog_fund/junior-suite/juniorSuite1.jpg', './img/catalog_fund/junior-suite/juniorSuite2.jpg', './img/catalog_fund/junior-suite/juniorSuite3.jpg'],
            link: 'link',
        },
        luxeFamily: {
            name: 'Luxe Family',
            price: 'от 7900 ₽/ночь',
            description: `Двухкомнатный номер класса люкс с большой двуспальной кроватью, диваном кроватью. Балкон и вид на реку и журавлевские скалы.`,
            term: `<li class="popup__terms squere">35 м <sup>2</sup></li ><li class="popup__terms kondicioner">Кондиционер</li><li class="popup__terms wi_fi">Wi-Fi</li><li class="popup__terms wash">Душ</li>
            <li class="popup__terms fridge">Холодильник</li><li class="popup__terms dryer">Фен</li><li class="popup__terms slippers">Тапочки</li>
            <li class="popup__terms tv">Телевидение</li>`,
            src: ['./img/catalog_fund/luxe-family/luxeFamily1.jpg', './img/catalog_fund/luxe-family/luxeFamily2.jpg', './img/catalog_fund/luxe-family/luxeFamily3.jpg'],
            link: 'link',
        },
        comfort: {
            name: 'Comfort',
            price: 'от 3480 ₽/ночь',
            description: `Стандартный номер с раздельными полутороспальными кроватями или одной большой двуспальной кроватью. Каждый номер выполнен в индивидуальной цветовой гамме. Есть номер категории доступная среда. Есть номера с видом на внутренний двор и номера с видом на реку Томь.`,
            term: `<li class="popup__terms squere">18 м <sup>2</sup></li ><li class="popup__terms kondicioner">Кондиционер</li><li class="popup__terms wi_fi">Wi-Fi</li><li class="popup__terms wash">Душ</li>
            <li class="popup__terms fridge">Холодильник</li><li class="popup__terms dryer">Фен</li><li class="popup__terms slippers">Тапочки</li>
            <li class="popup__terms tv">Телевидение</li>`,
            src: ['./img/catalog_fund/comfort/comfort1.jpg', './img/catalog_fund/comfort/comfort2.jpg', './img/catalog_fund/comfort/comfort3.jpg'],
            link: 'link',
        },
        juniorSuiteFamily: {
            name: 'Junior Suite Family',
            price: 'от 5490 ₽/ночь',
            description: `Однокомнатный номер класса полулюкс с большой двуспальной кроватью, креслом кроватью. Вид на реку и ресторан.`,
            term: `<li class="popup__terms squere">25 м <sup>2</sup></li ><li class="popup__terms kondicioner">Кондиционер</li><li class="popup__terms wi_fi">Wi-Fi</li><li class="popup__terms wash">Душ</li>
            <li class="popup__terms fridge">Холодильник</li><li class="popup__terms dryer">Фен</li><li class="popup__terms slippers">Тапочки</li>
            <li class="popup__terms tv">Телевидение</li>`,
            src: ['./img/catalog_fund/junior-suite-family/junior-suite-family1.jpg', './img/catalog_fund/junior-suite-family/junior-suite-family2.jpg', './img/catalog_fund/junior-suite-family/junior-suite-family3.jpg'],
            link: 'link',
        },
    }











    //Контент модалки категории номеров отеля
    let swiperHall = document.getElementById('swiperHall'); //Слайдер модалка
    let hallModal = document.getElementById('hallModal');

    //Открытие модалки и клик по нужному hally
    let cardHall = document.querySelectorAll('.halls__hall');
    cardHall.forEach(el => {
        el.addEventListener('click', function () {
            hallModal.classList.add('popup_opened');
            tabsPopups.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.hall == this.dataset.target) {
                    btn.classList.add('active');
                }
            })
            let fund = el.dataset.target;
            switch (fund) {
                case 'hall':
                    hallsContent('hall');
                    break;
                case 'restaurant':
                    hallsContent('restaurant');
                    break;
            }
        })
    })

    //Пробегаем по всем кнопкам
    tabsPopups.forEach(el => {
        el.addEventListener('click', function () {
            //Удаляем активный класс (серый фон) у кнопки
            tabsPopups.forEach(el => {
                el.classList.remove('active');
            })

            //Добавляем активный класс(серый фон) нажатой кнопке
            this.classList.add('active');

            //Определяем по какой кнопке был клик и вызываем функции отрисовки контента
            let fund = el.dataset.hall;
            switch (fund) {
                case 'hall':
                    hallsContent('hall');
                    break;
                case 'restaurant':
                    hallsContent('restaurant');
                    break;
            }
        })
    })

    //Получаем кнопку по которой был клик и из объекта рисуем контент
    let hallSwiper;
    function hallsContent(fund) {

        if (hallSwiper) {
            hallSwiper.destroy()
        }
        let nameHall = document.getElementById('nameHall');
        let textHall = document.getElementById('hallText');
        let termsHall = document.getElementById('termsHall');

        termsHall.innerHTML = halls[fund].term;
        textHall.innerHTML = halls[fund].description;
        nameHall.textContent = halls[fund].name;
        swiperHall.innerHTML = '';

        for (let i = 0; i < halls[fund].src.length; i++) {
            let slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img class="fund__swiper-img" src="${halls[fund].src[i]}" alt="Фото номера">`;
            swiperHall.append(slide);
        }

        hallSwiper = new Swiper('.hall-swiper', {
            // Optional parameters
            direction: 'horizontal',

            loop: true,
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }


    //Объект с контентом модалки развлечения
    let halls = {
        hall: {
            name: 'Конференц-залы',
            description: `<p>Собственные конференц-залы на базе ресторанного комплекса Лазурный берег от 30 до 240 персон.</p><p>Команда высоко квалифицированных специалистов-организаторов деловых мероприятий.</p><p>Полное обеспечение необходимым оборудованием, сопровождение организационных процессов.</p><p>Кофе брейки и обеспечение питанием всех участников мероприятия.</p>`,
            term: `<li class="popup__terms squere">35-600 кв.м</li ><li class="popup__terms people">30-240 чел.</li>`,
            src: ['./img/hall/hall/hall1.jpg', './img/hall/hall/hall2.jpg', './img/hall/hall/hall3.jpg'],
        },
        restaurant: {
            name: 'Ресторан Лазурный Берег',
            description: `<p>Мы сами разрабатываем рецептуры многих наших блюд, а все до единого салата, кроме классических, уникальны и не имеют аналогов. С большим трепетом мы относимся к приготовлению любых блюд, для поддержки высочайшего качества которых у нас есть все необходимое и даже больше: своя коптильная, где мы готовим вкуснейшие мясные и рыбные блюда; настоящий тандыр, не только для мяса, но и для настоящих армянских лепешек.</p>`,
            term: `<li class="popup__terms squere">2000 м <sup>2</sup></li ><li class="popup__terms people">1000 чел.</li>`,
            src: ['./img/hall/restaurant/rest1.jpg', './img/hall/restaurant/rest2.jpg', './img/hall/restaurant/rest3.jpg'],
        },
    }


});