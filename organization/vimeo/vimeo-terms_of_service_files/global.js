// VIMEO BRAIN //
window.addEvent('domready', function(){
    avatar_init();
    start_menudo();
    xsrf_protect();

    //if (document.addEventListener) {
    //    document.addEventListener('copy', copy_protect, false);
    //}
    //else {
    //    document.attachEvent('copy', copy_protect);
    //}

    var anchor = location.hash.substring(1);
    if (anchor == 'signin') loginLightbox();
});

function copy_protect(e) {
    // create fake element
    var sel,
        range,
        chars = /(?:\u200b)/g,
        shadow = new Element('div', {
            style: {
                overflow: 'hidden',
                position: 'absolute',
                top: '-5000px',
                height: '1px'
            }
        });

    if (typeof window.getSelection !== 'undefined') {
        sel = window.getSelection();
        range = sel.getRangeAt(0);

        shadow.appendChild(range.cloneContents());
        shadow.innerHTML = shadow.innerHTML.replace(chars, '');
        document.getElementsByTagName('body')[0].appendChild(shadow);

        sel.selectAllChildren(shadow);

        window.setTimeout(function() {
            shadow.parentNode.removeChild(shadow);
            if (typeof window.getSelection().setBaseAndExtent !== 'undefined') {
                sel.setBaseAndExtent(
                    range.startContainer,
                    range.startOffset,
                    range.endContainer,
                    range.endOffset
                );
            }
        }, 0);
    }
    else {
        sel = document.selection;
        range = sel.createRange();

        shadow.innerHTML = range.htmlText.replace(chars, '');

        var range2 = body.createTextRange();
        range2.moveToElementText(shadow);
        range2.select();

        window.setTimeout(function() {
            shadow.parentNode.removeChild(shadow);
            if (range.text !== '') {
                range.select();
            }
        }, 0);
    }
}

function start_menudo()
{
    if (window.ie && document.all && document.getElementById) {
        var navRoot = document.getElementById("nav");
        if (navRoot)
        for (i = 0; i < navRoot.childNodes.length; i++) {
            var node = navRoot.childNodes[i];
            if (node.nodeName == "LI") {
                node.onmouseover = function() {
                    this.className += " over";
                }
                node.onmouseout = function() {
                   this.className = this.className.replace(" over", "");
                }
            }
        }
    }
}

function swap(e1, e2)
{
    $(e1).style.display = 'none';
    $(e2).style.display = '';
}

var moo_rainbows = [];
var vimeo_dropdowns = [];
var tooltip = false;

function avatar_init()
{
    var avatar_hover = new Element('div', {'id': 'avatar_hover'});
    $(document.body).adopt(avatar_hover);

    tooltip = new Tooltip(false, 'avatar_hover',{
        position: 'tr',
        onclick: true,
        load: '/ajax/user/avatar'
    });
}

function avatar_hover(args)
{
    var x = window.ie && args.offset_x ? -25 : -5;
    var flash = args.flash ? 1 : 0;
    var clip = args.clip ? 1 : 0;
    var y = clip ? -95 : -19;

    $('avatar_hover').setHTML('');

    if (tooltip.element != args.o) {
        tooltip.tooltipOff();
    } else {
        if (tooltip.tool_tip.getStyle('display') != 'none') {
            tooltip.tooltipOff();
            return false;
        }
    }

    tooltip.options.delta_x = x;

    if (args.browser) {
        var browser = $(args.browser);
        tooltip.options.delta_y = browser ? -browser.scrollTop + y : y;
    }
    else {
        tooltip.options.delta_y = y;
    }

    tooltip.options.load_args = { user_id: args.user_id, flash: flash, clip: clip };
    tooltip.element = args.o;
    tooltip.toggleTooltip(args.e);
}

function avatar_contact(obj, user)
{
    refresh_page({
        jdata: { user: user },
        url: '/ajax/user/contact_toggle',
        onComplete: function(data) {
            if (data = Json.evaluate(data)) {
                $(obj).addClass('avatar_link_remove');
                $(obj).removeClass('avatar_link');
                $(obj).setHTML('Remove from contacts');

                for (var i = 0; i < $('avatar_checkboxes').getFirst().getChildren().length; i++) {
                    $('avatar_checkboxes').getFirst().getChildren()[i].getFirst().getFirst().setProperty('src', 'http://a.vimeocdn.com/images/icon_avatar_checked.gif');
                }
            }
            else {
                $(obj).addClass('avatar_link');
                $(obj).removeClass('avatar_link_remove');
                $(obj).setHTML('Add to my contacts');
            }
        }
    });
}

function avatar_subscribe(obj, user_id, subscription)
{
    var subscribe = ($(obj).getFirst().getProperty('src').contains('unchecked')) ? 'true' : 'false';

    refresh_page({
        jdata: { type: subscription,
                 value: subscribe,
                 subject_id: user_id
               },
        url: '/ajax/subscription/toggle',
        onComplete: function() {
            if (subscribe == 'true') {
                $(obj).getFirst().setProperty('src', 'http://a.vimeocdn.com/images/icon_avatar_checked.gif');
            }
            else {
                $(obj).getFirst().setProperty('src', 'http://a.vimeocdn.com/images/icon_avatar_unchecked.gif');
            }
        }
    });
}

function set_reason(o) {
    $('reason').value = $(o).getNext().getText();
}

function toggle_whitelist_video(clip_id, obj) {
    refresh_page({
        jdata: {
            clip_id: clip_id
        },
        url:'/ajax/clip/toggle_whitelist_video',
        onComplete: function(data) {
            $(obj).setHTML(data);
        }
    });
}

function toggle_bury_all(user_id, obj) {
    refresh_page({
        jdata: {
            user_id: user_id
        },
        url:'/ajax/user/toggle_bury_all',
        onComplete: function(data) {
            $(obj).setHTML(data);
        }
    });
}

function faux_link(el)
{
    el = $(el);
    if (el.hasClass('faux_hover')) el.removeClass('faux_hover');
    else el.addClass('faux_hover');
}

/**
 * vimeo_alert() displays a closeable message in the header
 * example: vimeo_alert('Good News!','We\'ve increased the upload limit to 1GB per month!');
 */

function vimeo_alert(headline, text)
{
    var headlineDIV = new Element('div', {'class':'headline'}).setHTML(headline);
    var textDIV = new Element('div', {'class':'text'}).setHTML(text);
    var closewidget = new Element('img', {
        'src': 'http://a.vimeocdn.com/images/undertaker_x_med.png',
        'alt': 'close'
    }).addEvent('click', function(){ alertslide.toggle(); });

    headlineDIV.adopt(closewidget);

    var alertDIV = new Element('div',{'class':'alert'});
    alertDIV.adopt(headlineDIV);
    alertDIV.adopt(textDIV);
    alertDIV.injectBefore($('header'));

    var alertslide = new Fx.Slide(alertDIV,{duration:1000,transition:Fx.Transitions.expoOut});
    alertslide.hide();
    alertslide.toggle();
}

function replace(chr, replace, str) {
    while( str.indexOf(chr) != -1 ) str = str.replace(chr, replace);
    return str;
}

/* returns the value of a (single) select box. */
function field_select_value(fieldId)
{

    if (!$(fieldId)) return false;

    for(var i = 0; i <$(fieldId).options.length; ++i) {
        if ($(fieldId).options[i].selected == true)
            return $(fieldId).options[i].value;
    }

}

/** checks to see if any form element has been changed from its default value **/
function isDirtyForm(o_form)
{
    if ( o_form ) {
        var num_elements = o_form.elements.length;
        for ( var i=0; i < num_elements; i++ )
        {
            var element = o_form.elements[i];
            if ( element.type == "text" || element.tagName == "TEXTAREA" )
            {
                if (element.value != element.defaultValue) return true;
            }
            else if ( element.tagName == "SELECT" )
            {
                var options = element.options;

                var num_options = options.length;
                for ( var j=0; j < num_options; j++)
                {
                    var option = options[j];
                    if ( option.selected != option.defaultSelected ) return true;
                }
            }
        }
    }
    return false;
}

function menudo_search_blur()
{
    var f = $('menudo_search_field');
    if ( f.value == '' ) {
        f.value = 'Search ' + cur_search_type;
    }
}

function menudo_search_click()
{
    var f = $('menudo_search_field');
    if (f.value == 'Search ' + cur_search_type)
        f.value = '';
}

