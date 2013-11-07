
var apple = function() {
  var timer, text, entity;
  var typingInterval = 500;
  var current_request = null;

  var helpers = {

    // AJAX request to fetch data
    doneTyping: function(text) {
      return $.ajax({
        url: "https://itunes.apple.com/search",
        data: {
          term: text
        },
        jsonp: 'callback',
        dataType: "jsonp",
        success: function(resp) {
          helpers.parsedOutput(resp);
          current_request = null;
        },
        error: function() {
          current_request = null;
        }
      });
    },

    // Parses the data, and popluates the correct content
    parsedOutput: function(data) {
      // Removes duplicate copy of the entities property and output type of files
      var getKind = _.pluck(data.results, 'kind');
      var kind = _.uniq(getKind);

      $('.greetings').hide('slow');
      $('.side').show();
      $('.content').show();

      this.handlebarCompiler(kind, "#type-of-content", ".side");
      this.handlebarCompiler(data.results, "#content-template", ".searchContent")

      // Embeds media file on the DOM - via Modal - when preview button is clicked.
      $('.preview').click(function(el) {
        var previewLink = $(el.target).data('previewfile');
        if (previewLink) {
          $('.modal-body').html("<div><embed src=" + previewLink + " width='100%' height='100%'></div>");
          $('#myModal').modal('show');
        } else {
          alert('Preview not available');
        }
      });
    },

    // Handlebars compile method
    handlebarCompiler : function(data, templateScript, target) {
      var source   = $(templateScript).html();
      var template = Handlebars.compile(source);
      $(target).html(template({content : data}));
    }
  };

  // Call helpers.doneTyping on last keystroke (on release) after .5 seconds
  $('#searchBox').keyup(function() {
    var text = $('#searchBox').val();
    clearTimeout(timer);
    if (text) {
      timer = setTimeout(function() {
        if (current_request) current_request.abort();
        current_request = helpers.doneTyping(text);
      }, typingInterval);
    }
  });
};

$(document).ready(function(){
  
  // Handlebars helper
  Handlebars.registerHelper('typeOfFile', function(type) {
    if (type === "song" || type === "podcast") {
      return new Handlebars.SafeString('<i class="fa fa-music"></i>');
    } else if (type === "feature-movie" || type === "tv-episode") {
      return new Handlebars.SafeString('<i class="fa fa-film"></i>');
    } else {
      return type; 
    }
  });

  apple();
  $('input').speechToText();
});
