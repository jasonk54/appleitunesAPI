// TODO: Add templating
// TODO: Use backbone to organize code
// TODO: Add preview pop-up
// TODO: Filter option

var PlayHaven = function() {
  var timer, text, entity;
  var typingInterval = 2500;

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
      var getKind = _.pluck(data.results, 'kind')
      var kind = _.uniq(getKind);

      // Appends type of files
      $('.sidePanel').empty();                           // Clears before appending
      for (var i = 0; i < kind.length; i++) {
         $('.sidePanel').append("<div class='type'>" + kind[i] +  "</div>");
      };

      // Appends artist name and track name.  All genre
      $('.searchContent').empty();                      // Clears before appending
      for (var i = 0; i < data.results.length; i++) {
        $('.searchContent').append("<div class=" + i + ">Name: " + data.results[i].artistName + "</div>")
        $('.searchContent').append("<div class=" + i + ">Track Name: " + data.results[i].trackName +
          "</div><input type='button' class='preview' value='Preview'></input><br><br>")
      };

      // replace this with a templating engine, such as handlerbars or underscore
      // for (var i = 0; i < data.results.length; i++) {
        // if clicked embed data.results[i].previewUrl
        // $('.searchContent').append("<div class=" + i + ">" + data.results[i].artistName + "</div>");

        // $('#previewPanel').append("<embed src=" + data.results[i].previewUrl + " width='100%' height='60'>");
        // console.log(data.results[i].artistName);
        // console.log('collection: ' + data.results[i].collectionName);
        // console.log('track: ' + data.results[i].trackName)
      // };

      // When the kind is clicked, embeds a preview of that file
      // $('.searchContent').click(function(e) {
      //   var x = $(e.target).attr('class');
      //   console.log(x)
      //   $('.previewPanel').append("<div><embed src=" + data.results[x].previewUrl + " width='100%' height='60%'></div>");
      // })
    }
    // // Filters the output
    // filter: function(content) {
    //   $('#searchBox').hide();
    //   $('#filterBox').toggle();
    //   var filterContent = $('#filterBox').val();
    // },

  };

  var appleAJAXHandlers = {
    success: function(data, status, jqXHR) {
      helpers.parsedOutput(data);
    },
    error: function(jqXHR, status, error) {
      console.log(error);
    }
  };

  // Call helpers.doneTyping on last keystroke (on release) after 3 seconds
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