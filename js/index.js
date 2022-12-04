const newsBody = document.querySelector('.news__body');

const renderNews = async () => {
	const data = await fetch('https://kovel.media/feed/json');
	const response = await data.json();

	response.items.forEach((post) => {
		newsBody.innerHTML += `<article class="news__card card-news">
				<div class="card-news__img">
					<img src="${post.image}" alt="">
				</div>
				<div class="card-news__body">
					<h2 class="card-news__title">${post.title}</h2>
					<p class="card-news__source">${post.author.name}</p>
					<p class="card-news__desc">${post.content_html}</p>
					<a href="${post.url}" class="card-news__btn btn">Детальніше</a>
				</div>
			</article>`;
	});
};

if (newsBody) {
	renderNews();
}

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	},
};

const menu = () => {
	const header = document.querySelector('.header');
	if (isMobile.any()) {
		document.body.classList.add('page__body--touch');

		const menuArrow = document.querySelectorAll('.menu__arrow');

		menuArrow.forEach((arrow) => {
			arrow.addEventListener('click', () => {
				arrow.parentElement.classList.toggle('menu__item--active');
			});
		});
	} else {
		document.body.classList.add('page__body--pc');
	}

	const iconMenu = document.querySelector('.menu__icon');
	if (iconMenu != null) {
		const menuBody = document.querySelector('.menu__body');
		iconMenu.addEventListener('click', () => {
			document.body.classList.toggle('page__body--lock');
			iconMenu.classList.toggle('menu__icon--active');
			menuBody.classList.toggle('menu__body--active');
			menuBody.style.paddingTop = `${header.getBoundingClientRect().height}px`;

			if (menuBody.classList.contains('menu__body--active')) {
				document.body.style.paddingRight = `${
					window.innerWidth - document.body.clientWidth
				}px`;
			} else {
				document.body.style.paddingRight = 0;
			}
		});
	}
};

menu();
