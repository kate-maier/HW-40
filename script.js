// Робимо на підставі минулого дз.

// В інформації товару - кнопка "купити".
// При натисканні на "купити" нижче з'являється форма оформлення замовлення з наступними полями:
// ПІБ покупця
// Місто (вибір зі списку)
// Склад Нової пошти для надсилання
// Післяплати або оплати банківської картки
// Кількість продукції, що купується
// Коментар до замовлення
// 2. Реалізувати перевірку всіх даних користувача під час підтвердження замовлення - обов'язкові поля заповнені. 
// Інакше - виводити помилку на сторінку

// 3. Виводити інформацію про замовлення на сторінку (інформація про товар та про доставку)


const mainCatalog = document.querySelectorAll('.products__catalog-item');
const productsNames = document.getElementById('productsNames');

const productsInfoCards = document.getElementById('productsInfoCards');

const buyBtn = document.getElementById('buyBtn');
const form = document.getElementById('form');
const aboutOrder = document.getElementById('aboutOrder');

let choosedProduct;


let products = [
    {
        category: 'smartphones',
        name: 'iPhone 14 Pro Max',
        info: 'Як в попередньому поколінні, iPhone 14 Pro Max найбільший та найавтономніший смартфон лінійки Pro. Діагональ дисплея пристрою становить 6,7 дюймів, виконаний за технологією OLED Super Retina XDR. Саме на дисплеї видно найбільшу інновацію 2022 року в смартфонах Apple для покращення взаємодії з користувачем «Dynamic Island».'
    },
    {
        category: 'smartphones',
        name: 'Xiaomi Redmi Note 12 Pro',
        info: 'Смартфон Xiaomi Redmi Note 12 Pro має якості справжнього лідера в всьому. Передова камера професійного рівня 108 Мп дарує чудові можливості для фото та відео зйомки. Насолоджуйтесь супер-чіткою та яскравою картинкою на 6.67-дюймовому FHD AMOLED дисплеї з частотою оновлення 120 Гц.'
    },
    {
        category: 'smartphones',
        name: 'APPLE MacBook Air 15',
        info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis tenetur adipisci omnis eos vel in?'
    },
    {
        category: 'laptops',
        name: 'Lenovo Ideapad Gaming 3 15IHU6',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum, dolorem repudiandae laboriosam voluptas officia voluptate, libero, corrupti adipisci in harum eos et nobis nostrum.'
    },
    {
        category: 'laptops',
        name: 'ASUS M6500QH-HN081',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique deserunt facere beatae maiores quas corrupti molestias animi laborum modi magni quod doloremque, dolorum necessitatibus rerum qui fuga blanditiis, esse ipsam.'
    },
    {
        category: 'televisors',
        name: 'Телевізор SAMSUNG QE50Q60BAUXUA',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
    },
    {
        category: 'televisors',
        name: 'Телевізор LG 50UQ81006LB',
        info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, nisi, laboriosam qui delectus iusto mollitia omnis necessitatibus ex accusantium blanditiis hic non, molestias rem ipsum.'
    }
];


mainCatalog.forEach((catalogItem) => {
    catalogItem.addEventListener('click', (event) => {
        productsNames.innerHTML = '';
        productsInfoCards.innerHTML = '';
        aboutOrder.innerHTML = '';

        let target = event.target;
        const catalogItemId = target.id;

        form.style.display = 'none';

        products.forEach((product) => {
            if (product.category === catalogItemId) {
                let category = document.createElement('p');
                category.textContent = product.name;
                category.classList.add('products__card');
                productsNames.appendChild(category);

                category.addEventListener('click', (event) => {
                    productsInfoCards.innerHTML = '';

                    let target = event.target;
                    let name = target.textContent;

                    products.forEach((product) => {

                        if (product.name === name) {
                            let info = document.createElement('p');
                            info.textContent = product.info;
                            info.classList.add('products__product-info');
                            productsInfoCards.appendChild(info);

                            choosedProduct = target.textContent;
                        }
                    })

                    let button = document.createElement('button');
                    button.classList.add('buyBtn');
                    button.textContent = 'Купити';
                    button.id = 'btn';
                    productsInfoCards.appendChild(button);

                    addButtonEvent();
                })
            }
        })
    }
    )
})

function addButtonEvent() {
    let btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        let message = document.createElement('p');
        message.classList.add('message');
        message.textContent = 'Товар додано в корзину';
        productsInfoCards.appendChild(message);

        btn.setAttribute('disabled', 'disabled');

        let orderingProduct = document.getElementById('orderingProduct');
        orderingProduct.textContent = `Продукт: ${choosedProduct}`;

        setTimeout(() => {
            form.style.display = 'flex';
        }, 2000)
    })
}



let btnSaveForm = document.getElementById('btnSaveForm');

btnSaveForm.addEventListener('click', () => {

    // отримання даних з інпутів
    let userFullName = document.getElementById('fullName').value;

    let townSelect = document.getElementById('town');
    let userTown = townSelect.options[townSelect.selectedIndex].textContent;

    let postOffice = document.getElementById('postOffice').value;

    let paymentTypes = document.querySelectorAll('input[type="radio"]');
    let paymentType;

    paymentTypes.forEach(function (type) {
        if (type.checked) {
            let id = type.id;
            let label = document.querySelector(`label[for="${id}"]`);
            paymentType = label.textContent;
        }
    })

    let amountProdacts = document.getElementById('amountProdacts').value;

    let userComments = document.getElementById('userComments').value;

    //перевірка введених значень
    if ((userFullName.trim() === '') || (postOffice.trim() === '') || (paymentType.trim() === '') || (amountProdacts.trim() === '')) {
        alert('Заповніть обовязкові поля');
        return false;
    }

    if (isNaN(+postOffice)) {
        alert('Вкажіть цифру в полі "номер складу"');
        return false;
    }

    if (isNaN(+amountProdacts)) {
        alert('Вкажіть цифру в полі "кількість товару"');
        return false;
    }

    //вивід інформації про замовлення
    aboutOrder.style.display = 'block';
    aboutOrder.innerHTML = `<h2>Дані для відправки:</h2>
    <span>Обраний продукт: ${choosedProduct}.</span><br>
    <span>Ім'я отримувача: ${userFullName}.</span><br>
    <span>Місто: ${userTown}. </span><br>
    <span>Відділення пошти: ${postOffice}. </span><br>
    <span>Вид оплати: ${paymentType}. </span><br>
    <span>Кількість продукції: ${amountProdacts} </span><br>
    <span>Коментарі: ${userComments}</span>`;
})
