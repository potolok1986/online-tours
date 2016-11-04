// создаем класс Basket
var Basket = (function () {
	var
		i,// counters

// Приватные свойства
		__sum,
		__countryCounter,
		__toursInBasket = [];

// Конструктор класса
	function Basket (selector) {
		this.selector = $(selector);
		this.selector.empty().append(
			"<p>В корзине <span class='js-basket-info-counter'></span> на сумму <span class='js-basket-info-sum'></span></p>"
		);
		this.sum = this.selector.find(".js-basket-info-sum");
		this.tourCounter = this.selector.find(".js-basket-info-counter");
		this.update();
	}

// Публичные методы
	Basket.prototype.update = function (tour) {
		__sum = __countryCounter = 0;
		if (tour) {
			__toursInBasket.push(tour);
		}
		for (i in __toursInBasket) {
			__sum += __toursInBasket[i].price;
			__countryCounter++;
		}

		this.sum.text(__sum + " рубл".pluralize(__sum,"ь","я","ей") + ".");
		this.tourCounter.text(__countryCounter + " товар".pluralize(__countryCounter,"","а","ов"));
	};

	Basket.prototype.add = function (tour) {
		var ok = true; // флаг на поиск совпадений по странам
		for (i in __toursInBasket) {
			if (__toursInBasket[i].country.indexOf(tour.country) != -1) {
				ok = false;
				break;
			}
		}
		ok ? this.update(tour) : alert("Тур в " + tour.country + " уже есть в Вашей корзине");
	};

	Basket.prototype.remove = function (tour) {
		for(i in __toursInBasket){
			if(__toursInBasket[i].id === tour.id){
				delete  __toursInBasket[i];
				this.update();
				break;
			}
		}
	};
	return Basket
}());