function menudo_search()
{
    var token_value = $('xsrft').value;
    var search_token = token_value.substring(0,8);

    setCookie('searchtoken', search_token);
    var f = $('menudo_search_field').value;
    f = encodeURIComponent(f);
    f = f.replace(/%26/g, '&');
    f = f.replace(/%2F/g, '/');

    switch (cur_search_type) {
        case 'Videos':
            location.href = '/search/videos/search:' + f + '/st/' + search_token;
            break;

        case 'People':
            location.href = '/search/people/search:' + f + '/st/' + search_token;
            break;

        case 'Forums':
            location.href = '/search/forums/search:' + f + '/st/' + search_token;
            break;

        case 'Groups':
            location.href = '/search/groups/search:' + f + '/st/' + search_token;
            break;

        case 'Channels':
            location.href = '/search/channels/search:' + f + '/st/' + search_token;
            break;
    }
}

function menudo_search_change(type)
{
    if ($('menudo_search_field').value.search('Search ') >= 0)
        $('menudo_search_field').value = '';

    $('menudo_search_field').focus();

    cur_search_type = type;
    $$('#menudo_search_subtier ul.menudo_subtier li').removeClass('selected');
    $('menudo_search_' + type.toLowerCase()).addClass('selected');
}

function submit_secure() {
    token_value = $('xsrft').value;
    setCookie('xsrft', token_value);
    this.submit();
}

function addtoken(form) {
    token_value = $('xsrft').value;
    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("style", "display: none");
    hiddenField.setAttribute("name", 'token');
    hiddenField.setAttribute("value", token_value);

    form.appendChild(hiddenField);
}


function xsrf_protect() {
    $$('form').each(function(el) {
        addtoken(el);
        if (el.onsubmit == undefined)
            el.onsubmit = submit_secure;
        el.submitsecure = submit_secure;
    });
}

function refresh_page(o)
{
    var method = o.method ? o.method : 'post';

    var pars = '';
    if (o.form) if ($(o.form))  pars = $(o.form).toQueryString();
    if (o.pars)   pars += o.pars;
    if (o.jdata)  pars += '&jdata=' + Json.toString(o.jdata);

    // attach token to request
    token_value = $('xsrft').value;
    setCookie('xsrft', token_value);
    pars += '&token=' + token_value;

    var method = pars == '' ? 'get' : 'post';

    if (!o.disable_loader) show_loader();

    if (!o.url) {
        alert('url: URL needed');
        return false;
    }

    o.evalScripts = o.evalScripts ? o.evalScripts : false;
    if (o.bind && o.onComplete) o.onComplete = o.onComplete.bind(o.bind);

    if (o.debug) {
        console.log('url: %o \npars: %o', o.url, pars);
    }

    if (o.div) {
        if ( o.onComplete ) {
            var complete = function( data ) { hide_loader(); o.onComplete(data); }
            var ajax_object = new Ajax(o.url, {update: o.div, method: method, postBody: pars, onComplete: complete, evalScripts: o.evalScripts }).request();
        } else {
            var ajax_object = new Ajax(o.url, {update: o.div, method: method, postBody: pars, onComplete: hide_loader, evalScripts: o.evalScripts }).request();
        }
    } else {
        var complete = function(data) {
            hide_loader();

            if (o.onComplete)
                o.onComplete(data);
        }

        var ajax_object = new Ajax(o.url, {method: method, postBody: pars, onComplete: complete, evalScripts: o.evalScripts}).request();
    }

    return ajax_object;
}

