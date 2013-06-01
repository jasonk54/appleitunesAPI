var PlayHaven = function() {
  var timer, text;
  var typingInterval = 3000;
  var helpers = {
    doneTyping: function() {
      text = $('#searchBox').val();
      $.ajax({
        url: "https://itunes.apple.com/search",
        data: {
          term: "jason"
        },
        jsonp: 'callback',
        dataType: "jsonp",
        success: appleAJAXHandlers.success,
        error: appleAJAXHandlers.error
      });
    },
    parser: function(data) {
      for (var i = 0; i < data.results.length; i++) {
        // replace this with a templating engine, such as handlerbars or underscore
        $('.searchContent').append("<div>" + data.results[i].artistName + "</div>");
      }
    }
  };

  var appleAJAXHandlers = {
    success: function(data, status, jqXHR) {
      // debugger;
      helpers.parser(data);
    },
    error: function(jqXHR, status, error) {
      console.log(error);
    }
  };

  // comments please!
  $('#searchBox').keyup(function() {
    // Replace this with underscore's debounce method
    clearTimeout(timer);
    if ($('#searchBox').val()) {
      timer = setTimeout(helpers.doneTyping, typingInterval);
    }
  });
};

$(document).ready(function(){
  PlayHaven();
});