// TODO: Add templating
// TODO: Use backbone to organize code

var PlayHaven = function() {
  var timer, text, entity;
  var typingInterval = 1000;

  var helpers = {
    doneTyping: function() {

      text = $('#searchBox').val();
      $.ajax({
        url: "https://itunes.apple.com/search",
        data: {
          term: text
          // entity: entity
        },
        jsonp: 'callback',
        dataType: "jsonp",
        success: appleAJAXHandlers.success,
        error: appleAJAXHandlers.error
      });
    },

    // Parses data, and popluates the correct content
    parsedOutput: function(data) {
      // Removes duplicate copy of the entities property and outputs type of file
      var getKind = _.pluck(data.results, 'kind');
      var kind = _.uniq(getKind);
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
        $('.searchContent').append("<div class='contentlist' data-filetype='" + data.results[i].kind + "'>Name: " + data.results[i].artistName + "</div>");
        $('.searchContent').append("<div class='contentlist' data-filetype='" + data.results[i].kind + "'>Track Name: " + data.results[i].trackName +
          "</div><input type='button' class='preview btn btn-primary' data-previewfile='" + data.results[i].previewUrl + "' value='Preview' style='margin-top:.5em'></input><br><br>")
      };

      // Embeds media file on the DOM - via Modal - when preview button is clicked.
      $('.preview').click(function(el) {
        var previewLink = $(el.target).data('previewfile');
        console.log(previewLink)
        if (previewLink) {
          $('.modal-body').empty().append("<div><embed src=" + previewLink + " width='100%' height='100%'></div>");
          $('#myModal').modal('show');
        } else {
          alert('Preview not available');
        }
      });
    }
  };

  var appleAJAXHandlers = {
    success: function(data, status, jqXHR) {
      helpers.parsedOutput(data);
    },
    error: function(jqXHR, status, error) {
      console.log(error);
    }
  };

  // Call helpers.doneTyping on last keystroke (on release) after 1 second
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