(function($) {

    // here we go!
    $.uiloading = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {
            label1: 'Procesando',
            label2: '',
            time: 300
        };

        // to avoid confusions, use "plugin" to reference the current
        // instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('uiloading').settings.propertyName from outside
        // the plugin, where "element" is the element the plugin is
        // attached to;
        plugin.settings = {};

        // reference to the jQuery version of DOM element the plugin is attached to
        var $element = $(element),
                element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default
            // and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);
            
            uiloading();

            //on url changes...
            /*window.onhashchange = function() {
                plugin.hashchanged();
            }*/
        };

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('uiloading').publicMethod(arg1, arg2, ... argn)
        // from outside the plugin, where "element"
        // is the element the plugin is attached to;
                
        plugin.show_loading = function(){
            $('#jq_ui_loading_bg').fadeIn(defaults.time);
            $('body').css('overflow','hidden');
        };
        
        plugin.hide_loading = function(){
            $('#jq_ui_loading_bg').fadeOut(defaults.time);
            $('body').css('overflow','auto');
        };

        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)
        uiloading = function(item) {
            $('body').prepend('<div id="jq_ui_loading_bg">' +
            '<div id="ui_content"><div id="ui_label1">' + defaults.label1 + '</div><div id="ui_label2">' + defaults.label2 + '</div></div>' +
                    '</div>');
        };

        // fire up the plugin!
        // call the "constructor" method
        plugin.init();

    },

    // add the plugin to the jQuery.fn object
    $.fn.uiloading = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined === $(this).data('uiloading')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.uiloading(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('uiloading').publicMethod(arg1, arg2, ... argn) or
                // element.data('uiloading').settings.propertyName
                $(this).data('uiloading', plugin);

            }

        });

    };

})(jQuery);