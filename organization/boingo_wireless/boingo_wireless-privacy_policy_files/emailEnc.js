// JavaScript Document

//TODO: get rid of this file, diff it with the one on boingo.com/jscript 
// move the entire thing to shared and update all files that reference it

function printEmail(url, eol, cssid, image, subj, ltstr, body)
{
   var a_sym = '@';
   var domain = 'boingo';
   var domain2 = 'boingo';
   var domain3 = 'prequent';
   var domain4 = 'cmpcommunications';     
   var domain5 = 'gcigroup';  
   var mailStr;
   
   switch(url) {
  	case 'Emb':
       mailStr = 'devices' + a_sym + domain + '.' + 'com';
       break;
  	case 'zzWeb':
       mailStr = 'zzWebTeam' + a_sym + domain + '.' + 'com';
       break;
     case 'OpsMail':
       mailStr = 'noc' + a_sym + domain + '.' + 'com';
       break;
     
     case 'Conference':
       mailStr = 'conferences' + a_sym + domain + '.' + 'com';
       break;
     case 'EmbedIT':
       mailStr = 'devices' + a_sym + domain + '.' + 'com';
       break;
     case 'HotSpots':
       mailStr = 'hot_spots' + a_sym + domain + '.' + 'com';
       break;
     case 'serviceCenter':
       mailStr = 'service' + a_sym + domain + '.' + 'com';
       break;
     case 'Information':
       mailStr = 'info' + a_sym + domain + '.' + 'com';
       break;
     case 'Careers':
       mailStr = 'jobs' + a_sym + domain + '.' + 'com';
       break;
  	case 'CrSale':
       mailStr = 'carriersales' + a_sym + domain + '.' + 'com';
       break;
     case 'PrContact':
       mailStr = 'cgunning' + a_sym + domain + '.' + 'com';
       break;
     case 'Help':
       mailStr = 'support' + a_sym + domain + '.' + 'com';
       break;
  	case 'Plan':
       mailStr = 'groupplans' + a_sym + domain + '.' + 'com';
       break;
      case 'LegalIssue':
       mailStr = 'legal' + a_sym + domain + '.' + 'com';
       break;
     case 'Linkshare':
       mailStr = 'affiliate' + a_sym + domain + '.' + 'com';
       break;
     case 'Airport':
       mailStr = 'business' + a_sym + domain + '.' + 'com';
       break;
     case 'Hotel':
       mailStr = 'business' + a_sym + domain + '.' + 'com';
       break;
     case 'ConventionCtr':
       mailStr = 'business' + a_sym + domain + '.' + 'com';
       break;
      case 'HSO':
       mailStr = 'hsiab' + a_sym + domain + '.' + 'com';
       break;
  	 case 'BusinessDev':
       mailStr = 'business' + a_sym + domain + '.' + 'com';
       break;
  	 case 'BoingoAgnt':
       mailStr = 'agents' + a_sym + domain + '.' + 'com';
       break;
  	 case 'Sale':
       mailStr = 'sales' + a_sym + domain + '.' + 'com';
       break;
  	 case 'Retail':
       mailStr = 'mktg' + a_sym + domain + '.' + 'com';
       break;
  	 case 'MobileSupport':
       mailStr = 'mobilesupport' + a_sym + domain + '.' + 'com';
       break;	
  	 case 'MobileFeeback':
       mailStr = 'feedback' + a_sym + 'mobile' + '.' + domain + '.' + 'com';
       break;
  	 case 'MediaInquiries':
       mailStr = 'cgunning' + a_sym + domain + '.' + 'com';
       break;
  	 case 'jiwire':
       mailStr = 'christian' + a_sym + domain3 + '.' + 'com';
       break;
  	 case 'MediaInquiries2':
       mailStr = 'Kirsten' + a_sym + domain2 + '.' + 'com';
       break;
  	 case 'MediaInquiries3':
       mailStr = 'Yvette' + a_sym + domain2 + '.' + 'com';
       break;
  	 case 'cnpcommunications':
       mailStr = 'nward' + a_sym + domain2 + '.' + 'com';
       break;
  	 case 'baochi':
       mailStr = 'bnguyen' + a_sym + domain + '.' + 'com';
       break;
  	 case 'wayport':
       mailStr = 'bnguyen' + a_sym + domain + '.' + 'com';
       break;
  	 case 'gcigroup':
       mailStr = 'lmauro' + a_sym + domain5 + '.' + 'com';
       break;
   }
   
   var mailout = EncodeEmail(mailStr, eol, cssid, image, subj, ltstr, body);
   document.write(mailout);
}
function printComEmail(name, domain, eol, cssid, image, subj, ltstr, body)
{
  /* choose not to pass in "com" in case a sophisticated spider is looking for that */
   var a_sym = '@';
   
   mailStr = name + a_sym + domain + '.' + 'com';
   
   var mailout = EncodeEmail(mailStr, eol, cssid, image, subj, ltstr, body);
   document.write(mailout);
}
function Rand(maxPlusOne)
{
    return Math.floor(Math.random() * maxPlusOne);
}
function EncodeEmail(str, eol, cssid, image, subj, ltstr, body)
{
	if (!ltstr)
	  ltstr = str;
	    
	if (cssid && !subj)
     doneStr = "<a id='" + cssid + "'  href='mailto:" + str + "'>" + ltstr + "</a>";
	else if (image)
	 doneStr = "<a href='mailto:" + str + "'><image src='" + image + "' border='0'></a>";
	else if (subj && cssid)
		 doneStr = "<a id='" + cssid + "' href=\"mailto:" + str + "?" + "subj" + "ect="+subj+"&body="+body+"\">" + ltstr + "</a>";
	else if (subj && !cssid)
	 doneStr = "<a href='mailto:" + str +  "?" + "subj" + "ect="+subj+"&body="+body+"'>" + ltstr + "</a>";
    else 
	  doneStr = "<a href='mailto:" + str + "'>" + ltstr + "</a>";
	 
	if(eol)
	  doneStr += '';
   // alert(doneStr);
    loc = 0;
    LetterList = "";
    while (loc < doneStr.length)
    {
	l = doneStr.slice(loc, loc+1);
	if (LetterList.indexOf(l) == -1)
	{
	    p = Rand(LetterList.length + 1);
	    LetterList = LetterList.slice(0, p) + l +
		LetterList.slice(p, LetterList.length + 1);
	}
	loc ++;
    }
	
    LetterListEscaped = LetterList;
	
    // At this point there should only be at most one \ and "
    // in LetterList and LetterListEscaped
    p = LetterListEscaped.indexOf("\\");
    if (p != -1)
    {
	LetterListEscaped = LetterListEscaped.slice(0, p) + "\\" +
	    LetterListEscaped.slice(p, LetterListEscaped.length);
    }
    p = LetterListEscaped.indexOf("\"");
    if (p != -1)
    {
	LetterListEscaped = LetterListEscaped.slice(0, p) + "\\" +
	    LetterListEscaped.slice(p, LetterListEscaped.length);
    }
	
    doneStr2 = "<script language=\"javascript\">\n";
/*    doneStr2 += "<!--\n"; */
    doneStr2 += "ML=\"" + LetterListEscaped + "\";\n";
    doneStr2 += "MI=\"";
	
    loc = 0;
    while (loc < doneStr.length)
    {
	p = LetterList.indexOf(doneStr.slice(loc, loc+1));
	p += 48;
	doneStr2 += String.fromCharCode(p);
	loc ++;
    }
	
    doneStr2 += "\";\n";
    doneStr2 += "OT=\"\";\n";
    doneStr2 += "for(j=0;j<MI.length;j++){\n";
    doneStr2 += "OT+=ML.charAt(MI.charCodeAt(j)-48);\n";
    doneStr2 += "}document.write(OT);</scr" + "ipt>";
 
/*    doneStr2 += "}document.write(OT);\n";
    doneStr2 += "// --></scr" + "ipt>\n";
    doneStr2 += "<nosc" + 
        "ript>You need JavaScript to see my email address</nosc" + "ript>";
*/    
    return doneStr2;
	//alert(doneStr2);
}
