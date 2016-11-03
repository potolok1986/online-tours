$(function () {
	$("select").select2({
		minimumResultsForSearch: -1,
		width: 'auto'
	})
		.on("select2:opening", function () {
			// обновляем
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
		basket = new Basket(".js-basket-info");
	$(".js-country-list").countryList(countryList,"Добавить в корзину", function (tour) {
		basket.add(tour)
	});
	$(".js-basket-list").countryList(countryList,"Удалить из корзины", function (tour) {
		basket.remove(tour)
	});

});