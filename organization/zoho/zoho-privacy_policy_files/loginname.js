<!--

var prot=window.location.protocol;
        var url=window.location.pathname;
        if(iamCookie("IAMAGENTTICKET_secureonly") && prot=="http:"){

                window.location="https://www.zoho.com"+url;
                }

  var _iam = "https://accounts.zoho.com";
  var username = iamCookie('IAMAGENTTICKET_un')
  var serviceurl = encodeURI(window.location.href);
  var logouturl = _iam + "/logout?serviceurl=" + serviceurl;
  var loginurl = _iam + "/login?serviceurl=" + serviceurl;

function insertLoginIframe()
{
var headeriframeelement= document.getElementById("headeriframe");
  if(!username)
  {
      headeriframeelement.innerHTML = "<br><span class='addons1'><a class=addons1 href=javascript:disableDiv()><b>Sign In</b></a></span>";
  }
  else
  {
        headeriframeelement.innerHTML = "<br><span class='addons1'><a id=logout class=addons1 href="+logouturl+">Logout<b>&nbsp;&nbsp;&nbsp;"+username+"</b></a></span>";

  }
}
function iamCookie(IAMAGENTTICKET)
{
	var nameEQ = IAMAGENTTICKET + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function disableDiv()
{
	ie=document.all && !window.opera;
	this.standbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body;
	var pageH =(ie)?  this.standbody.clientHeight : window.innerHeight;
	var pageW =(ie)?  this.standbody.clientWidth : window.innerWidth;
	var divObj = document.getElementById("disablediv");

	divObj.style.display = 'block';
	divObj.style.height = pageH+"px";
	divObj.style.width = pageW-20+"px";
	var logindiv=document.getElementById("logDiv");
	logindiv.style.display="block";
	logindiv.innerHTML='<span class=addons1><div align="right"><a href="javascript:hide()">Cancel</a></div></span><iframe src="'+loginurl+'" width=285px height=286px frameborder=0 name=iframe scrolling="no"></iframe>';

}

function hide()
{
	var divObj = document.getElementById("disablediv");
	divObj.style.display = 'none';
	divObj.style.height = "0px";
	divObj.style.width = "0px";
	document.getElementById("logDiv").style.display="none";
}
insertLoginIframe();
if(document.getElementById('logout')!=null){document.getElementById("SG5").className="non";document.getElementById("SG6").className="non";}
//-->
