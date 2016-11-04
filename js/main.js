$(function () {
	// Подключаем выпадающий список и скролл
	$("select").select2({
		minimumResultsForSearch: -1,
		width: 'auto'
	})
		.on("select2:opening", function () {
			// обновляем при повторном открытии выпадаюего списка
			updateScrollBar(true)
		})
		.on("select2:open", function () {
			// инициализируем
			updateScrollBar()
		});
	function updateScrollBar(update) {
		// Вещаем таймаут, т.к. список может не успеть построится до конца, и скролл срау не появится
		setTimeout(function () {
			$(".select2-results__options").perfectScrollbar(update ? "update" : null)
		}, 10);
	}
	// Инициализируем список стран
	var countryList = [
		{
			id: 1,
			country: "Египет",
			price: 50000
		},
		{
			id: 2,
			country: "Египет",
			price: 60000
		},
		{
			id: 3,
			country: "Тайланд",
			price: 40000
		}
	],
		// создаем экземпляр класса
		basket = new Basket(".js-basket-info");
	// на каждыйсписок вешаем свой коллбек
	$(".js-country-list").countryList(countryList,"Добавить в корзину", function (tour) {
		basket.add(tour)
	});
	$(".js-basket-list").countryList(countryList,"Удалить из корзины", function (tour) {
		basket.remove(tour)
	});
});
// создаем метод для возможности дописания необходимый окончаний в строку, в зависимости от переданного числительного
String.prototype.pluralize = function (count, s1, s2, s3) {
	var value = parseInt(count),
		resultStr = s3; // результирующая строка
	if ([11, 12, 13, 14].indexOf(value % 100) != -1) {
		resultStr = s3;
	} else if (value % 10 == 1) {
		resultStr = s1;
	}
	if ([2, 3, 4].indexOf(value % 10) != -1) {
		resultStr = s2;
	}
	return this + resultStr;
};