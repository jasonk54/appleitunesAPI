// TODO: Add templating
// TODO: Use backbone

var apple = function() {
  var timer, text, entity;
  var typingInterval = 500;

  var helpers = {
    doneTyping: function() {

      text = $('#searchBox').val();
      return $.ajax({
        url: "https://itunes.apple.com/search",
        data: {
          term: text
        },
        jsonp: 'callback',
        dataType: "jsonp",
        success: appleAJAXHandlers.success,
        error: appleAJAXHandlers.error
      });
    },

    // Parses data, and popluates the correct content
    parsedOutput: function(data) {
      // Removes duplicate copy of the entities property and output type of files
      var getKind = _.pluck(data.results, 'kind');
      var kind = _.uniq(getKind);
      $('.greetings').hide('slow');
      $('.side').show();
      $('.content').show();

      // Appends type of files
      $('.sidePanel').empty();                           // Clears before appending
      for (var i = 0; i < kind.length; i++) {
         $('.sidePanel').append("<div class='type'>" + kind[i] +  "</div>");
      };

      // Appends artist name and track name.  All genre
      $('.searchContent').empty();                      // Clears before appending
      for (var i = 0; i < data.results.length; i++) {
        $('.searchContent').append("<div class='contentlist'>Name: " + data.results[i].artistName + "</div>");
        $('.searchContent').append("<div class='contentlist'>Track Name: " + data.results[i].trackName + "</div>");
        $('.searchContent').append("<div class='contentlist'>File Type: " + data.results[i].kind + "</div>");
        $('.searchContent').append("<input type='button' class='preview btn btn-primary' data-previewfile='" + data.results[i].previewUrl + "' value='Preview'></input>");
      };

      // Embeds media file on the DOM - via Modal - when preview button is clicked.
      $('.preview').click(function(el) {
        var previewLink = $(el.target).data('previewfile');
        if (previewLink) {
          $('.modal-body').empty().append("<div><embed src=" + previewLink + " width='100%' height='100%'></div>");
          $('#myModal').modal('show');
        } else {
          alert('Preview not available');
        }
      });
    }
  };

  var current_xhr = null;

  var appleAJAXHandlers = {
    success: function(data, status, jqXHR) {
      helpers.parsedOutput(data);
      current_xhr = null;
    },
    error: function(jqXHR, status, error) {
      console.log(error);
      current_xhr = null;
    }
  };

  // Call helpers.doneTyping on last keystroke (on release) after .5 seconds
  $('#searchBox').keyup(function() {
    clearTimeout(timer);
    if ($('#searchBox').val()) {
      timer = setTimeout(function() {
        if (current_xhr) current_xhr.abort();
        current_xhr = helpers.doneTyping();
      }, typingInterval);
    }
  });
};

$(document).ready(function(){
  apple();
});
