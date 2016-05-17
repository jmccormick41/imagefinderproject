$(document).ready(function() {

    //clear search text on click
    $("#search").click(function() {
        $(this).val('');
    });

    //global variables
    var $submitBtn  = $("#submit"); 
    var $searchBar = $("#search");
    var $photos = $("#photos");
    var $clear = $("#clear");
    
    //submit button click event
    $submitBtn.click(function(evt) {
        
        evt.preventDefault();
        
        //let user know if search is blank
        if ($searchBar.val() === "") {
            alert("Please enter a tag!");
            $submitBtn.prop('disabled', false);
        } else {
        
        //change button text while AJAX is loading
        $submitBtn.prop('disabled', true).val("Searching...");
        
        //tag entered in search bar
        var searchTerm = $("#search").val();  
        //API link for $.getJSON method
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        //data to be sent for $.getJSON method
        var flickrOptions = {
            tags: searchTerm,
            format: "json"    
        };
        //callback function for $.getJSON method
        function displayPhotos(data) {
            //html to put photos returned from $.getJSON method in place
            var photoHTML = '<ul>';
            $.each(data.items, function(i, photo) {
                photoHTML += '<li class="grid-25 tablet-grid-50">';
                photoHTML += '<a href="' + photo.link + '" class="image" target="_blank">';
                photoHTML += '<img src="' + photo.media.m + '"></a></li>';
            });
            photoHTML += '</ul>';
            //add HTML to the DOM
            $photos.html(photoHTML);
            //re-enable submit button
            $submitBtn.prop('disabled', false).val("Submit");
            
            //alert if no search results returned
            if (photoHTML == "<ul></ul>") {
                $photos.html("<p>Your search returned no results</p>");
            }
        }
        };
        
        //load AJAX
        $.getJSON(flickrAPI, flickrOptions, displayPhotos);
        
    });
    
    //press enter to search
    $($searchBar).keyup(function(event){
    if(event.keyCode == 13) {
      $submitBtn.click();
    }
  });
    
    //clear search results
    $($clear).click(function() {
        $("ul").empty();
    })

 
  }); 
    