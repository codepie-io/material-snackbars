
$('.show-snackbar').click(function(){
    var msg = $('.message').val();
    $('#notification').html('');
    var showButton = $('#yesShowBtn').is(':checked');
    var alignCenter = $('#yesAlignCenter').is(':checked');
    var autoClose = $('#yesAutoClose').is(':checked');
    var multiLine = $('#yesMultiLine').is(':checked');
    var buttonText = $('#btnText').val();
   snackBar({
        messageText: msg,
        buttonText: buttonText,
        showButton: showButton,
        alignCenter: alignCenter,
        autoClose: autoClose,
        multiLine: multiLine
    }).on('ca.snackbar.clicked', function(){
        $('#notification').html('You just clicked snackbar button');
    });
});
