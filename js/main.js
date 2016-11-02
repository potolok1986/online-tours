$(function () {
	$("select").select2({
		minimumResultsForSearch: -1,
		width: 'auto'
	})
		.on("select2:opening",function () {
			// обновляем
			updateScrollBar(true)
		})
		.on("select2:open", function () {
			// инициализируем
			updateScrollBar()
	});
	function updateScrollBar(update){
		// Вещаем таймаут, т.к. список может не успеть построится до конца, и скролл срау не появится
		setTimeout(function () {
			$(".select2-results__options").perfectScrollbar(update ? "update" : null)
		},10);
	}
});