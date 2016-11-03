(function ($) {
	$.fn.countryList = function (list, buttonText, callback) {
		var newList = createList();
		this.empty().append(newList);
		return this;

		function createList() {
			return $("<ul/>", {
				class: "country-list",
				html: function () {
					var elements = [], // список всех элементов li
						i; // counters
					for (i in list) {
						var getTour = function Tour () {
							return callback(Tour.tour)
						};
						getTour.tour = list[i];
						elements.push($("<li/>", {
							html: [$("<span/>", {
								text: "Тур в " + getTour.tour.country + " за " + getTour.tour.price + " рублей"
							})
								, $("<button/>", {
									class: "btn btn-yellow",
									text: buttonText,
									click: getTour
								})]
						}))
					}
					return elements;
				}
			})
		}
	}
})(jQuery);