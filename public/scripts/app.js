/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


$(function() {

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



    $('form#formID').on('submit', function (event) {
      event.preventDefault();
      //Grab content of the form
      let formData = $('form#formID').serialize();
      let textBox = $('textarea').val();
      //Submit using ajax
      if (textBox === '') {
        alert('Enter a tweet!');
      } else if (textBox.length > 140) {
        alert('Tweet is too long!')
      } else {
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



