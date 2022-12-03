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

renderNews();