function getVersionInfo()
{
    var player = getCookie('html_player') == 1 ? 'HTML' : 'Flash';
    return BrowserDetect.OS + '|' + BrowserDetect.browser + ',' + BrowserDetect.version + '|' + 'Flash,' + GetSwfVer() + '|' + player + ' Player';
}

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Browser unknown";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "Version unknown";
        this.OS = this.searchString(this.dataOS) || "OS unknown";
    },
    isMobile: function() {
        return /(iphone|ipod|android|webos)/.test(navigator.userAgent.toLowerCase());
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var regex = new RegExp(this.versionSearchString + '\\s*([0-9\._]+)');
        var str = dataString.match(regex);
        if (!str) {
            if (this.browser == 'Safari')
                return '2';
            return false;
        }
        return str[1].replace(/_/g, '.');
    },
    dataBrowser: [
        {   string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.platform,
            subString: "iP",
            identity: "Mobile Safari",
            versionSearch: "OS "
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version/"
        },
        {
            prop: window.opera,
            identity: "Opera"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Chrome",
            versionSearch: "Chrome/",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            versionSearch: "Firefox/",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino",
            versionSearch: "Camino/"
        },
        {       // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {       // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS : [
        {
            string: navigator.userAgent,
            subString: "Windows NT 5",
            identity: "Windows XP"
        },
        {
            string: navigator.userAgent,
            subString: "Windows NT 6.1",
            identity: "Windows 7"
        },
        {
            string: navigator.userAgent,
            subString: "Windows NT 6",
            identity: "Windows Vista"
        },
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPhone OS (iPad)"
        },
        {
            string: navigator.userAgent,
            subString: "iP",
            identity: "iPhone OS"
        },
        {
            string: navigator.userAgent,
            subString: "Mac OS X 10_4",
            identity: "Mac OS X 10.4"
        },
        {
            string: navigator.userAgent,
            subString: "Mac OS X 10_5",
            identity: "Mac OS X 10.5"
        },
        {
            string: navigator.userAgent,
            subString: "Mac OS X 10_6",
            identity: "Mac OS X 10.6"
        },
        {
            string: navigator.userAgent,
            subString: "Mac OS X",
            identity: "Mac OS X"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};

window.addEvent('domready', function() { BrowserDetect.init(); });


var comment_disabled = false;

function add_comment(obj_id)
{
    if ( !comment_disabled ) {

        if ( $('new_comment_text_'+obj_id).value == '' ) {
            alert('You must type in a comment first!');
            $('new_comment_text_'+obj_id).focus();
            return false;
        }
        comment_disabled = true;

        $('new_comment_btn_'+obj_id).disable('Posting...');

        var divName = (($('frmDiv_'+obj_id) && $('frmDiv_'+obj_id).value) ?
                       $('frmDiv_'+obj_id).value :
                       'comments_' + obj_id);
        var offset = ($('frmOffset') && $('frmOffset').value ?
                      $('frmOffset').value :
                      '');

        refresh_page({
            div:  divName,
            form: 'frmNewComment_' + obj_id,
            jdata: { version: getVersionInfo() },
            pars: '&limit=-1&id=' + obj_id,
            url:  '/ajax/comment/update_' + $('comment_type_'+obj_id).value,
            onComplete: function() {
                hide_loader();
                comment_disabled = false;
                $('frmNewComment_' + obj_id).reset();

                // we get ALL comments to ensure we get the one they posted.
                // so make sure we clear out the comments-rest-123 if we need to.
                if ($('frmDiv_'+obj_id) && ($('frmDiv_'+obj_id).value != 'comments-rest-'+obj_id)) {
                    if ($('comments-rest-'+obj_id))
                        $('comments-rest-'+obj_id).innerHTML = '';
                }

                $('new_comment_btn_'+obj_id).enable('Post Comment');
                $('new_comment_'+obj_id).removeClass('no_dots');
            }
        });
    }
}

function reply_comment(id, obj_id)
{
    if ( !comment_disabled ) {
        var text = $('comment-reply-text-'+id);
        if ( text.value == '' ) {
            alert('You must type in a comment first!');
            text.focus();
            return false;
        }

        comment_disabled = true;
        var button = $('comment-reply-button-'+id);
        button.disable('Posting...');

        refresh_page({
            div:  'comments_' + obj_id,
            form: 'frmReplyComment'+id,
            jdata: { version: getVersionInfo() },
            pars: '&action=new&id=' + obj_id + '&parent_comment=' + id + '&limit=-1',
            url:  '/ajax/comment/update_'+$('comment_type_'+obj_id).value,
            onComplete: function() {
                hide_loader();
                comment_disabled = false;

                if ($('comments-rest-'+obj_id)) $('comments-rest-'+obj_id).innerHTML = '';
            }
        });
    }
}

function delete_comment(id, obj_id, limit, offset)
{
    if (limit != 0) { limit = -1; offset = 0; }
    if ( confirm('Are you sure you want to delete this comment?') ) {
        refresh_page({
            div:  'comments_'+obj_id,
            pars: '&action=delete&id='+obj_id+'&comment_id='+id + '&limit=' + limit + '&offset=' + offset,
            url:  '/ajax/comment/update_'+$('comment_type_'+obj_id).value,
            onComplete: function() {
                hide_loader();
                // we get ALL comments to ensure they delete one, we show it properly
                if (limit == -1) {
                    if ($('comments-rest-'+obj_id))
                        $('comments-rest-'+obj_id).innerHTML = '';
                }
                if ($('comments_'+obj_id).getChildren().length < 1) {
                    $('new_comment_'+obj_id).addClass('no_dots');
                }
            }
        });
    }
}

function delete_sticky_comment(id, obj_id)
{
    if ( confirm('Are you sure you want to delete this comment?') ) {
        refresh_page({
            div:  'comments_'+obj_id,
            pars: '&action=delete&id='+obj_id+'&sticky_comment_id='+id,
            url:  '/ajax/comment/update_'+$('comment_type_'+obj_id).value,
            onComplete: function() {
                hide_loader();
            }
        });
    }
}


function edit_comment(id, obj_id, limit, offset)
{
    if ( !comment_disabled ) {
        comment_disabled = true;
        if (limit != 0) { limit = -1; offset = 0; }
        refresh_page({
            div:  'comments_'+obj_id,
            pars: '&action=edit&id='+obj_id+'&comment_id='+id+'&limit=' + limit + '&offset=' + offset+'&text='+encodeURIComponent($('comment-edit-text-'+id).value),
            url:  '/ajax/comment/update_'+$('comment_type_'+obj_id).value,
            onComplete: function() { hide_loader(); comment_disabled = false; }
        });
    }
}

function edit_sticky_comment(id, obj_id)
{
    if ( !comment_disabled ) {
        comment_disabled = true;

        refresh_page({
            div:  'comments_'+obj_id,
            pars: '&action=edit&id='+obj_id+'&sticky_comment_id='+id+'&text='+encodeURIComponent($('sticky_comment-edit-text-'+id).value),
            url:  '/ajax/comment/update_'+$('comment_type_'+obj_id).value,
            onComplete: function() { hide_loader(); comment_disabled = false; }
        });
    }
}


function edit_comment_toggle(id)
{
    $('comment-edit-'+id).toggle();
    $('comment-text-'+id).toggle();
    $('comment-edit-text-'+id).focus();
}


function edit_sticky_comment_toggle(id)
{
    $('sticky_comment-edit-'+id).toggle();
    $('sticky_comment-text-'+id).toggle();
    $('sticky_comment-edit-text-'+id).focus();
}


var showing_all_comments = false;
function show_all_comments(offset, type, type_id) {
    if ( !showing_all_comments ) {

        if ($('frmOffset'))
            $('frmOffset').value = offset;
        if ($('frmDiv'))
            $('frmDiv').value = "comments-rest-" + type_id;

        showing_all_comments = true;
        $('show_more_comments_link').innerHTML = 'Loading...';

        refresh_page({
            div: 'comments_' + type_id,
            pars: '&offset=' + offset + '&type=' + type + '&type_id=' + type_id,
            url: '/ajax/comment/show_all',
            onComplete: function(data) {
                $('comments-rest-' + type_id).innerHTML = '';
            }
        });
    }
}


function user_menu_init(hover, id) {
    var rollover = $(hover);
    var ol = $(id+'_content');
    var un = $(id+'_under');

    ol.style.height = (rollover.getSize().size.y - 3) + 'px';

    un.style.height = ol.getSize().size.y + 'px';
    un.style.width = ol.getSize().size.x + 'px';

    $(id+'_bg').setOpacity(0.95);
    un.setOpacity(0.95);

    new Tooltip(hover, id, {position:'tr', delay:0, mouseover:true, delta_x: -5} );
}

function set_context(str) {
    setCookie('context', str);
}

window.addEvent(window.webkit ? 'load' : 'domready', global_init);
function global_init() {

    if ($('subscribe_controls')) {
        init_subscribe_controls();
    }
    if ($('plus_controls')) {
        init_plus_controls();
    }
}

function init_subscribe_controls() {
    var w = $('subscribe_controls').clone();
    $('subscribe_controls').remove();
    $(document.body).adopt(w);
    new Tooltip('subscribe_button', 'subscribe_controls', { position: 'bl', delay:200, mouseover: false, onclick:true, delta_y:6 });
}

function init_plus_controls() {
    var w = $('plus_controls').clone();
    $('plus_controls').remove();
    $(document.body).adopt(w);
    new Tooltip('plus_button', 'plus_controls', { position: 'bl', delay:200, mouseover: true, delta_y:6 });
}

function refresh_toolbar(clip_id, tag, user_id) {
    var tools = $('enabledTools').innerHTML.replace(/^\s+|\s+$/g, '');
    $('subscribe_controls').remove();

    refresh_page({
        div:  'toolbar',
        jdata: {
            clip_id: clip_id,
            tag: tag,
            user_id: user_id,
            tools: tools
        },
        url:  '/ajax/toolbar/refresh',
        onComplete: function() {
            init_subscribe_controls();
            hide_loader();
        }
    });
}

/**
 * Polling class to check if a form field has changed
 */
var Poll = new Class({
    options: {
        bind: false,
        interval: 541,
        allow_empty: false
    },

    initialize: function(fields, fn, options) {
        this.setOptions(options);

        this.fields = [];

        this.is_polling = false;

        if ( $type(fields) == 'array' ) {
            fields.each( function(item, index) {
                this.fields.push( $(item) );
            }, this);
        } else {
            this.fields = [$(fields)];
        }
        if ( !this.fields[0] ) return false;

        this.onChange   = this.options.bind ? fn.bind(this.options.bind) : fn;
        this.cur_text   = this.getValue();

        this.start();
    },

    stop: function() {
        this.is_polling = false;
        $clear(this.period);
    },

    start: function() {
        if ( !this.is_polling ) {
            this.is_polling = true;
            this.period = this.poll.periodical(this.options.interval, this);
        }
    },

    resetTime: function() {
        this.stop();
        this.start();
    },

    getValue: function() {
        var text = '';
        this.fields.each( function(item, index) {
            text += item.value;
        });
        return text;
    },

    poll: function() {
        var text = this.getValue();
        var actual_text = this.fields[0].value;
        if ( (this.options.allow_empty || actual_text != '') && this.cur_text != text ) {
            this.cur_text = text;
            this.onChange(actual_text, this.options);
        }
    }
});
Poll.implement(new Options);

function show_loader() {
    $(document.body).addClass('hourglass');
}
function hide_loader() {
    $(document.body).removeClass('hourglass');
}

function checkEmail(val) {
    if (val == '' || val.indexOf('@') == -1 || val.indexOf('.') == -1) {
        return false;
    }

    return /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|cat|coop|pro|tel|int)\b/.test(val.toLowerCase());
}

function checkUrl(val) {
    if (/^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?/i.test(val) && val != '' ) {
        return true;
    }
    return false;
}

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";

    var domain = vimeo_startup ? "; domain=" + vimeo_startup.domain : "; domain=.vimeo.com";
    document.cookie = name + "=" + value + expires + "; path=/" + domain;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

/**
 * NewAutoCopmlete
 *  required args: text field id
 */
