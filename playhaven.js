$(document).ready(function(){
  var timer;
  var typingInterval = 3000;

  $('#searchBox').keyup(function() {
    // Replace this with underscore's debounce method
    clearTimeout(timer);
    if ($('#searchBox').val()) {
      timer = setTimeout(doneTyping, typingInterval);
    }
  });

  var doneTyping = function() {
    var text = $('#searchBox').val();
    var appleAJAXHelpers = {
      success: function(data, status, jqXHR) {
        console.log(data);
        parser(data, 'artist');
      },
      error: function(jqXHR, status, error) {
        console.log(error);
      }
    }

    var parser = function(data, option) {
      for (var i = 0; i < data.results.length; i++) {
        // replace this with a templating engine, such as handlerbars or underscore
        $('.searchContent').append("<div>" + data.results[i].artistName + "</div>");
      }
    }

    // comments please!
    $.ajax({
      url: "https://itunes.apple.com/search",
      data: {
        term: text
      },
      jsonp: 'callback',
      dataType: "jsonp",
      success: appleAJAXHelpers.success,
      error: appleAJAXHelpers.error
    });
  }
});
