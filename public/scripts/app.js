$(function() {
    $('.error-null').hide();
    $('.error-exceed').hide();
    $('.new-tweet').hide();

    $('.button').on('click', function() {
        $('.new-tweet').slideToggle('slow');
        $("textarea").focus();
      });


    function renderTweets(tweetArray) {
      tweetArray.forEach (function(tweet) {
      var $tweet = createTweetElement(tweet);
      $('#all-tweets').prepend($tweet);
      });
    };

    function createTweetElement(tweet) {
      let $tweet = $('<article>').addClass('tweet');
      let $user = $ ('<header>').addClass('user');
      let $name = $('<h2>').addClass('name').text(tweet.user.name);
      let $handle = $('<p>').addClass('handle').text(tweet.user.handle);
      let $avatars = $('<img>').addClass('avatars').attr("src", tweet.user.avatars.small);
      let $content = $('<p>').addClass('content').text(tweet.content.text);
      let $footer = $('<footer>').addClass('tweet-footer');
      let $time = $('<p>').addClass('created_at').text(tweet.created_at);

      $tweet.append($user);
      $user.append($avatars);
      $user.append($name);
      $user.append($handle);
      $tweet.append($content);
      $tweet.append($footer)
      $footer.append($time);
      $time.append(`<a href="#" class="material-icons">repeat</a>`, `<a href="#" class="material-icons">favorite</a>`, `<a href="#" class="material-icons">assistant_photo</a>`);
      return $tweet;
    }

    $('.error-null').hide();
    $('.error-exceed').hide();

    $('form#formID').on('submit', function (event) {
      event.preventDefault();
      //Grab content of the form
      let formData = $('form#formID').serialize();
      let textBox = $('textarea').val();
      //Submit using ajax
      if (textBox === '') {
        $('.error-exceed').hide();
        $('.error-null').slideDown()
      } else if (textBox.length > 140) {
        $('.error-null').hide();
        $('.error-exceed').slideDown()
      } else {
        $('.error-null').slideUp();
        $('.error-exceed').slideUp();
        $.ajax('/tweets/', {
        method: 'POST',
        data: formData
        }).then(function() {
        //Clears the form
        $('textarea').val('');
        $('.counter').text(140);
        $('#all-tweets').empty();
        return $.ajax('/tweets/');
        }).then(renderTweets);
      }
    })

    function loadTweets() {
      $.ajax('/tweets', {
        method: 'GET',
        success: function (data) {
          console.log('success', data)
          renderTweets(data)
        }
      })
    }
loadTweets();


});





