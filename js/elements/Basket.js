// создаем класс Basket
var Basket = (function () {
	var
		i,// counters

// Приватные свойства
		$selector,
		$sum,
		$tourCounter,
		__toursInBasket = [];

// Конструктор класса
	function Basket (selector) {
		$selector = $(selector);
		$selector.empty().append(
			"<p>В корзине <span class='js-basket-info-counter'></span> на сумму <span class='js-basket-info-sum'></span></p>"
		);
		// эти свойства делаем публичными чтобы можно было из экземпляра поменять значеие на случай выгрузки данных из сессии
		$sum = $selector.find(".js-basket-info-sum");
		$tourCounter = $selector.find(".js-basket-info-counter");
		//
		this.update();
	}

// Публичные методы
	Basket.prototype.update = function (tour) {
		var __sum = 0,
			__countryCounter = 0;
		if (tour) {
			__toursInBasket.push(tour);
		}
		for (i in __toursInBasket) {
			__sum += __toursInBasket[i].price;
			__countryCounter++;
		}
		$sum.text(__sum + " рубл".pluralize(__sum,"ь","я","ей") + ".");
		$tourCounter.text(__countryCounter + " товар".pluralize(__countryCounter,"","а","ов"));
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
	// метод возвращающий все что находится в корзине
	// на пример при отправке на серер
	Basket.prototype.getTourInBasket = function () {
		return __toursInBasket;
	};
	return Basket
}());