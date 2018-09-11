$(function() {
  $('textarea').on('keyup change', function() {
    let maxCharacters = 140;
    let characters = this.value.length
    let counter = $(this).siblings('.counter');
    $(counter).text(maxCharacters - characters);
    if (characters > maxCharacters) {
      $(counter).addClass('red');
    } else {
      $(counter).removeClass('red');
    }
    });
  console.log(this);
});






