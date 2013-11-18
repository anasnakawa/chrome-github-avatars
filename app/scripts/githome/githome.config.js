/*!
 * Githome configs
 * 
 * Copyright 2013, Anas Nakawa
 * Released under the MIT license
 *
 */

(function(githome) {
	
	'use strict';

	githome.config = {
		css: {
			global: {
				  normal: 'githome'
				, disabled: 'githome__disabled'
			}
			, user: {
				  normal: 'githome-user'
				, loaded: 'githome-user__loaded'
			}
		}
	};

})( this.githome = this.githome || {});