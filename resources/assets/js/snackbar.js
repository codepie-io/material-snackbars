(function($, window){

    "use strict";

    var SnackBar = function (options) {
        // Initialize instance.
        this.init(options);
    };

    SnackBar.prototype.init = function (options) {

        this.options = $.extend({}, this.defaults, options);
        var $snackBar = $(document.createElement('div'));
        $snackBar.addClass(this.CssClasses_.SNACKBAR);
        this.options.alignCenter?$snackBar.addClass(this.CssClasses_.ALIGN_CENTER):'';
        this.options.multiLine?$snackBar.addClass(this.CssClasses_.MULTILINE):'';
        this.randomId = this.getRandomId();
        $snackBar.attr('id',this.randomId);
        var surfaceText =  document.createElement('div');
        surfaceText.className = this.CssClasses_.SURFACE_TEXT;
        surfaceText.innerText = this.options.messageText;
        var surface =  document.createElement('div');
        surface.className = this.CssClasses_.SURFACE;
        surface.appendChild(surfaceText);
        if(this.options.showButton){
            var button =  document.createElement('button');
            button.className = 'md-button md-button--accent md-snackbar__button';
            button.innerText = this.options.buttonText;
            surface.appendChild(button);
        }
        $snackBar.append(surface).appendTo('body');
        this.$snackBar = $('#'+this.randomId);
        this.$snackBar.addClass(this.CssClasses_.IS_ANIMATING);
        this.$surface = this.$snackBar.find('.'+this.CssClasses_.SURFACE);
        this.boundOnTransitionEnd = this.onTransitionEnd_.bind(this);
        this.boundOnTransitionEndDestroy = this.onTransitionEndDestroy_.bind(this);
        var snackBarLength = $('body').find('.md-snackbar.md-snackbar--open').length;
        if(this.options.showButton){
            this.$button = $snackBar.find('.md-snackbar__button');
            this.$button.on('click', this.onButtonClick_.bind(this));
        }
        if(snackBarLength > 0){
            var snackBar = $('body').find('.md-snackbar.md-snackbar--open');
            var that = snackBar.data('ca.snack.bar');
            that.$snackBar.on('hidden',
                function(){
                    window.setTimeout(
                        function () {this.showSnackBar_();
                        }.bind(this), 300);
                }.bind(this)
            );
            clearTimeout(that.hideTimeOut);
            that.hideSnackBar_();
            this.$snackBar.data('ca.snack.bar', this);
            return;
        }
        window.setTimeout(function () {
            this.showSnackBar_();
        }.bind(this), 300);
        this.$snackBar.data('ca.snackbar', this);
        return this.$snackBar;
    };

    SnackBar.VERSION = '1.0';

    SnackBar.prototype.defaults = {
        messageText: '',
        buttonText: 'UNDO',
        showButton: false,
        autoClose: true,
        multiLine: false,
        alignCenter: false,
        closeTimeOut: 3000
    };

    SnackBar.prototype.CssClasses_ = {
        SURFACE: 'md-snackbar__surface',
        ALIGN_CENTER: 'md-snackbar--center',
        MULTILINE: 'md-snackbar--multiline',
        SURFACE_TEXT: 'md-snackbar__text',
        SNACKBAR: 'md-snackbar',
        IS_OPEN: 'md-snackbar--open',
        IS_ANIMATING: 'md-snackbar--animating'
    };

    SnackBar.prototype.Constant_ = {
        OPEN_TRANSITION_DELAY: 100,
        TRANSITION_DURATION_FRACTION: 0.8,
        CLOSE_TIMEOUT: 3000
    };

    SnackBar.prototype.showSnackBar_ = function(){
        this.$snackBar.addClass(this.CssClasses_.IS_OPEN);
        this.$surface.on('transitionend', this.boundOnTransitionEnd);
        this.$snackBar.trigger("ca.snackbar.shown");
        if(this.options.autoClose){
            this.hideTimeOut = window.setTimeout(
                function() {
                    this.hideSnackBar_();
                }.bind(this), this.options.closeTimeOut
            );
        }
    };

    SnackBar.prototype.hideSnackBar_ = function(){
        this.$snackBar.removeClass(this.CssClasses_.IS_OPEN).addClass(this.CssClasses_.IS_ANIMATING);
        this.$surface.on('transitionend', this.boundOnTransitionEndDestroy);
        this.$snackBar.trigger("ca.snackbar.hidden");
    };

    SnackBar.prototype.onTransitionEndDestroy_ = function () {
        this.$snackBar.removeClass(this.CssClasses_.IS_ANIMATING);
        this.$surface.unbind('transitionend',this.boundOnTransitionEndDestroy); //TODO check here the code
        this.options.showButton?this.$button.unbind('click'):'';
        this.$snackBar.remove();
    };

    SnackBar.prototype.onTransitionEnd_ = function () {
        this.$snackBar.removeClass(this.CssClasses_.IS_ANIMATING);
        this.$surface.unbind('transitionend',this.boundOnTransitionEnd);
    };

    SnackBar.prototype.onButtonClick_ = function () {
        this.$snackBar.trigger("ca.snackbar.clicked");
        this.hideSnackBar_();
    };

    SnackBar.prototype.getRandomId = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4();
    };

    var snackBar = function (options) {
        var snackBar =  new SnackBar(options);
        return snackBar.$snackBar;
    };

    if( !window.snackBar ) {
        window.snackBar = snackBar;
    }

})(jQuery, typeof window !== 'undefined' ? window : this);