
$('.show-snackbar').click(function(){
    var msg = $('.message').val();
    var showButton = $('#yesShowBtn').is(':checked');
    var alignCenter = $('#yesAlignCenter').is(':checked');
    var buttonText = $('#btnText').val();
    snackBar({
        messageText: msg,
        buttonText: buttonText,
        showButton: showButton,
        alignCenter: alignCenter
    });
});