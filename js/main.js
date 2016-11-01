$(function () {
    $("select").select2({
        minimumResultsForSearch: -1,
        dropdownAutoWidth : true,
        width: 'auto'
    });
    $(".select2-results__options").perfectScrollbar()
});