var NewAutoComplete = new Class({
    options: {
        limit: 10,
        width: 0,
        delta_x: 0,
        delta_y: 0,
        onselect: false,
        url: '',
        search_text: 'Start typing to search...',
        empty_search_text: 'Nothing found.',
        more_results: false
    },

    initialize: function(field, options) {
        this.field = $(field);
        if ( !this.field ) return false;

        this.setOptions(options);

        this.is_focused = false;
        this.hide_lock = false;
        this.setup();

        this.poll = new Poll(field, this.search.bind(this), { interval: 300, allow_empty: true });

        this.field.addEvent('focus', this.showSearch.bind(this));
        this.field.addEvent('blur', this.onBlur.bind(this));

        document.addEvent('click',  this.onClick.bind(this));
        document.addEvent('keydown', this.keyboard.bind(this));
    },

    keyboard: function(e) {
        var e = new Event(e);

        switch(e.key) {
            case 'up':
                if ( this.is_focused ) {
                    this.up();
                    e.stop();
                }
                break;

            case 'down':
                if ( this.is_focused ) {
                    this.down();
                    e.stop();
                }
                break;

            case 'enter':
                if ( this.is_focused ) {
                    if ( this.results ) {
                        this.select(this.selected_index);
                        this.tt.hideTooltip();
                        e.stop();
                    }
                }
                break;

            default:
                if ( this.is_focused ) {
                    this.showSearch();
                }
                break;
        }
    },

    showSearch: function(e) {
        this.is_focused = true;

        if ( e ) {
            var event = new Event(e);
            event.stop();
            this.tt.showTooltip(e);
        } else {
            this.tt.tooltipOn();
        }
    },

    hideSearch: function() {
        if ( !this.hide_lock ) {
            this.is_focused = false;
            this.tt.hideTooltip();
        }
    },

    onClick: function( event ) {
        var e = new Event(event);
        var prev_lock = this.hide_lock;
        this.hide_lock = this.search_box.hasChild(e.target) || this.field.id == e.target.id;

        if ( prev_lock && !this.hide_lock) this.hideSearch();
    },

    onBlur: function() {
        this.hide_lock = false;
        this.hideSearch.delay(300, this);
    },

    /**
     * Dynamically setting up the autocomplete search box
     */
    setup: function() {
        this.search_box  = new Element('div', {'id':this.field.id+'_search', 'class':'autocomplete'});
        this.search_list = new Element('ul',  {'id':this.field.id+'_search_list', 'class':'autocomplete_list'});

        this.message( this.options.search_text );

        $(document.body).adopt(
            this.search_box.adopt(this.search_list)
        );

        if ( this.options.width > 12 ) {
            this.search_box.setStyle('width', (this.options.width-12)+'px');
        }

        this.tt = new Tooltip(this.field.id, this.search_box.id, {position:'bl', onfocus: true, delta_x: this.options.delta_x, delta_y: this.options.delta_y });
    },

    search: function( text ) {
        if ( text == '' ) {
            this.message(this.options.search_text);
            this.poll.cur_text = '';
            return false;
        }

        if ( this.search_box.style.display == '' && this.is_focused ) {
            this.search_text = text;

            if ( this.prev_ajax ) {
                this.prev_ajax.cancel();
            }

            this.message('Loading...');

            this.prev_ajax = refresh_page({
                jdata: {
                    search_term: this.search_text,
                    limit: this.options.limit
                },
                url: this.options.url,
                onComplete: this.onSearchComplete.bind(this)
            });
        }
    },

    onSearchComplete: function( data ) {
            this.clearList();
            var data = Json.evaluate(data);

            // No users found
            if ( !data ) {
                this.message( this.options.empty_search_text );
            }
            this.search_list = $(this.search_list.id); // redefine just in case

            if ( data.results ) {
                this.search_list.setStyle('display','');
                this.search_list.empty();
                this.results = data.results;
                this.selected_index = 0;


                // insert new results
                for( var i = 0; i < this.results.length; i++ ) {
                    var disabled = false;


                    var li = new Element('li',{
                        'id': this.field.id+'_results_'+i,
                        'styles': {
                            'position': 'relative',
                            'cursor': 'pointer'
                        }
                    });


                    if (this.results[i].portrait){
                        li.adopt(
                            new Element('img', {
                                'src':this.results[i].portrait,
                                'class':'portrait',
                                'styles': {
                                    'position':'relative',
                                    'width':30,
                                    'height':30
                                }
                            }
                        ));
                    }

                    this.search_list.adopt(
                        li.adopt(
                            new Element('div',{'class':'acaption',
                                'styles': {
                                    'position':'relative'
                                }
                            }).setHTML(this.results[i].name)
                        ).adopt(
                            new Element('div',{'class':'clear'})
                        )
                    );


                    if ( i == 0 ) li.className = 'hover';

                    li.onmousedown = this.select.bind(this).pass(i);
                    li.onmouseover = this.highlight.bind(this).pass(i);
                }

                var li = new Element('li',{
                    'id': 'outer_box',
                    'styles': {
                        'position': 'relative',
                        'cursor': 'pointer'
                    }
                });
                var div = new Element('div',{'class':'tools'});
                if (this.options.more_results){
                    var searchtoken = $('xsrft').value.substr(1,8);
                    var a = new Element('a', {'href':this.options.more_results + this.search_text + '/st/' + searchtoken }).setHTML('more results');
                    div.adopt(a);
                    var span = new Element('span').setHTML('&nbsp;or&nbsp;');
                    div.adopt(span);
                    setCookie('searchtoken', searchtoken);
                }

                div.adopt(
                    new Element('a', {
                        'href':'javascript:void(0);',
                        'class':'close'
                        }).setHTML('close').adopt(
                            new Element('span',{'class':'undertaker'}))
                    );

                this.search_list.adopt(li.adopt(div));

            }

            if ( this.options.new_person ) {
                var li_see_all = new Element('li',{
                    'styles': {
                        'position': 'relative',
                        'cursor': 'pointer',
                        'background-image': 'none'
                    }
                }).adopt(
                    new Element('div', {'id':this.field.id+'_new_person', 'class':'autocomplete autocomplete_new'}).adopt(
                        new Element('div',{
                            'styles': {
                                'position':'relative',
                                'cursor':'pointer'
                            }
                        }).adopt(
                            new Element('img',{'class':'portrait','src':'http://a.vimeocdn.com/images/portrait_blank_30.gif'})
                        ).adopt(
                            new Element('div',{'class':'acaption',
                                'styles': {
                                    'position':'relative',
                                    'cursor':'pointer'
                                }
                            }).adopt(
                              new Element('a',{'href':'/contacts/invite'}).setHTML('Invite someone new')
                            )
                        ).adopt(
                                new Element('div',{'class':'clear'})
                        )
                    )
                );

                this.search_list.adopt(li_see_all);
            }

    },

    down: function() {
        this.selected_index++;
        if ( this.results && this.selected_index > this.results.length-1 ) {
            this.selected_index = this.results.length - 1;
        } else {
            this.highlight(this.selected_index);
        }
    },

    up: function() {
        this.selected_index--;
        if (this.selected_index < 0) {
            this.selected_index = 0;
        } else {
            this.highlight(this.selected_index);
        }

    },

    select: function(index) {
        this.selected_index = index;
        if ( this.results )
            this.options.onselect( this.results[this.selected_index] );

    },

    deselect: function() {
        if ( this.results ) {
            for(var i = 0; i < this.results.length; i++) {
                $(this.field.id+'_results_'+i).className = '';
            }
        }
    },

    highlight: function(index) {
        this.selected_index = index;
        // first deselect all items
        if ( this.results ) {
            for(var i = 0; i < this.results.length; i++) {
                $(this.field.id+'_results_'+i).className = '';
            }

            if ( $(this.field.id+'_results_'+this.selected_index) ) {
                $(this.field.id+'_results_'+this.selected_index).className = 'hover';
            }
        }

    },

    clearList: function(dont_clear) {
        this.results = false;

        if ( !dont_clear ) this.search_list.innerHTML = '';

        this.search_list.setStyle('display','none');
    },

    message: function(text, options) {
        this.clearList();
        this.search_list.setStyle('display','');
        var li = new Element('li', {'class':'hover',
            'styles': {
                'background-image':'none'
            }} );
        if ( options && options.onclick) {
            li.onclick = options.onclick;
        }
        this.search_list.adopt(
            li.adopt( new Element('div').setHTML(text))
        );
    }

})
NewAutoComplete.implement(new Options);


/**
 * Dropdown class
 */
var Dropdown = new Class({

    options: {
        delta_x: 0,
        delta_y: 0,
        onComplete: function(val) {},
        args: false,
        selected: '',
        cookie: false,
        enable_selected: false
    },

    initialize: function(element, dropdown, options) {
        this.setOptions(options);

        this.t = new Tooltip(element, dropdown, { zindex: 100100, position:'bl', onclick:true, delta_y:this.options.delta_y, delta_x:this.options.delta_x });

        this.element  = $(element);
        this.dropdown = $(dropdown);

        this.cur_item = this.options.selected;

        this.items = this.dropdown.getFirst().getChildren();

        this.mouseClick   = this.itemTrigger.bindAsEventListener(this);
        this.hideClick    = this.hideDropdown.bindAsEventListener(this);

        this.registerEvents();

        if ( this.options.cookie ) {
            var id = getCookie(this.options.cookie);
            if ( id ) this.manualSelectItem(id);
        }
    },

    registerEvents: function() {
        this.items.each( function(item) {
            if ( item.id.substr(0,1) != '|' ) { // Item is a divider - ignore
                if ( item.className == 'hilite' ) this.cur_item = item.id;
                item.addEvent("mouseup", this.mouseClick);
            }
        }, this);
    },

    destroy: function() {
        this.t.destroy();
    },

    getValue: function() {
        return this.cur_item;
    },

    manualSelectItem: function(id) {
        this.selectItem(id);
        $(this.element.id + '_value').innerHTML = $(id).innerHTML;
    },

    addItem: function(id, name) {
        var new_li = new Element('li', {
            'id': id,
            'onmouseover': "this.addClass('hilite')",
            'onmouseout': "this.removeClass('hilite')",
            'events': {
                'mouseup': this.mouseClick.bind(this)
            }
        }).setText(name);

        var ul = this.items[0].getParent();

        ul.adopt(new_li);
        this.items.push( new_li );
    },

    deleteItem: function(id) {
        this.items.each( function(item) {
            if ( item.id == id ) {
                item.removeEvent("mouseup", this.mouseClick);
                item.remove();
            }
        });
    },

    selectItem: function(id) {
        this.items.each( function(item) {
            if ( item.id.substr(0,1) != '|' ) { // Item is a divider - ignore
                if ( item.id == id ) {
                    item.addClass('selected');
                    this.cur_item  = id;
                } else {
                    item.removeClass('selected');
                }
            }
        }, this);
    },

    itemTrigger: function(event) {
        var e = new Event(event);
        var item = e.target;

        if ( item.id.substr(0,1) != '*' ) {
            if ( e.target.tagName == 'SPAN' ) {
                item = e.target.getParent();
            }
            e.stop();

            if ( item.id == this.cur_item && !this.options.enable_selected ) return false;

            this.selectItem(item.id);
            $(this.element.id + '_value').innerHTML = item.innerHTML;
            $(this.element.id + '_value').setStyle('color', item.style.color);
        }

        this.hideDropdown();

        if ( this.options.cookie ) {
            setCookie(this.options.cookie, this.cur_item);
        }

        if (this.options.onComplete) this.options.onComplete(item.id, this.options.args);
    },

    hideDropdown: function() {
        this.t.wait = false;
        this.t.tooltipOff.delay(100, this.t);
    }
});
Dropdown.implement(new Options);

