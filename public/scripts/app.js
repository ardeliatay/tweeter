$(function() {
    $('.error-null').hide();
    $('.error-exceed').hide();
    $('.new-tweet').hide();

    //New tweet form slides down when compose button is clicked
    $('.button').on('click', function() {
      $('.new-tweet').slideToggle('slow');
      $("textarea").focus();
    });

    //Takes in array of tweet objects and append each one to tweets container
    function renderTweets(tweetArray) {
      tweetArray.forEach (function(tweet) {
      var $tweet = createTweetElement(tweet);
      $('#all-tweets').prepend($tweet);
      });
    };

    //Takes in a tweet object and returns a tweet <article> element
    function createTweetElement(tweet) {
      let $tweet = $('<article>').addClass('tweet');
      let $user = $ ('<header>').addClass('user');
      let $name = $('<h2>').addClass('name').text(tweet.user.name);
      let $handle = $('<p>').addClass('handle').text(tweet.user.handle);
      let $avatars = $('<img>').addClass('avatars').attr("src", tweet.user.avatars.small);
      let $content = $('<p>').addClass('content').text(tweet.content.text);
      let $footer = $('<footer>').addClass('tweet-footer');
      let $time = $('<p>').addClass('created_at').text(moment(tweet.created_at).fromNow());

      $tweet.append($user);
      $user.append($avatars);
      $user.append($name);
      $user.append($handle);
      $tweet.append($content);
      $tweet.append($footer)
      $footer.append($time);
      $time.append(`<a href="#" class="material-icons">repeat</a>`, `<a href="#" class="material-icons">favorite</a>`, `<a href="#" class="material-icons">assistant_photo</a>`);
      return $tweet;
    };

    $('form#formID').on('submit', function (event) {
      event.preventDefault();
      //Grab content of the form
      let formData = $('form#formID').serialize();
      let textBox = $('textarea').val();
      if (textBox === '') {
        $('.error-exceed').hide();
        $('.error-null').slideDown()
      } else if (textBox.length > 140) {
        $('.error-null').hide();
        $('.error-exceed').slideDown()
      } else {
        $('.error-null').slideUp();
        $('.error-exceed').slideUp();
        //If input passes validation, submit using ajax
        $.ajax('/tweets/', {
          method: 'POST',
          data: formData
        }).then(function() {
          //Clear the form
          $('textarea').val('');
          $('.counter').text(140);
          $('#all-tweets').empty();
          return $.ajax('/tweets/');
        }).then(renderTweets);
      };
    });

    function loadTweets() {
      $.ajax('/tweets', {
        method: 'GET',
        success: function (data) {
          console.log('success', data)
          renderTweets(data)
        }
      });
    };

loadTweets();

});





