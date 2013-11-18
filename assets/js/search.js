
(function($, lunr){
  $(function() {
    var idx;
    $.getJSON(assets + '/search_data.json', function(data) {
      idx = lunr.Index.load(data);
    });

    // setup search box
    $('#search').autocomplete({
      minLength: 2,
      source: function(request, response) {
        var results = idx.search(request.term);
        response(results.map(function(item) {
          var url = item.ref.split('/').splice(1,1).join('/');
          return {
            label: url,
            value: url,
            url: url
          };
        }));
      },
      select: function(event, ui) {
        window.location = ui.item.url;
        return false;
      }
    })
    .data('ui-autocomplete')._renderItem = function(ul, item) {
      return $('<li>')
        .append('<a>' + item.label + '</a>')
        .appendTo(ul);
    };
  });

})($, lunr);