/**
 * Tooltip Class
 */
var Tooltip = new Class({
  initialize: function(element, tool_tip) {
    //element = the thing you rollover
    //tool_tip = tooltip div itself
    //new Tooltip('e','e2', { position:'tr', delta_y:100, mouseover:true })
    var options = Object.extend({
      no_roll: false,
      default_css: false,
      position: false,  // tr, tl, br, bl, rj
      delay: 0,         // delay before displaying
      onclick: false,   // have tooltip open onclick
      onfocus: false,   // shows tooltip when onfocus
      mouseover: false, // can hover over tooltip, must be fixed in order for this to work
      global_click: true, // enables the user to click anywhere to turn off the tooltip
      width: 200,
      margin: "0px",
      padding: "5px",
      backgroundColor: "#cccccc",
      min_distance_x: 5,
      min_distance_y: 5,
      delta_x: 0,
      delta_y: 0,
      zindex: 100100,
      load: false, // specify a url to call when loading in
      load_args: false // ajax args
    }, arguments[2] || {});

    if ( tool_tip ) {
        if ($type(element) == 'element') {
            this.element = element
        }
        else {
            this.element = $(element);
        }
        this.no_listeners = false;
    } else {
        this.no_listeners = true;
    }

    this.timer_on     = false;
    this.timer_off    = false;
    this.options      = options;
    this.wait         = false;

    if (!this.options.hide_delay) this.options.hide_delay = this.options.delay;

    if ($(tool_tip)) {
        $(tool_tip).moveToBottom();
        this.tool_tip = $(tool_tip);
    } else {
        this.tool_tip = $(element);
    }

    // hide the tool-tip by default
    this.tool_tip.style.display = 'none';

    if ( tool_tip && !this.options.no_roll ) { // no element to listen to
        if ( !this.options.onclick && !this.options.onfocus ) {
            this.eventMouseOver  = this.showTooltip.bindAsEventListener(this);
            this.eventMouseOut   = this.hideTooltip.bindAsEventListener(this);
            this.eventMouseMove  = this.moveTooltip.bindAsEventListener(this);
        }
        else if ( this.options.onfocus ) {
            //this.eventFocus  = this.showTooltip.bindAsEventListener(this);
            //this.eventBlur   = this.hideTooltip.bindAsEventListener(this);
        }
        else {
            this.eventMouseDown  = this.toggleTooltip.bindAsEventListener(this);
            this.eventTurnOff    = this.tooltipOff.bindAsEventListener(this);
            this.eventWait       = this.tooltipWait.bindAsEventListener(this);
        }
        this.registerEvents();
    }

    window.addEvent("resize", this.moveTooltip.bindAsEventListener(this));

    this.moveTooltip(false);
  },

  load: function() {
    if ( this.options.load ) {
        refresh_page({
            jdata: this.options.load_args,
            url: this.options.load,
            onComplete: function(data) {
                this.tool_tip.innerHTML = data;
            }.bind(this)
        });
    }
  },

  destroy: function() {
    if ( !this.options.onclick && !this.options.onfocus ) {
        this.element.removeEvent("mouseover", this.eventMouseOver);
        this.element.removeEvent("mouseout", this.eventMouseOut);
        this.element.removeEvent("mousemove", this.eventMouseMove);

        if ( this.options.mouseover ) {
            this.tool_tip.removeEvent("mouseover", this.eventMouseOver);
            this.tool_tip.removeEvent("mouseout", this.eventMouseOut);
        }
    }
    else if ( this.options.onfocus ) {
        //this.element.removeEvent("focus", this.eventFocus);
       // this.element.removeEvent("blur",  this.eventBlur);
    }
    else {
        this.element.removeEvent("mousedown", this.eventMouseDown);
        this.element.removeEvent("mouseup", this.eventWait);
        if (this.options.global_click) $(document.body).removeEvent("click", this.eventTurnOff);
    }
  },

  registerEvents: function() {
    if ( !this.options.onclick && !this.options.onfocus ) { // use mouse overs
        this.element.addEvent("mouseover", this.eventMouseOver);
        this.element.addEvent("mouseout", this.eventMouseOut);
        this.element.addEvent("mousemove", this.eventMouseMove);

        if ( this.options.mouseover ) {
            this.tool_tip.addEvent("mouseover", this.eventMouseOver)
            this.tool_tip.addEvent("mouseout", this.eventMouseOut)
        }
    }
    else if ( this.options.onfocus ) {
        //this.element.addEvent("focus", this.eventFocus);
        //this.element.addEvent("blur",  this.eventBlur);
    }
    else { // use clicking
        if ( this.element ) {
            this.element.addEvent("mousedown", this.eventMouseDown);
            this.element.addEvent("mouseup", this.eventWait);
        }
        if (this.options.global_click) $(document.body).addEvent("click", this.eventTurnOff);
    }
  },

  tooltipWait: function(event) {
    this.wait = true;
  },

  moveTooltip: function(event){
    if ( !this.element ) return false;

    if ( !this.options.position && event ) { // If not fixed
        var e = new Event(event);

        var mouse_x = e.client.x;
        var mouse_y = e.client.y;

        pos_y = (e.page.y - mouse_y) + mouse_y;
        pos_x = (e.page.x - mouse_x) + mouse_x;

        var dimensions = this.tool_tip.getSize();
        var element_width = dimensions.size.x;
        var element_height = dimensions.size.y;

        if ( mouse_y - element_height < this.options.min_distance_y ) { // hitting top
            pos_y = pos_y + this.options.min_distance_y;
        } else {
            pos_y = pos_y - element_height - this.options.min_distance_y;
        }

        if ( (mouse_x + element_width + this.options.min_distance_x) >= (window.getWidth()) ) { // hitting right
            pos_x = pos_x - element_width - this.options.min_distance_x;
        } else {
            pos_x = pos_x + this.options.min_distance_x;
        }
    } else { // Fixed tooltip
        this.element = new Element(this.element);
        var coords  = this.element.getPosition();
        var size    = this.element.getSize().size;

        switch( this.options.position ) {
            case 'tr':
                pos_x = coords.x + size.x;
                pos_y = coords.y;
                break;

            case 'tl':
                pos_x = coords.x;
                pos_y = coords.y;
                break;

            case 'br':
                pos_x = coords.x + size.x;
                pos_y = coords.y + size.y;
                break;

            case 'bl':
                pos_x = coords.x;
                pos_y = coords.y + size.y;
                break;

            case 'rj':
                pos_x = coords.x - ((this.tool_tip.getStyle('width').toInt() + 26) - size.x);
                pos_y = coords.y + size.y;
                break;
        }
    }

    this.setStyles(pos_x, pos_y);
  },

  toggleTooltip: function(event) {
    if (event) new Event(event).stop();
    this.load();
    this.moveTooltip(event);
    this.tooltipToggle();
  },

  showTooltip: function(event) {
    var e = new Event(event).stop();

    if ( this.no_listeners ) {
        this.tool_tip.innerHTML = e.target.title;
    }

    this.moveTooltip(event);
    this.timer_on = this.tooltipOn.delay(this.options.delay,this);
    $clear(this.timer_off);
  },

  hideTooltip: function(event){
    this.timer_off = this.tooltipOff.delay(this.options.hide_delay,this);
    $clear(this.timer_on);
  },

  tooltipToggle: function() {
    if ( this.tool_tip.style.display == 'none' )
        this.tool_tip.style.display = '';
    else
        this.tool_tip.style.display = 'none';
  },

  tooltipOn: function(event) {
    this.tool_tip.style.display = '';
  },

  tooltipOff: function(event) {
    if ( event ) {
        var e = new Event(event);
        if ( this.tool_tip.hasChild(e.target) ) return false;
    }

    if ( !this.wait )
        this.tool_tip.style.display = 'none';

    this.wait = false;
  },

  setStyles: function(x, y){
    if ( this.no_listeners ) {
        var real_width = this.tool_tip.getSize().size.x;

        if ( real_width > this.options.width )
            this.tool_tip.className = 'tooltip max-width';
        else
            this.tool_tip.className = 'tooltip';
    }

    // set the right styles to position the tool tip
     this.tool_tip.setStyle('position','absolute');
     this.tool_tip.setStyle('top',  y + this.options.delta_y + "px");
     this.tool_tip.setStyle('left', x + this.options.delta_x + "px");
     this.tool_tip.setStyle('z-index', this.options.zindex);

      // apply default theme if wanted
      if (this.options.default_css){
        this.tool_tip.setStyle('margin', this.options.margin);
        this.tool_tip.setStyle('padding', this.options.padding);
        this.tool_tip.setStyle('backgroundColor', this.options.backgroundColor);
        this.tool_tip.setStyle('z-index', this.options.zindex);
      }
  }

});

