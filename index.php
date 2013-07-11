<!doctype html>
<html>
  <head>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.1/jquery.min.js"></script>
    <link href="Flat-UI-master/css/bootstrap.css" rel="stylesheet">
    <link href="Flat-UI-master/css/flat-ui.css" rel="stylesheet">
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="apple.css">
    <script src="underscore-min.js"></script>
    <script src="jquery.speechtotext.min.js"></script>
    <script src="apple.js"></script>
  </head>
  <body>
    <div class="container">
      <div class="search">
        <input id="searchBox" class="span3" type="text" placeholder="Search Itunes" />
        <div class="greetings">
          <p><h4>Apple Itunes</h4></p>
        </div>
      </div>
      <div class="side">
        <h3>Available File Types</h3>
        <div class="sidePanel"></div>
      </div>

      <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
          <h3>Preview</h3>
        </div>
        <div class="modal-body"></div>
      </div>

      <div class="content">
        <h3>Matching Searches</h3>
          <div class="searchContent"></div>
      </div>
    </div>
  </body>
</html>
