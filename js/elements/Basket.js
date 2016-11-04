var
// Приватные свойства
	__sum,
	__countryCounter,
	__tourInBasket = [],

// Конструктор класса
	Basket = function (selector) {
		this.selector = $(selector);
		this.selector.empty().append(
			"<p>В корзине <span class='js-basket-info-counter'></span> на сумму <span class='js-basket-info-sum'></span></p>"
		);
		this.sum = this.selector.find(".js-basket-info-sum");
		this.tourCounter = this.selector.find(".js-basket-info-counter");
		this.update();
	};
// Публичные методы
Basket.prototype.update = function (tour) {
	__sum = __countryCounter = 0;
	if (tour) {
		__tourInBasket.push(tour);
	}
	for (var i in __tourInBasket) {
		__sum += __tourInBasket[i].price;
		__countryCounter++;
	}

	this.sum.text(__sum + " рубл".pluralize(__sum,"ь","я","ей") + ".");
	this.tourCounter.text(__countryCounter + " товар".pluralize(__countryCounter,"","а","ов"));
};
Basket.prototype.add = function (tour) {
	var ok = true; // флаг на поиск совпадений по странам
	for (var i in __tourInBasket) {
		if (__tourInBasket[i].country.indexOf(tour.country) != -1) {
			ok = false;
			break;
		}
	}
	ok ? this.update(tour) : alert("Тур в " + tour.country + " уже есть в Вашей корзине");
};
Basket.prototype.remove = function (tour) {
	for(var i in __tourInBasket){
		if(__tourInBasket[i].id === tour.id){
			delete  __tourInBasket[i];
			this.update();
			break;
		}
	}
};