function toggle_collapsible(which,id,options)
{
    if ($(id).style.display != 'block') {
        if (options && options['open_text']) which.innerHTML = options['open_text'];
        $(id).style.display = 'block';
        which.setStyle('background-image','url(http://a.vimeocdn.com/images/tri_down.gif)');
    }
    else {
        if (options && options['closed_text']) which.innerHTML = options['closed_text'];
        $(id).style.display = 'none';
        which.setStyle('background-image','url(http://a.vimeocdn.com/images/tri_right.gif)');
    }
}

function adjust_volume(volume) {
    setCookie('pl_volume', Math.ceil(volume), 10000);
}

function vimeo_checkbox_toggle( el )
{
    var len = el.src.length;
    if ( el.src.indexOf('_checked') >= 0 ) {
        el.src = el.src.substring(len - 57, len - 12) + '.gif';
        return false;
    }
    else {
        el.src = el.src.substring(len - 49, len - 4) + '_checked.gif';
        return true;
    }
}

function vimeo_checkbox( el ) {
    return $(el).src.indexOf('_checked') > 0;
}

var Moogaloop = new Class({
    options: {
        buildnum: false,
        clip_id: false,
        server: 'vimeo.com',
        player_server: 'player.vimeo.com',
        autoplay: 0,
        fullscreen: 1,
        md5: 0,
        show_portrait: 0,
        show_title: 0,
        show_byline: 0,
        force_embed: 0,
        width: '100%',
        height: '100%',
        color: '00AEDF',
        multimoog: ''
    },

    initialize: function(id, args) {
        this.id = id;
        this.setOptions(args);

        this.write();
    },

    write: function() {
        /** @todo: remove this when we get the html player working on embed settings page **/
        if ( !DetectFlashVer(7, 0, 0) ) { // has Flash Player 6 or lower

            var iwhatever = /(i(pad|pod|phone))/.test(navigator.userAgent.toLowerCase());

            var html = '<h2>To watch this video, you need Flash 10</h2>';
            if (!iwhatever)
                html += ' You have an old version of Flash. <a href="http://www.adobe.com/go/getflash/">Click here to download the latest version.</a>';

            $(this.id).adopt(
                new Element('div', { 'style':'background: #fff; padding: 5px;'}).setHTML(html)
            );
            $(this.id).show();
            return false;
        }

        var flashvars = {
            clip_id: this.options.clip_id,
            server: this.options.server,
            player_server: this.options.player_server,
            autoplay: this.options.autoplay,
            fullscreen: this.options.fullscreen,
            md5: this.options.md5,
            portfolio_id: this.options.portfolio_id,
            show_portrait: this.options.show_portrait,
            show_title: this.options.show_title,
            show_byline: this.options.show_byline,
            context: this.options.context,
            context_id: this.options.context_id,
            force_embed: this.options.force_embed,
            multimoog: this.options.multimoog,
            color: this.options.color,
            force_info: this.options.force_info,
            js_api: this.options.js_api,
            js_onLoad: this.options.js_onLoad,
            js_swf_id: 'vimeo_clip_' + this.options.clip_id
        };

        var allowFullscreenValue;
        if ( this.options.fullscreen == 1 )
        {
            allowFullscreenValue = true;
        }
        else
        {
            allowFullscreenValue = false;
        }
        var params = {
            bgcolor: '#ffffff',
            allowscriptaccess: 'always',
            allowfullscreen: allowFullscreenValue,
            scalemode: 'showall',
            quality: 'high',
            wmode: 'opaque'
        };
        var attributes = {
            id: 'vimeo_clip_' + this.options.clip_id,
            name: 'vimeo_clip_' + this.options.clip_id
        };

        swfobject.embedSWF( '/moogaloop_local.swf?ver=' + this.options.buildnum,
                         this.id,
                         this.options.width,
                         this.options.height,
                         '10.0.0',
                         'http://a.vimeocdn.com/flash/expressInstall.swf',
                         flashvars,
                         params,
                         attributes,
                         this.loaded
                       );
    },

    loaded: function( e ) {
        this.so = e.ref;
    },

    play: function() {
        document.getElementById('vimeo_clip_' + this.options.clip_id).api_play();
    }
});
Moogaloop.implement(new Options);

function onMoogLoaded(swf_id) {
    //Hide vfa badge on play
    $(swf_id).api_addEventListener('onPlay', 'hideVFABadge');
}

function hideVFABadge() {
    if ($('vfa-badge')) {
        $('vfa-badge').addClass('hidden');
    }
}

// This will stop loading/playing all moogaloops on the page
function unload_moogaloops(clip_id) {
    var players = $$('.vimeo_holder .player');
    for( i = 0; i < players.length; i++ ) {
        try {
            var id = players[i].id.substr(13);
            if ( clip_id != id ) {
                document.getElementById('vimeo_clip_' + id).api_unload();
            }
        } catch(e) {}
    }
}


function number_format(nStr)
{
    nStr += '';
    var x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function redraw_rounders(id)
{
    if (window.webkit) {
    var rounders = $$('#' + id + ' img.browserounder');
        for(i = 0; i < rounders.length; i++) {
            var old = rounders[i];
            var clone = old.clone();
            clone.injectBefore(old);
            old.remove();
            rounders[i] = clone;
        }
    }
}

function reload_page() {
    token_value = $('xsrft').value;
    setCookie('xsrft', token_value);
    window.location.reload();
}

/* "LIGHTBOX" */
var lightbox;
var lightbox_wrapper;
var groupId;

function shareAlbumPopup(id)
{
    $('lightbox').innerHTML = "<div class='loading' style='width: 500px; height: 340px;'><div style='padding: 120px;'>Loading</div></div>";
    showLightbox('/share/album:' + id, 1050, 100, 251, 250);
}

function shareChannelPopup(id)
{
    $('lightbox').innerHTML = "<div class='loading' style='width: 500px; height: 340px;'><div style='padding: 120px;'>Loading</div></div>";
    var top = window.getScrollTop() + 50;
    showLightbox('/share/channel:' + id, 1050, top, 251, 250);
}

function shareWindowPopup(id)
{
    var channel_id = $('channel_id');

    var url;

    if (channel_id) {
        url = '/share/clip:'+id+'/channel:'+ channel_id.value;
    } else if (groupId) {
        url = '/share/clip:'+id+'/group:'+ groupId;
    } else {
        url = '/share/clip:'+id;
    }

    $('lightbox').innerHTML = "<div class='loading' style='width: 500px; height: 340px;'><div style='padding: 120px;'>Loading</div></div>";
    var top = window.getScrollTop() + 50;
    showLightbox(url, 1050, top, 251, 250);
}

function embedWindowPopup(id)
{
    var url = groupId ? '/embed/clip:'+id+'/group:'+ groupId : '/embed/clip:'+id;
    $('lightbox').innerHTML = "<div class='loading' style='width: 440px; height: 250px;'><div style='padding: 100px;'>Loading</div></div>";
    var top = window.getScrollTop() + 50;
    showLightbox(url, 1000, top, 221, 250);
}

function lockedPopup() {
    var top = window.getScrollTop() + 50;
    $('lightbox').innerHTML = '<div class="prolock_content"><h1>Locked</h1><img onclick="closeLightbox()" alt="x" id="deleter" src="http://a.vimeocdn.com/images/icon_album_delete.gif"><div class="copy"><p>TODO</p></div><div class="options"><a href="#TODO" class="blue_button">CTA (TODO)</a> <span>or <span onclick="closeLightbox()" onmouseout="faux_link(this)" onmouseover="faux_link(this)" class="faux_link">cancel</span></span></div></div>';
    showLightbox(null, 1000, top, 251, 250);
}

function loginLightbox(show, message, awards) {
    new Asset.image('http://a.vimeocdn.com/images/world_sun.gif');
    new Asset.image('http://a.vimeocdn.com/images/world_land.jpg');
    new Asset.image('http://a.vimeocdn.com/images/world_land_bottom.gif');
    new Asset.image('http://a.vimeocdn.com/images/world_error.jpg');
    new Asset.image('http://a.vimeocdn.com/images/world_error_bottom.gif');

    if (!show) show = 'login';
    if (message) show += '?message=1';
    if (awards) show += '&awards=1';
    self.scrollTo(0, 0);
    showLightbox('/lightbox/' + show, 1000, 150, 220, 250);
}

function welcomeLightbox() {
    new Asset.image('http://a.vimeocdn.com/images/world_sun.gif');
    new Asset.image('http://a.vimeocdn.com/images/world_land.jpg');
    new Asset.image('http://a.vimeocdn.com/images/world_land_bottom.gif');

    self.scrollTo(0, 0);
    showLightbox('/lightbox/welcome', 1000, 150, 220, 250);
}

function showLogin() {
    $('error').setText('').hide();
    $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_land.jpg)');
    $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_land_bottom.gif';
    $('nav_join').hide();
    $('nav_login').show();
    $('forgot').hide();
    $('join').hide();
    $('login').show();
    $('login_email').focus();
}

