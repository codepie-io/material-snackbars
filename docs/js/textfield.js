(function ($) {

    "use strict";

    var MaterialTextField = function (element) {
        this.$element = $(element);
        this.maxRows = this.Constant_.NO_MAX_ROWS;
        // Initialize instance.
        this.init();
    };

    MaterialTextField.prototype.init = function () {
        if(this.$element){
            this.$input = this.$element.find('.'+this.CssClasses_.INPUT);
            if(this.$input){
                if (typeof this.$input.attr(this.Constant_.MAX_ROWS_ATTRIBUTE) !== typeof undefined && this.$input.attr(this.Constant_.MAX_ROWS_ATTRIBUTE) !== false) {
                    this.maxRows = parseInt(this.$input.attr(this.Constant_.MAX_ROWS_ATTRIBUTE),10);
                    if(isNaN(this.maxRows)){
                        this.maxRows = this.Constant_.NO_MAX_ROWS;
                    }
                }
                if (typeof this.$input.attr('placeholder') !== typeof undefined && this.$input.attr('placeholder') !== false) {
                    this.$element.addClass(this.CssClasses_.HAS_PLACEHOLDER);
                }
                this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
                this.boundFocusHandler = this.onFocus_.bind(this);
                this.boundBlurHandler = this.onBlur_.bind(this);
                this.boundResetHandler = this.onReset_.bind(this);
                this.$input.on('input', this.boundUpdateClassesHandler);
                this.$input.on('focus', this.boundFocusHandler);
                this.$input.on('blur', this.boundBlurHandler);
                this.$input.on('reset', this.boundResetHandler);
                if(this.maxRows !== this.Constant_.NO_MAX_ROWS){
                    //TODO
                    this.boundKeyDownHandler = this.onKeyDown_.bind(this);
                    this.$input.on('reset.ca.text-field', this.boundKeyDownHandler);
                }
                var invalid = this.$element.hasClass(this.CssClasses_.IS_INVALID);
                this.updateClasses_();
                this.$element.addClass(this.CssClasses_.IS_UPGRADED);
                if(invalid){
                    this.$element.addClass(this.CssClasses_.IS_INVALID);
                }
                if (typeof this.$input.attr('autofocus') !== typeof undefined && this.$input.attr('autofocus') !== false) {
                    this.$element.focus();
                    this.checkFocus();
                }
            }
        }
    };

    MaterialTextField.VERSION = '1.0';

    MaterialTextField.prototype.Constant_ = {
        NO_MAX_ROWS: -1,
        MAX_ROWS_ATTRIBUTE: 'maxrows'
    };

    MaterialTextField.prototype.CssClasses_ = {
        LABEL: 'option',
        INPUT: 'md-textfield__input',
        IS_DIRTY: 'is-dirty',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_INVALID: 'is-invalid',
        IS_UPGRADED: 'is-upgraded',
        HAS_PLACEHOLDER: 'has-placeholder'
    };

    MaterialTextField.prototype.onKeyDown_ = function (event) {
        var currentRowCount = event.target.value.split('\n').length;
        if (event.keyCode === 13) {
            if (currentRowCount >= this.maxRows) {
                event.preventDefault();
            }
        }
    };

    MaterialTextField.prototype.onFocus_ = function () {
        this.$element.addClass(this.CssClasses_.IS_FOCUSED);
    };

    MaterialTextField.prototype.onBlur_ = function () {
        this.$element.removeClass(this.CssClasses_.IS_FOCUSED);
    };

    MaterialTextField.prototype.onReset_ = function () {
        this.updateClasses_();
    };

    MaterialTextField.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkValidity();
        this.checkDirty();
        this.checkFocus();
    };

    MaterialTextField.prototype.checkDisabled = function () {
        if(this.$input.prop('disabled')){
            this.$element.addClass(this.CssClasses_.IS_DISABLED);
        } else{
            this.$element.removeClass(this.CssClasses_.IS_DISABLED);
        }
    };

    MaterialTextField.prototype['checkDisabled'] = MaterialTextField.prototype.checkDisabled;

    MaterialTextField.prototype.checkFocus = function () {
        if (typeof this.$input.attr('autofocus') !== typeof undefined && this.$input.attr('autofocus') !== false) {
            this.$element.addClass(this.CssClasses_.IS_FOCUSED);
        }
    };
    MaterialTextField.prototype['checkFocus'] = MaterialTextField.prototype.checkFocus;

    MaterialTextField.prototype.checkValidity = function () {
        if (typeof this.$input.get(0).validity !== typeof undefined && this.$input.get(0).validity) {
            if (this.$input.get(0).validity.valid) {
                this.$element.removeClass(this.CssClasses_.IS_INVALID);
            } else {
                this.$element.removeClass(this.CssClasses_.IS_INVALID);
            }
        }
    };
    MaterialTextField.prototype['checkValidity'] = MaterialTextField.prototype.checkValidity;

    MaterialTextField.prototype.checkDirty = function () {
        if ((this.$input.val() !='') && (this.$input.val().length > 0)) {
            this.$element.addClass(this.CssClasses_.IS_DIRTY);
        } else {
            this.$element.removeClass(this.CssClasses_.IS_DIRTY);
        }
    };
    MaterialTextField.prototype['checkDirty'] = MaterialTextField.prototype.checkDirty;

    MaterialTextField.prototype.disable = function () {
        this.$input.prop( "disabled",true);
        this.updateClasses_();
    };
    MaterialTextField.prototype['disable'] = MaterialTextField.prototype.disable;

    MaterialTextField.prototype.enable = function () {
        this.$input.prop( "disabled",false);
        this.updateClasses_();
    };
    MaterialTextField.prototype['enable'] = MaterialTextField.prototype.enable;

    MaterialTextField.prototype.change = function (value) {
        this.$input.val(value || '');
        this.updateClasses_();
    };
    MaterialTextField.prototype['change'] = MaterialTextField.prototype.change;


    function Plugin() {
        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('ca.text-field');
            if (!data) $this.data('ca.text-field', (data = new MaterialTextField(this)));
        });
    }

    $.fn.MaterialTextField = Plugin;
    $.fn.MaterialTextField.Constructor = MaterialTextField;

    $(window).on('load', function () {
        $('[data-toggle="textfield"]').each(function () {
            var $textFields = $(this);
            Plugin.call($textFields)
        })
    });

}( jQuery ));