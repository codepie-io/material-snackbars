(function ($) {

    "use strict";

    var MaterialSnackBar = function () {
        // Initialize instance.
        this.init();
    };

    MaterialSnackBar.prototype.init = function () {

        var $snackBar = $(document.createElement('div'));
        $snackBar.addClass(this.CssClasses_.SNACKBAR);

        this.randomId = this.getRandomId();
        $snackBar.attr('id',this.randomId);

        var surfaceText =  document.createElement('div');
        surfaceText.className = this.CssClasses_.SURFACE_TEXT;
        surfaceText.innerText = this.defaults.MSG;
        var surface =  document.createElement('div');
        surface.className = this.CssClasses_.SURFACE;
        surface.appendChild(surfaceText);
        if(this.defaults.HAS_BTN){
            var button =  document.createElement('button');
            button.className = 'md-button md-button--accent';
            button.innerText = this.defaults.BTN_TEXT;
            surface.appendChild(button);
        }
        $snackBar.append(surface).appendTo('body');

        this.$snackBar = $('#'+this.randomId);
        this.$snackBar.addClass(this.CssClasses_.IS_ANIMATING);
        this.$surface = this.$snackBar.find('.'+this.CssClasses_.SURFACE);

        this.boundOnTransitionEnd = this.onTransitionEnd_.bind(this);
        this.boundOnTransitionEndDestroy = this.onTransitionEndDestroy_.bind(this);
        //this.update = this.update.bind(this);
        var snackBarLength = $('body').find('.md-snackbar.md-snackbar--open').length;
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
        this.$snackBar.data('ca.snack.bar', this);
    };

    MaterialSnackBar.VERSION = '1.0';

    MaterialSnackBar.prototype.defaults = {
        MSG: 'Hello World!',
        BTN_TEXT: 'UNDO',
        IS_OPEN: 'md-snackbar--open',
        IS_ANIMATING: 'md-snackbar--animating',
        HAS_BTN: false
    };

    MaterialSnackBar.prototype.CssClasses_ = {
        SURFACE: 'md-snackbar__surface',
        SURFACE_TEXT: 'md-snackbar__text',
        SNACKBAR: 'md-snackbar',
        IS_OPEN: 'md-snackbar--open',
        IS_ANIMATING: 'md-snackbar--animating'
    };

    MaterialSnackBar.prototype.Constant_ = {
        OPEN_TRANSITION_DELAY: 100,
        TRANSITION_DURATION_FRACTION: 0.8,
        CLOSE_TIMEOUT: 3000
    };

    MaterialSnackBar.prototype.showSnackBar_ = function(){
        this.$snackBar.addClass(this.CssClasses_.IS_OPEN);
        this.$surface.on('transitionend', this.boundOnTransitionEnd);
        window.setTimeout(function () {
            this.hideSnackBar_();
        }.bind(this), this.Constant_.CLOSE_TIMEOUT);

        this.hideTimeOut = setTimeout(
            function() {
                this.hideSnackBar_();
            }.bind(this), this.Constant_.CLOSE_TIMEOUT
        );
    };

    MaterialSnackBar.prototype.hideSnackBar_ = function(){
        this.$snackBar.removeClass(this.CssClasses_.IS_OPEN).addClass(this.CssClasses_.IS_ANIMATING);
        this.$surface.on('transitionend', this.boundOnTransitionEndDestroy);
        this.$snackBar.trigger("hidden");
    };

    MaterialSnackBar.prototype.onTransitionEndDestroy_ = function () {
        this.$snackBar.removeClass(this.CssClasses_.IS_ANIMATING);
        this.$surface.unbind('transitionend',this.boundOnTransitionEndDestroy);
        this.$snackBar.remove();
    };

    MaterialSnackBar.prototype.onTransitionEnd_ = function () {
        this.$snackBar.removeClass(this.CssClasses_.IS_ANIMATING);
        this.$surface.unbind('transitionend',this.boundOnTransitionEnd);
    };

    MaterialSnackBar.prototype.getRandomId = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4();
    };


    var snackBar = function () {
        new MaterialSnackBar();
    };

    if( !window.snackBar ) {
        window.snackBar = snackBar;
    }

}( jQuery ));