function showJoin() {
    $('error').setText('').hide();
    $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_land.jpg)');
    $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_land_bottom.gif';
    $('nav_login').hide();
    $('nav_join').show();
    $('forgot').hide();
    $('login').hide();
    $('join').show();
    $('join_display_name').focus();
}

function showForgot() {
    $('error').setText('').hide();
    $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_land.jpg)');
    $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_land_bottom.gif';
    $('login').hide();
    $('join').hide();
    $('forgot').show();
    $('forgot_email').focus();
}

var is_ajaxing = false;
function signIn() {
    if (!is_ajaxing) {
        $('error').setText('').hide();
        $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_land.jpg)');
        $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_land_bottom.gif';

        var email = $('login_email').value;
        var password = $('login_password').value;
        if (!checkEmail(email)) {
            $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
            $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
            $('error').setText('Please enter your email address.').show();
            return false;
        }
        else if (!password) {
            $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
            $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
            $('error').setText('Please enter your password.').show();
            return false;
        }
        else {
            is_ajaxing = true;
            $('login_button').innerHTML = "Logging in...";

            refresh_page({
                jdata: {
                    email: encodeURIComponent(email),
                    password: encodeURIComponent(password)
                },
                url: '/ajax/user/sign_in',
                onComplete: function(data) {
                    is_ajaxing = false;

                    var regex = /true/;
                    if (regex.test(data)) {
                        window.location = window.location.href.replace(/#.*/, '');
                    }
                    else {
                        $('login_button').innerHTML = "Log In";

                        $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
                        $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
                        $('error').setText(data).show();
                    }
                }
            });
        }
    }
}

function joinVimeo() {
    if (!is_ajaxing) {
        $('error').setText('').hide();
        $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_land.jpg)');
        $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_land_bottom.gif';

        var display_name = $('join_display_name').value;
        var email = $('join_email').value;
        var password = $('join_password').value;
        var tos = $('tos').checked;

        if($('awards'))
            var awards = $('awards').value;

        if (!display_name) {
            $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
            $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
            $('error').setText('Please enter your first and last name.').show();
            return false;
        }
        else if (!checkEmail(email)) {
            $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
            $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
            $('error').setText('Please enter your email address.').show();
            return false;
        }
        else if (!password) {
            $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
            $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
            $('error').setText('Please enter your password.').show();
            return false;
        }
        else if (!tos) {
            $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
            $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
            $('error').setText('Please agree with Vimeo Terms of Service.').show();
            return false;
        }
        else {
            is_ajaxing = true;
            $('signup_button').innerHTML = "Joining...";

            refresh_page({
                jdata: {
                    display_name: display_name,
                    email: encodeURIComponent(email),
                    password: encodeURIComponent(password),
                    tos: tos,
                    awards: awards
                },
                url: '/ajax/user/sign_up',
                onComplete: function(data) {
                    is_ajaxing = false;

                    if (data == 'true') {
                        window.location = window.location.href.replace(/#.*/, '');
                    }
                    else {
                        $('signup_button').innerHTML = "Join Vimeo";
                        $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
                        $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
                        $('error').setText(data).show();
                    }
                }
            });
        }
    }
}

function forgotPassword() {
    if (!is_ajaxing) {
        $('error').setText('').hide();
        $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_land.jpg)');
        $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_land_bottom.gif';

        var email = $('forgot_email').value;
        if (!checkEmail(email)) {
            $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
            $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
            $('error').setText('Please enter your email address.').show();
            return false;
        }
        else {
            is_ajaxing = true;
            $('forgot_button').innerHTML = "Helping...";

            refresh_page({
                jdata: {
                    email: encodeURIComponent(email)
                },
                url: '/ajax/user/forgot_password',
                onComplete: function(data) {
                    is_ajaxing = false;

                    $('forgot_button').innerHTML = "Help Me";
                    $('land').setStyle('background-image', 'url(http://a.vimeocdn.com/images/world_error.jpg)');
                    $('land_bottom').getElement('img').src = 'http://a.vimeocdn.com/images/world_error_bottom.gif';
                    $('error').setText(data).show();
                }
            });
        }
    }
}

function checkLightboxSize()
{
    $('lightbox_wrapper').style.width = window.getWidth() + 'px';
    $('lightbox_wrapper').style.height = window.getScrollHeight() + 'px';
}

function showLightbox(url, max_height, marginTop, width, height, onComplete)
{
    $('lightbox').style.marginTop = marginTop + "px";
    sizeLightbox(marginTop, width, height);

    window.addEvent('resize',function(e){
        sizeLightbox(marginTop, width, height);
    });

    $('lightbox').addEvent('click',function(e){
        sizeLightbox(marginTop, width, height);
    });

    $('lightbox_wrapper').addEvent('click', closeLightbox);

    var m = $('lightbox').style.marginTop;

    $('lightbox_wrapper').show();
    $('lightbox').show();

    if (url){
        refresh_page({
            url: url,
            div: 'lightbox',
            evalScripts: true
        });
    }
}

function sizeLightbox(marginTop,width,height)
{
    $('lightbox').style.marginLeft = Math.round(( window.getWidth() / 2 ) - width) + "px";
    $('lightbox_wrapper').style.width = window.getWidth() + 'px';
    $('lightbox_wrapper').style.height = window.getScrollHeight() + 'px';
}

function closeLightbox()
{
    if ($('embed_color_pick')) $('embed_color_pick').hide();
    $('lightbox_wrapper').hide();
    $('lightbox').hide();
    $('lightbox').innerHTML = '';
}

function thin_ice(o, user_id) {
    if ($('reason').value.trim()) {
        $(o).disable('Submitting...');

        refresh_page({
            url:'/ajax/user/add_thin_ice',
            form: 'form_thin_ice',
            onComplete: function() {
                closeLightbox();
                $('thin_ice_label').setText('Defrost');
            }
        });
    }
}

function validateEmail(data) {
    return /^([_\w-]+((\+)?(\.)?[_\w-]+)*)@([_\w-])+(\.[_\w-]+)*(\.[a-z]{2,4})$/i.test(data);
}

function resendEmail(id)
{
    var btn = 'email_btn';
    var cancel = 'or_cancel'
    if (id){
        btn += '_'+id;
        cancel += '_'+id;
        $(cancel).setHTML('');
    }
    $(btn).blur();
    $(btn).disable('Sending...');
    refresh_page({
        jdata: {
            id: id
        },
        url:'/ajax/user/resend_email',
        onComplete: function(){
            $(btn).disable('Sent');
        }
    });
}

function help_box_close(el, id)
{
    $(el).remove();

    if ( id != '' ) {
        refresh_page({
            jdata: { id: id },
            url: '/ajax/user/phome_obiwan_close'
        });
    }
}

function tools_add_contact(id, name, pronoun)
{
    var el = $('tools_add_contact');
    if ( el.innerHTML == 'Remove Contact' ) {
        toggle_user_contact(id, 0, name, pronoun);
        el.innerHTML = 'Add Contact';
    }
    else {
        toggle_user_contact(id, 1, name, pronoun);
        el.innerHTML = 'Remove Contact';
    }
}

function date_picker_change_month(div, date)
{
    var which_div = 'date_picker_' + div;
    refresh_page({
        jdata: {
            month_mod: date,
            name: div
        },
        url:  '/ajax/form/date_calendar',
        div: which_div
    });
}

