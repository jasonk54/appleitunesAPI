$(document).ready(function(){
  $('#searchBox').keyup(function(){
      var search = $('#searchBox').val();
      var appleAJAXHelpers = {
        success: function(data, status, jqXHR) {
        $("body").append(data.results[0].artistName);
      },
      error: function(jqXHR, status, error) {
      }
    };
    $.ajax({
      url: "https://itunes.apple.com/search",
      data: {
        term: search
      },
      jsonp: 'callback',
      dataType: "jsonp",
      success: appleAJAXHelpers.success,
      error: appleAJAXHelpers.error
    });
  });
});