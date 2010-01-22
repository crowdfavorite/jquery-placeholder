/**
 * Placeholder
 * @requires jQuery v1.2 or above
 *
 * Version: 1.0
 * Patches the HTML5 placeholder atttribute functionality for browsers that don't support it
 */
;(function($) {
	$.placeholders = function() {
		/**
		 * If the browser already supports placeholders, don't run.
		 */
		if ('placeholder' in document.createElement('input')) {
			return null;
		};
		
		$('input[placeholder]').each(function(){
			var _this = $(this);
			// Set the placeholdertext attribute to the title
			prepPlaceholder(_this);
			_this.focus(function(){
				togglePlaceholder(_this);
			});
			_this.blur(function(){
				togglePlaceholder(_this);
			});
		});
		clearPlaceholdersOnSubmit();
		
	};
	
	$.placeholders.settings = {
		classname: 'cfp-placeholder'
	};

	/*Private helper functions */
	
	function prepPlaceholder(el) {
		var c = $.placeholders.settings.classname;
		
		if(el.attr('value') == '' || el.attr('value') == el.attr('placeholder')) {
			el.addClass(c);
			if(el.attr('value') == '') {
				el.attr('value', el.attr('placeholder'));
			}
		} else {
			el.removeClass(c);
		}
	}
	function togglePlaceholder(el) {
		// Check if the input already has a value...
		if((el.attr('value') != '') && (el.attr('value') != el.attr('placeholder'))) {
			return false;
		}
		
		if(el.attr('value') == el.attr('placeholder')) {
			el.attr('value', '');
		} else if(el.attr('value' == '')) {
			el.attr('value', el.attr('placeholder'))
		}
		el.toggleClass($.placeholders.settings.classname);
	}
	function clearPlaceholdersOnSubmit() {
		$('form').submit(function(){
			$('input[placeholder]').each(function(){
				var _this = $(this);
				if(_this.attr('value') == _this.attr('placeholder')) {
					_this.attr('value','');
				}
			});
		});
	}
})(jQuery);