////////////////////////////////
// Scrolly bar
////////////////////////////////

function scroll_bar_move(id, pixel) {
    document.getElementById(id + '_swf').moveToByPixel(pixel, false);
}

function scroll_bar_content_move(id, pos) {
    $(id).scrollTop = pos;
}

function scroll_bar_update(id, dir) {
    try {
        if (!dir) dir = 'bottom';
        document.getElementById(id + '_swf').setContentHeight($(id).getSize().size.y + $(id + '_height_offset').value.toInt(), dir);
    } catch(e) {}
}

function scroll_bar_el_position(s_id, id) {
    return $(id) ? $(id).getPosition().y - $(s_id).getPosition().y : 0;
}

////////////////////////////////
// Clip Manager
////////////////////////////////

// loads in the manager
function clip_manager_load(div, clip_id, onComplete) {
    if ( !onComplete ) {
        onComplete = function(data) {
            $(div).innerHTML = data;
        }
    }
    var group_id = 0;
    if ( $('current_group_id') ) {
        group_id = $('current_group_id').getValue();
    }
    refresh_page({
        url: '/ajax/clip/add_to',
        jdata: {
            clip_id: clip_id,
            div: div,
            group_id: group_id,
            width: $(div).getSize().size.x - 20
        },
        onComplete: onComplete
    });
}

var clip_manager_fx = [];
function clip_manager(type, clip_id, obj_id, is_checked, not_owner) {
    if ( not_owner == 1 ) { // added by someone else, so just remove from list
        if ( !confirm('You are about to remove your clip from someone else\'s ' + type + '. Are you sure you want to do this?') ) {
            $(type + '_clip_manage_chkbox_' + obj_id).checked = true;
            return false;
        }

        $(type + '_manage_' + obj_id).hide();
    }

    $(type + '_clip_manage_chkbox_' + obj_id).disabled = true;

    var url = '/ajax/' + type + '/submit_clip_manager';

    if ( type == 'album') url = '/ajax/playlist/submit_clip_manager';

    groups_id = 0;
    if ( type == 'groupalbum' ){
        groups_id = $('group_id').value;
    }

    if ( is_checked ) {
        $(type + '_manage_' + obj_id).addClass('checked');
    } else {
        $(type + '_manage_' + obj_id).removeClass('checked');
    }

    clip_manager_scroll_bar_adjust();

    refresh_page({
        url: url,
        jdata: {
            clip_id: clip_id,
            add_list: is_checked ? obj_id : '',
            remove_list: !is_checked ? obj_id : '',
            groups_id: groups_id
        },
        onComplete: function(response) {
            $(type + '_clip_manage_chkbox_' + obj_id).disabled = false;

            var save_el = $(type + '_manage_' + obj_id + '_response');

            if ( is_checked ) {
                save_el.innerHTML = (response != ' ') ? response : 'added';
                save_el.setStyle('color', '#148c00');
            } else {
                save_el.innerHTML = 'removed';
                save_el.setStyle('color', '#f75342');
            }
            if ( clip_manager_fx[type + obj_id] ) clip_manager_fx[type + obj_id].stop();
            clip_manager_fx[type + obj_id] = new Fx.Style(save_el, 'opacity',{ duration: 3000}).start(0.99, 0);

            //enable or disable all boxes
            if (type == 'group') {
                group_clips = $('group_clip_manager').getElements('input[id^=group_clip_manage_chkbox]');
                group_clips_checked = [];
                group_clips_not = [];
                group_clips.each(function(el, i) {
                    (el.checked) ?  group_clips_checked.push(el) : group_clips_not.push(el);
                });
                if (group_clips_checked.length >= 10) {
                    group_clips_not.each(function(el, i) { el.disabled = true; });
                } else {
                    group_clips_not.each(function(el, i) { el.disabled = false; });
                }
            }
        }
    });
}

function clip_manager_scroll_bar_adjust() {
    var chk = $('clip_manager_container');
    if ( chk ) {
        if ( chk.getValue().indexOf('scroll') >= 0) {
            scroll_bar_update(chk.getValue());
        }
    }
}

/////// ALBUMS,CHANNELS,GROUPS creation ////////
function toggle_new_collection(type) {
    var el = $('create_new_' + type);
    el.toggle();

    if ( el.getStyle('display') != 'none' ) {
        $('create_' + type + '_title').focus();
    }

    clip_manager_scroll_bar_adjust();
}

function create_new_collection(type, clip_id) {
    var url = '/ajax/' + type + '/create_new_submit';
    if ( type == 'album') url = '/ajax/playlist/create_new_submit';

    $('create_' + type + '_btn').disable();

    refresh_page({
        pars: '&clip_id=' + clip_id,
        form: 'create_new_' + type + '_frm',
        url: url,
        onComplete: function() {
            toggle_new_collection(type);
            $('create_new_' + type + '_frm').reset();
            $('create_' + type + '_btn').enable();
            refresh_collection(type, clip_id);
        }
    });
}

function refresh_collection(type, clip_id) {
    var url = '/ajax/' + type + '/clip_manager';
    if ( type == 'album' ) url = '/ajax/playlist/clip_manager';

    groups_id = 0;
    if ( type == 'groupalbum' ){
        groups_id = $('group_id').value;
    }

    refresh_page({
        div: type + '_clip_manager',
        jdata: { clip_id: clip_id,
                 groups_id: groups_id
               },
        url: url,
        onComplete: function() {
            clip_manager_scroll_bar_adjust();
        }
    });
}

function compose(user_id) {
    var url = '/messages/compose';
    if (user_id) url += '/' + user_id;
    if (tooltip) tooltip.hideTooltip();

    $('lightbox').setHTML('<div class="loading" style="width:440px; height:250px;"><div style="padding:100px;">Loading</div></div>');
    showLightbox(url, 1000, (window.getScrollTop() + 100), 221, 250);
}

function toggle_sending(checkbox) {
    var button = $('send_message');
    if (checkbox.checked) {
        button.removeClass('grey_button');
        return;
    }
    button.addClass('grey_button');
}

function send_new_message(o) {
    if (($('person_search') && !$('person_search').value) || !$('recipient_user_id').value) {
        alert('Please select a recipient for this message.')
        return false;
    }
    else if ($('message_text').value.trim().length == 0) {
        alert('Please enter a message before sending.')
        return false;
    }
    else if ($('send_message').hasClass('grey_button')) {
        alert('You must agree to the terms above.')
        return false;
    }

    $(o).disable('Sending...');

    refresh_page({
        url: '/ajax/messages/send_message',
        form: 'form_compose',
        jdata: { 'thread': false },
        onComplete: function() {
            if ($('messages_container')) {
                $('sent_count').setText($('sent_count').getText().toInt() + 1);
                $('total_count').setText($('total_count').getText().toInt() + 1);

                if ($('sent_content').innerHTML.length != 0) {
                    refresh_page({
                        url: '/ajax/messages/sent',
                        jdata: { page: sent_page },
                        div: 'sent_content',
                        evalScripts: true,
                        disable_loader: true
                    });
                }
            }

            $(o).disable('Message Sent!');
            (function() { closeLightbox(); }).delay(1000);
        }
    });
}

//for user autocomplete
function select_person(user) {
    window.location = user.url_name;
}

/**
 * APRIL FOOLS 2011
 */
function voicetron() {

    var content = '<a class="x" href="javascript:void(0)">×</a><div id="vt_placeholder"></div>';

    if (window.voicetron_close == null || window.voicetron_close == undefined) {

        window.voicetron_2k = new Element('div', {
           id: 'voicetron2k',
           styles: 'display: none'
        }).inject(document.body);

        window.voicetron_2k.innerHTML = content;

        var flashvars = {
            audio_url: 'http://a.vimeocdn.com/flash/voiceo/1.0.0/audio/',
            redirect_url: '/voicecontrol'
        };

        var params = {
            allowscriptaccess: 'always',
            wmode: 'transparent'
        };

        var attributes = {
            id: 'voiceo',
            name: 'voiceo'
        };

        swfobject.embedSWF('http://a.vimeocdn.com/flash/voiceo/1.0.0/voiceo.swf?1', 'vt_placeholder', '520', '670', '10.0.0', 'http://a.vimeocdn.com/flash/expressInstall.swf', flashvars, params, attributes);

    }

    window.voicetron_2k.show();

    if (window.voicetron_close == null || window.voicetron_close == undefined) {

        window.voicetron_close = voicetron_2k.getElement('a.x');

        window.voicetron_close.addEvent('click', function(e) {
            e.preventDefault();
            window.voicetron_2k.hide();
        });

    }

}