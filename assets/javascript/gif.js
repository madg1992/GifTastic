// function that is to run upon page loading
$(function() {
  renderButtons(topics, 'searchButton', '#buttons-view');
  console.log("Page Loaded");
})

  // initial array of Disney Characters
  var topics = ["Jafar", "Mickey Mouse", "Ariel", "Simba", "Buzz Lightyear", "Olaf", "Stich", "Genie", "Maleficent", "Aladdin"];

  function renderButtons(topics,classToAdd,areaToAddButtons){
    // empties out the input area where new buttons are created
    $(areaToAddButtons).empty();
    for(var i = 0; i < topics.length; i++){
      var a = $('<button>');
      a.addClass(classToAdd);
      a.attr('data-name', topics[i]);
      a.text(topics[i]);
      $(areaToAddButtons).append(a);
    }
  }

  $(document).on('click','.searchButton', function(){
    var disneyChar = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+disneyChar+"&api_key=fUDAuKBG6mh5jPllypinr6PkAmcBBAkP&limit=10";

    // fixed "ajax is not a function by adding uncompressed version of jquery instead of slim"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
        console.log(response);
        for(var i = 0; i < response.data.length; i++){
          var disneyDiv = $('<div class="searchResult">');
          var rating = response.data[i].rating;
          var p = $('<p>').text("Rating: "+ rating);
          var animatedGif = response.data[i].images.fixed_height.url;
          var stillGif = response.data[i].images.fixed_height_still.url;
          var image = $('<img>');
          image.attr('src',stillGif);
          image.attr('data-still',stillGif);
          image.attr('data-animated', animatedGif);
          image.attr('data-state', 'still');
          image.addClass('searchImage');
          disneyDiv.append(p);
          disneyDiv.append(image);
          $('#disney-view').append(disneyDiv);
        }
    })
  })