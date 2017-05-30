(function ($) {

    "use strict";

    var MaterialRadio = function (element) {
        this.$element = $(element);
        // Initialize instance.
        this.init();
    };
    window['MaterialRadio'] = MaterialRadio;

    MaterialRadio.prototype.init = function () {
        if(this.$element){

            this.$radioBtn = this.$element.find('.'+this.CssClasses_.RADIO_BTN);


            this.boundChangeHandler_ = this.onChange_.bind(this);



            var outerCircle = $( "<span></span>");
            outerCircle.addClass(this.CssClasses_.RADIO_OUTER_CIRCLE)
                .appendTo(this.$element.get(0));
            var innerCircle = $( "<span></span>");
            innerCircle.addClass(this.CssClasses_.RADIO_INNER_CIRCLE)
                .appendTo(this.$element.get(0));
            if(this.$element.hasClass(this.CssClasses_.RIPPLE_EFFECT)){
                var rippleContainer = $( "<span></span>");
                rippleContainer.addClass(this.CssClasses_.RIPPLE_CONTAINER)
                    .addClass(this.CssClasses_.RIPPLE_EFFECT)
                    .addClass(this.CssClasses_.RIPPLE_CENTER).appendTo();
                rippleContainer.on('mouseup', this.boundMouseUpHandler_);
                var ripple = document.createElement('span');
                ripple.classList.add(this.CssClasses_.RIPPLE);
                rippleContainer.append(ripple).appendTo(this.$element.get(0));
            }
            this.$radioBtn.on('change', this.boundChangeHandler_);

            this.updateClasses_();
            this.$element.addClass(this.CssClasses_.IS_UPGRADED);
        }
    };

    MaterialRadio.VERSION = '1.0';

    MaterialRadio.prototype.Constant_ = { TINY_TIMEOUT: 0.001 };

    MaterialRadio.prototype.checkElement = function(){
        return  this.$element;
    };

    MaterialRadio.prototype.CssClasses_ = {
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_CHECKED: 'is-checked',
        IS_UPGRADED: 'is-upgraded',
        RADIO: 'md-radio',
        RADIO_BTN: 'md-radio__button',
        RADIO_OUTER_CIRCLE: 'md-radio__outer-circle',
        RADIO_INNER_CIRCLE: 'md-radio__inner-circle',
        RIPPLE_EFFECT: 'md-js-ripple-effect',
        RIPPLE_CONTAINER: 'md-radio__ripple-container',
        RIPPLE_CENTER: 'md-ripple--center',
        RIPPLE: 'md-ripple'
    };

    MaterialRadio.prototype.onChange_ = function () {

        var radios = $('.'+this.CssClasses_.RADIO);

        for (var i = 0; i < radios.length; i++) {
            var button = $(radios[i]).find('.' + this.CssClasses_.RADIO_BTN);

            if(button.attr('name') === this.$radioBtn.attr('name')){
                if (typeof $(radios[i]).data('ca.radio') !== 'undefined') {
                    $(radios[i]).data('ca.radio').updateClasses_();
                }
            }
        }
    };

    MaterialRadio.prototype.onFocus_ = function (event) {
        this.$element.addClass(this.CssClasses_.IS_FOCUSED);
    };

    MaterialRadio.prototype.onBlur_ = function (event) {
        this.$element.removeClass(this.CssClasses_.IS_FOCUSED);
    };

    MaterialRadio.prototype.onMouseup_ = function () {
        this.blur_();
    };

    MaterialRadio.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkToggleState();
    };

    MaterialRadio.prototype.blur_ = function () {
        window.setTimeout(function () {
            this.$radioBtn.blur();
        }.bind(this), this.Constant_.TINY_TIMEOUT);
    };

    MaterialRadio.prototype.checkDisabled = function () {
        if(this.$radioBtn.prop('disabled')){
            this.$radioBtn.addClass(this.CssClasses_.IS_DISABLED);
        } else{
            this.$radioBtn.removeClass(this.CssClasses_.IS_DISABLED);
        }
    };
    MaterialRadio.prototype['checkDisabled'] = MaterialRadio.prototype
        .checkDisabled;

    MaterialRadio.prototype.checkToggleState = function () {
        if (this.$radioBtn.prop('checked')) {
            this.$element.addClass(this.CssClasses_.IS_CHECKED);
        } else {
            this.$element.removeClass(this.CssClasses_.IS_CHECKED);
        }
    };

    MaterialRadio.prototype['checkToggleState'] = MaterialRadio.prototype
        .checkToggleState;

    MaterialRadio.prototype.disable = function () {
        this.$radioBtn.prop('disabled',true);
        this.updateClasses_();
    };
    MaterialRadio.prototype['disable'] = MaterialRadio.prototype.disable;

    MaterialRadio.prototype.enable = function () {
        this.$radioBtn.prop('disabled',false);
        this.updateClasses_();
    };
    MaterialRadio.prototype['enable'] = MaterialRadio.prototype.enable;

    MaterialRadio.prototype.check = function () {
        this.$radioBtn.prop('checked', true);
        this.onChange_(null);
    };

    MaterialRadio.prototype['check'] = MaterialRadio.prototype.check;

    MaterialRadio.prototype.uncheck = function () {
        this.$radioBtn.prop('checked', false);
        this.onChange_(null);
    };
    MaterialRadio.prototype['uncheck'] = MaterialRadio.prototype.uncheck;

    function Plugin() {
        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('ca.radio');
            if (!data) $this.data('ca.radio', (data = new MaterialRadio(this)));
        });
    }

    $.fn.MaterialRadio = Plugin;
    $.fn.MaterialRadio.Constructor = MaterialRadio;

    $(window).on('load', function () {
        $('[data-toggle="radio"]').each(function () {
            var $radio = $(this);
            Plugin.call($radio)
        })
    });

}( jQuery ));