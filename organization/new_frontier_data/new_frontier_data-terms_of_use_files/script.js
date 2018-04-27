jQuery(document).ready(function(){	
	jQuery("body").on('change',"#billing_email",function(){		
		jQuery( document.body ).trigger( 'update_checkout' );		
	});
});
