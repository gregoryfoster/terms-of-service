//http://javascript-array.com/scripts/jquery_simple_drop_down_menu/

var timeout    = 500;
var closetimer = 0;
var ddmenuitem = 0;

function jsddm_open(){
	jsddm_canceltimer();
	jsddm_close();
	ddmenuitem = jQuery(this).find('ul').css('visibility', 'visible');
}

function jsddm_close(){
	if(ddmenuitem){
		ddmenuitem.css('visibility', 'hidden');
	}
}

function jsddm_timer()
{  closetimer = window.setTimeout(jsddm_close, timeout);}

function jsddm_canceltimer()
{  if(closetimer)
   {  window.clearTimeout(closetimer);
      closetimer = null;}}

jQuery(document).ready(function(){  
jQuery('ul.bmm > li').bind('mouseover', jsddm_open);
jQuery('ul.bmm > li').bind('mouseout',  jsddm_timer);
});

document.onclick = jsddm_close;