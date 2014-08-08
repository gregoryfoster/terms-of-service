function wfOpenWin(url,wname,wfeatures){newwin="";
if(!wname){wname="Help"
}if(!wfeatures){wfeatures="height=300,width=300,toolbar=no,locationbar=no,personalbar=no,menubar=yes,status=yes,resizable=yes"
}if(!url){url="about:blank"
}if(hasTryCatch()){eval("try { newwin = window.open(url, wname, wfeatures); } catch (e) { newwin = ''; }")
}else{newwin=window.open(url,wname,wfeatures)
}if(newwin!==""){if(!window.opera){newwin.focus()
}}else{return true
}return false
}function showPopUpMsg(b){var a="popupmessage";
var c="Your computer settings do not allow other browser windows to open, which prevents our site from working properly.";
c+='<a href="'+b+'" onclick="wfOpenWin( \''+b+"');hidePopupMessage(); return true;\">";
c+="<p>Open the page in this window</a>.</p>";
c+='<p align="center"><a href="#" onclick="hidePopupMessage(); return false;">Close this message</a></p>';
c+="</div>";
if(!document.createElement){return
}var d=document.createElement("div");
if(typeof(d.innerHTML)!="string"){return
}d.id="popupmessage";
d.style.className=a;
document.body.appendChild(d);
d.innerHTML=c
}function hidePopupMessage(){var a=document.getElementById("popupmessage");
if(a){a.parentNode.removeChild(a)
}}function hasTryCatch(){var tc=false;
if(document.layers){return tc
}window.onerror=function(){onerror=null;
return true
};
eval("try{} finally{tc=true;}");
window.onerror=null;
return tc
}var calculatorGlobalMonthlyTargetAmount=0;
var calculatorGlobalTargetAmount=0;
function changeDisplayState(b){var a=document.getElementById(b);
if(a.style.display=="none"){if(navigator.appName.indexOf("Microsoft")!=-1){a.style.display="block"
}else{a.style.display="table"
}}else{a.style.display="none"
}}function showCalculator(b){b=(b)?b:event;
if(b){if(document.getElementById("calculator").style.visibility!="visible"){var c=(b.target)?b.target:b.srcElement;
if(c.nodeType==1&&c.tagName.toUpperCase()=="A"){var d=c.getElementsByTagName("IMG");
if(d.length>0){c=d[0]
}}var a=getElementPosition(c.id);
shiftTo("calculator",a.left+c.offsetWidth,a.top);
show("calculator")
}else{hideAll()
}}}function toggleAllCalculator(){changeDisplayState("calculatorRow")
}function showAllCalculator(){changeDisplayState("calculatorRow")
}function hideAllCalculator(){changeDisplayState("calculatorRow")
}function toggleObject(b){var a=getObject(b);
if(a){if(a.display=="table"){setDisplay(b,"none")
}else{setDisplay(b,"table")
}}}function createCalculator(){}function roundDec(b,a){return shiftRight(Math.round(shiftRight(b,a)),-a)
}function floorDec(b,a){return shiftRight(Math.floor(shiftRight(b,a)),-a)
}function shiftRight(d,a){if(a==0){return(d)
}else{var e=1;
var b=a;
if(b<0){b=-b
}for(var c=1;
c<=b;
c++){e=e*10
}}if(a>0){return(e*d)
}else{return(d/e)
}}function getCommaDelimitedNumberAsString(c){var e=new String(c);
var d=new String("");
var b=e.length-1;
var a=0;
for(b=e.length-1;
b>=0;
b--){if(a!=0&&a%3==0){d=","+d
}d=e.charAt(b)+d;
a++
}return d
}function stripCommas(b){var a=new String("");
for(i=0;
i<b.length;
i++){if(b.charAt(i)!=","){a+=b.charAt(i)
}}return a
}function stripBlanks(a){var b=new String("");
for(i=0;
i<a.length;
i++){if(a.charAt(i)!=" "){b+=a.charAt(i)
}}return b
}function validateCalculatorForm(){var calcTargetAmountKnownRadio=document.getElementById("calculatorTargetAmountKnown");
var calcMonthlyAmountKnownRadio=document.getElementById("calculatorMonthlyAmountKnown");
var calcTargetAmountField=document.getElementById("calculatorTargetAmount");
var calcMonthlyAmountField=document.getElementById("calculatorMonthlyAmount");
var calcTargetDateField=document.getElementById("calculatorTargetDate");
var calcAvailableBalanceField=document.getElementById("calculatorAvailableBalance");
var interestRateField=document.getElementById("calculatorInterestRate");
var calculatorMessageLabel=document.getElementById("calculatorMessageLabel");
var returnValue=true;
var errorMessage="";
var spanCalcTargetAmount=document.getElementById("spanCalcTargetAmount");
var spanCalcTargetAmountError=document.getElementById("spanCalcTargetAmountError");
spanCalcTargetAmountError.style.display="none";
if(calcTargetAmountKnownRadio.checked){var strippedTargetAmount=stripCommas(calcTargetAmountField.value);
var strippedAvailableBalance=stripCommas(calcAvailableBalanceField.value);
if(isNaN(strippedTargetAmount)||strippedTargetAmount.length==0){spanCalcTargetAmount.className="calcAlertText";
changeDisplayState("spanCalcTargetAmountError");
returnValue=false
}else{var numStrippedTargetAmount=eval(strippedTargetAmount);
var numAvailableBalance=eval(strippedAvailableBalance);
if(numStrippedTargetAmount<1){spanCalcTargetAmount.className="calcAlertText";
changeDisplayState("spanCalcTargetAmountError");
errorMessage="<strong>Please enter a target amount from $1 to $999,999,999.</strong>";
returnValue=false
}else{if(numStrippedTargetAmount>999999999){spanCalcTargetAmount.className="calcAlertText";
changeDisplayState("spanCalcTargetAmountError");
errorMessage="<strong>Please enter a target amount from $1 to $999,999,999.</strong>";
returnValue=false
}else{if(numStrippedTargetAmount<=numAvailableBalance){spanCalcTargetAmount.className="calcAlertText";
changeDisplayState("spanCalcTargetAmountError");
errorMessage="<strong>Enter a target amount greater than your available balance and click on the calculate button.</strong>";
returnValue=false
}else{spanCalcTargetAmount.className="calcNormalText"
}}}}}else{spanCalcTargetAmount.className="calcNormalText"
}var spanCalcMonthlyAmount=document.getElementById("spanCalcMonthlyAmount");
var spanCalcMonthlyAmountError=document.getElementById("spanCalcMonthlyAmountError");
spanCalcMonthlyAmountError.style.display="none";
if(calcMonthlyAmountKnownRadio.checked){var strippedMonthlyAmount=stripCommas(calcMonthlyAmountField.value);
if(isNaN(strippedMonthlyAmount)||strippedMonthlyAmount.length==0){spanCalcMonthlyAmount.className="calcAlertText";
changeDisplayState("spanCalcMonthlyAmountError");
returnValue=false
}else{spanCalcMonthlyAmount.className="calcNormalText"
}}else{spanCalcMonthlyAmount.className="calcNormalText"
}var spanCalcAvailableBalance=document.getElementById("spanCalcAvailableBalance");
var spanCalcAvailableBalanceError=document.getElementById("spanCalcAvailBalanceError");
spanCalcAvailableBalanceError.style.display="none";
var strippedAvailableBalance=stripCommas(calcAvailableBalanceField.value);
if(isNaN(strippedAvailableBalance)||strippedAvailableBalance.length==0){spanCalcAvailableBalance.className="calcAlertText";
changeDisplayState("spanCalcAvailBalanceError");
returnValue=false
}else{spanCalcAvailableBalance.className="calcNormalText"
}var spanCalcTargetDate=document.getElementById("spanCalcTargetDate");
var spanCalcTargetDateError=document.getElementById("spanCalcTargetDateError");
spanCalcTargetDateError.style.display="none";
var targetDateRegExp=/^\s+\d\d\/\s+\d\d\/\s+\d\d\d\d\s+$/;
var strippedTargetDate=stripBlanks(calcTargetDateField.value);
if(strippedTargetDate.length<10||isNaN(new Date(strippedTargetDate))||targetDateRegExp.exec(strippedTargetDate)||strippedTargetDate.substring(0,2)>12||strippedTargetDate.substring(3,5)>31){spanCalcTargetDate.className="calcAlertText";
changeDisplayState("spanCalcTargetDateError");
if(returnValue==true&&errorMessage.length<=0){errorMessage="<strong>Please use the MM/DD/YYYY format for your target date.</strong>"
}returnValue=false
}else{spanCalcTargetDate.className="calcNormalText";
var todayDate=new Date();
var futureDate=new Date(calcTargetDateField.value);
if(calcTargetDateField.value.length==6||calcTargetDateField.value.length==8){futureDate.setFullYear(futureDate.getFullYear()+100)
}if(futureDate<todayDate){spanCalcTargetDate.className="calcAlertText";
changeDisplayState("spanCalcTargetDateError");
returnValue=false
}}var spanCalcInterestRate=document.getElementById("spanCalcInterestRate");
var spanCalcInterestRateError=document.getElementById("spanCalcInterestRateError");
spanCalcInterestRateError.style.display="none";
if(isNaN(interestRateField.value)||interestRateField.value.length==0){spanCalcInterestRate.className="calcAlertText";
changeDisplayState("spanCalcInterestRateError");
returnValue=false
}else{spanCalcInterestRate.className="calcNormalText"
}if(returnValue==false&&errorMessage.length==0){errorMessage="<strong>Complete or correct the highlighted fields and click on the Calculate button.</strong>"
}return errorMessage
}function calculateMonthlyAmounts(booleanShowSetAmountMessage){var calcTargetAmountField=document.getElementById("calculatorTargetAmount");
var calcMonthlyAmountField=document.getElementById("calculatorMonthlyAmount");
var calcTargetDateField=document.getElementById("calculatorTargetDate");
var calcAvailableBalanceField=document.getElementById("calculatorAvailableBalance");
var interestRateField=document.getElementById("calculatorInterestRate");
var calculatorMessageLabel=document.getElementById("calculatorMessageLabel");
var todayDate=new Date();
var futureDate=new Date(calcTargetDateField.value);
if(calcTargetDateField.value.length==6||calcTargetDateField.value.length==8){futureDate.setFullYear(futureDate.getFullYear()+100)
}var monthsDifference=1;
if(todayDate.getMonth()>futureDate.getMonth()){monthsDifference=(12-todayDate.getMonth()+futureDate.getMonth())+12*(futureDate.getFullYear()-1-todayDate.getFullYear())
}else{monthsDifference=(futureDate.getMonth()-todayDate.getMonth())+12*(futureDate.getFullYear()-todayDate.getFullYear())
}var presentValue=eval(stripCommas(calcAvailableBalanceField.value));
var monthlyPayment=eval(stripCommas(calcMonthlyAmountField.value));
var futureValue=0;
var interestRate=eval(interestRateField.value);
var monthsPerYear=12;
if(monthsDifference!=0){if(interestRateField){var numYears=monthsDifference/12;
if(interestRate>0){interestRate=interestRate/100;
var tempn=Math.pow(1+interestRate/monthsPerYear,monthsPerYear*numYears);
futureValue=(presentValue*tempn)+(monthlyPayment*(tempn-1)/(interestRate/monthsPerYear))
}else{futureValue=presentValue+monthlyPayment*monthsDifference
}}}var cdFutureValue=getCommaDelimitedNumberAsString(roundDec(futureValue,0));
var cdMonthlyPayment=getCommaDelimitedNumberAsString(floorDec(monthlyPayment,0));
var cdPresentValue=getCommaDelimitedNumberAsString(presentValue);
if(booleanShowSetAmountMessage){calculatorMessageLabel.innerHTML="<strong>You will save </strong> $"+cdFutureValue+" in "+monthsDifference+" months.<br/><br/>Savings total based on:<br/><strong>Monthly savings of </strong>$"+cdMonthlyPayment+"<br/><strong>Available balance of </strong>$"+cdPresentValue+"<br/><strong>Interest rate of </strong>"+interestRate+"%<br/><br/>Click the Set Amount button if $"+cdFutureValue+" is your savings goal target amount."
}else{calculatorMessageLabel.innerHTML="<strong>You will save </strong> $"+cdFutureValue+" in "+monthsDifference+" months.<br/><br/>Savings total based on:<br/><strong>Monthly savings of </strong>$"+cdMonthlyPayment+"<br/><strong>Available balance of </strong>$"+cdPresentValue+"<br/><strong>Interest rate of </strong>"+interestRate+"%<br/><br/>"
}calculatorGlobalMonthlyTargetAmount=futureValue;
return false
}function calculateTargetAmounts(booleanShowSetAmountMessage){var calcTargetAmountField=document.getElementById("calculatorTargetAmount");
var calcMonthlyAmountField=document.getElementById("calculatorMonthlyAmount");
var calcTargetDateField=document.getElementById("calculatorTargetDate");
var calcAvailableBalanceField=document.getElementById("calculatorAvailableBalance");
var interestRateField=document.getElementById("calculatorInterestRate");
var calculatorMessageLabel=document.getElementById("calculatorMessageLabel");
var todayDate=new Date();
var futureDate=new Date(calcTargetDateField.value);
if(calcTargetDateField.value.length==6||calcTargetDateField.value.length==8){futureDate.setFullYear(futureDate.getFullYear()+100)
}var monthsDifference=1;
if(todayDate.getMonth()>futureDate.getMonth()){monthsDifference=(12-todayDate.getMonth()+futureDate.getMonth())+12*(futureDate.getFullYear()-1-todayDate.getFullYear())
}else{monthsDifference=(futureDate.getMonth()-todayDate.getMonth())+12*(futureDate.getFullYear()-todayDate.getFullYear())
}var availableBalance=eval(stripCommas(calcAvailableBalanceField.value));
var targetAmount=eval(stripCommas(calcTargetAmountField.value));
var amountNeededToSave=targetAmount-availableBalance;
var amountNeededToSavePerMonth=0;
if(amountNeededToSave<=0){calculatorMessageLabel.innerHTML="You already have enough money in your account to achieve this goal.  Please choose a larger target amount."
}else{if(monthsDifference!=0){amountNeededToSavePerMonth=Math.round(amountNeededToSave/monthsDifference,2);
if(interestRateField){var interestRate=eval(interestRateField.value);
var numYears=monthsDifference/12;
if(interestRate>0){var monthsPerYear=12;
interestRate=interestRate/100;
var tempn=Math.pow(1+interestRate/monthsPerYear,monthsPerYear*numYears);
amountNeededToSavePerMonth=(targetAmount-(availableBalance*tempn))/((tempn-1)/(interestRate/monthsPerYear));
amountNeededToSave=amountNeededToSavePerMonth*monthsDifference
}}}calculatorGlobalTargetAmount=floorDec(stripCommas(calcTargetAmountField.value),0);
var cdAmountToSave=getCommaDelimitedNumberAsString(roundDec(amountNeededToSave,0));
var cdAmountToSavePerMonth=getCommaDelimitedNumberAsString(roundDec(amountNeededToSavePerMonth,0));
var cdGlobalTargetAmount=getCommaDelimitedNumberAsString(calculatorGlobalTargetAmount);
if(booleanShowSetAmountMessage){calculatorMessageLabel.innerHTML="Based on your available balance of $"+availableBalance+", you need to save an additional $"+cdAmountToSave+" ($"+cdAmountToSavePerMonth+" per month) for "+monthsDifference+" months to reach your target amount of $"+cdGlobalTargetAmount+"<br/><br/><strong>Target Amount = </strong>$"+cdGlobalTargetAmount+"<br/><br/>Click the Set Amount button if $"+cdGlobalTargetAmount+" is your savings goal target amount."
}else{calculatorMessageLabel.innerHTML="Based on your available balance of $"+availableBalance+", you need to save an additional $"+cdAmountToSave+" ($"+cdAmountToSavePerMonth+" per month) for "+monthsDifference+" months to reach your target amount of $"+cdGlobalTargetAmount+"<br/><br/><strong>Target Amount = </strong>$"+cdGlobalTargetAmount
}}return false
}function doResults(a){var f=document.getElementById("resultsTab");
if(f.style.display=="none"){var d=validateCalculatorForm();
if(d.length<=0){var g=document.getElementById("calculatorTargetAmountKnown");
var h=document.getElementById("calculatorMonthlyAmountKnown");
if(g.checked){var c=calculateTargetAmounts(a)
}if(h.checked){var c=calculateMonthlyAmounts(a)
}var b=document.getElementById("calculatorErrorMessageLabel");
b.innerHTML="";
var k=document.getElementById("spanCalcGeneralError");
k.style.display="none";
changeDisplayState("calculateTab");
changeDisplayState("resultsTab");
var e=document.getElementById("resultsLink");
e.className="selectedTab";
var j=document.getElementById("calculateLink");
j.className="unSelectedTab"
}else{var b=document.getElementById("calculatorErrorMessageLabel");
b.innerHTML=""+d;
var k=document.getElementById("spanCalcGeneralError");
k.style.display="none";
changeDisplayState("spanCalcGeneralError")
}}}function doCalculate(){var c=document.getElementById("calculateTab");
if(c.style.display=="none"){changeDisplayState("calculateTab");
changeDisplayState("resultsTab");
var a=document.getElementById("resultsLink");
a.className="unSelectedTab";
var b=document.getElementById("calculateLink");
b.className="selectedTab"
}}function doSetAmount(){var b=document.getElementById("targetAmount");
var a=document.getElementById("targetDate");
var e=document.getElementById("calculatorTargetAmountKnown");
var d=document.getElementById("calculatorMonthlyAmountKnown");
if(e.checked){if(calculatorGlobalTargetAmount>=0){if(b){b.value=calculatorGlobalTargetAmount
}}}if(d.checked){if(calculatorGlobalMonthlyTargetAmount>=0){if(b){b.value=calculatorGlobalMonthlyTargetAmount
}}}if(a){var c=document.getElementById("calculatorTargetDate");
if(c){a.value=c.value
}}hideAllCalculator()
}function clearMonthlyAmountTextField(){var a=document.getElementById("calculatorMonthlyAmount");
if(a){a.value=""
}}function clearTargetAmountTextField(){var a=document.getElementById("calculatorTargetAmount");
if(a){a.value=""
}}var months=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var dayz=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
var leaddaysDB=new Array();
var holidayDB=new Array();
var sysdate=new Date();
var sendonDate;
var deliveronDate;
var lead;
var daysahead=365;
var dayspast=-31;
var nextMonth;
var previousMonth;
var startDate;
var firstEverAvailableStartDate=new Date();
var calendarFixedStartDate=new Date();
var isYearFormatYY=false;
function getFirstDay(c,a){var b=new Date(c,a,1);
return b.getDay()
}function getMonthLen(c,a){var b=new Date(c,a+1,1);
b.setHours(b.getHours()-3);
return b.getDate()
}function showCalendar(b){b=(b)?b:event;
if(b){if(document.getElementById("calendar").style.display!="block"||document.getElementById("calendar").style.display!="table"){var c=(b.target)?b.target:b.srcElement;
if(c.nodeType==1&&c.tagName.toUpperCase()=="A"){var d=c.getElementsByTagName("IMG");
if(d.length>0){c=d[0]
}}var a=getElementPosition(c.id);
shiftTo("calendar",a.left+c.offsetWidth,a.top);
show("calendar")
}else{toggleAllCalendar(b)
}}}function showAllCalendar(){show("calendar");
show(document.getElementById("navtopnext"));
show(document.getElementById("navtopprev"))
}function hideAllCalendar(){hide("calendar");
hide(document.getElementById("navtopnext"));
hide(document.getElementById("navtopprev"))
}function formatDate(b){var d=formatMonthofyear(b.getMonth()+1);
var c=b.getFullYear();
var a=formatDayofmonth(b.getDate());
return d+"/"+a+"/"+c
}function toggleAllCalendar(b,j,h,m,k,g,a,d,c){var n=document.getElementById("calendarRow");
var f=0;
var e=0;
var o=0;
var l=0;
if(self.pageYOffset){o=self.pageXOffset;
l=self.pageYOffset
}else{if(document.documentElement&&document.documentElement.scrollTop){o=document.documentElement.scrollLeft;
l=document.documentElement.scrollTop
}else{if(document.body){o=document.body.scrollLeft;
l=document.body.scrollTop
}}}if(m){this.targetFormFieldName=m
}if(k){this.lastAvailableDate=k
}if(g){this.calendarFixedStartDate=new Date(g);
this.startDate=g;
this.firstEverAvailableStartDate=new Date(g);
this.firstEverAvailableStartDate.setMilliseconds(0);
this.firstEverAvailableStartDate.setSeconds(0);
this.firstEverAvailableStartDate.setMinutes(0);
this.firstEverAvailableStartDate.setHours(0)
}if(d){this.bWeekendsSelectable=d
}else{this.bWeekendsSelectable=true
}if(j){f=parseInt(j)
}if(h){e=parseInt(h)
}if(a){this.highlightDate=a
}else{this.highlightDate=new Date();
this.highlightDate.setMilliseconds(0);
this.highlightDate.setSeconds(0);
this.highlightDate.setMinutes(0);
this.highlightDate.setHours(0)
}if(c){this.isYearFormatYY=true
}if(b){if(b.pageX){n.style.left=(b.pageX+f)+"px"
}if(b.pageY){n.style.top=(b.pageY+e)+"px"
}if(b.x){n.style.left=(b.x+f)+"px"
}if(b.y){n.style.top=(b.y+e+l)+"px"
}}createCalendar(this.highlightDate,this.targetFormFieldName,this.lastAvailableDate,this.bWeekendsSelectable,this.highlightDate);
changeDisplayState("calendarRow")
}function createCalendar(d,j,e,a,f){var m;
var h;
var c;
var g;
var b;
var l;
m=new Date(d);
m.setSeconds(0);
m.setMinutes(0);
m.setHours(0);
var k=new Date(e);
this.targetFormFieldName=j;
if(a){this.bWeekendsSelectable=a
}if(f){this.highlightDate=f
}this.lastAvailableDate=e;
this.startDate=d;
h=new Date(m);
h.setSeconds(0);
h.setMinutes(0);
h.setHours(0);
h.setDate(1);
c=new Date(h);
b=new Date(h);
l=new Date(h);
g=new Date(h);
if(h.getMonth()==0){c.setMonth(11);
c.setFullYear(h.getFullYear()-1)
}else{c.setMonth(h.getMonth()-1)
}if(h.getMonth()==11){b.setMonth(0);
b.setFullYear(h.getFullYear()+1)
}else{b.setMonth(h.getMonth()+1)
}l.setFullYear(h.getFullYear()+1);
g.setFullYear(h.getFullYear()-1);
populateNavigation(c,b,g,l,j,k);
populateTables(m,j,k)
}function populateNavigation(o,f,c,e,m,j){var b=new day(o,this.firstEverAvailableStartDate,j,this.bWeekendsSelectable);
var d=new day(f,this.firstEverAvailableStartDate,j,this.bWeekendsSelectable);
var l=new day(c,this.firstEverAvailableStartDate,j,this.bWeekendsSelectable);
var h=new day(e,this.firstEverAvailableStartDate,j,this.bWeekendsSelectable);
if((!document.all)&&(document.getElementById)){var k="createCalendar('"+f+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");";
var g="createCalendar('"+o+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");";
var a="createCalendar('"+e+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");";
var n="createCalendar('"+c+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");";
if(d.nextMonthAvailable()){document.getElementById("navtopnext").setAttribute("onclick",k);
show(document.getElementById("navtopnext"))
}else{hide(document.getElementById("navtopnext"))
}if(b.previousMonthAvailable()){document.getElementById("navtopprev").setAttribute("onclick",g);
show(document.getElementById("navtopprev"))
}else{hide(document.getElementById("navtopprev"))
}if(h.nextYearAvailable()){document.getElementById("imgNavToNextYear").setAttribute("onclick",a);
show(document.getElementById("imgNavToNextYear"))
}else{hide(document.getElementById("imgNavToNextYear"))
}if(l.previousYearAvailable()){document.getElementById("imgNavToPrevYear").setAttribute("onclick",n);
show(document.getElementById("imgNavToPrevYear"))
}else{hide(document.getElementById("imgNavToPrevYear"))
}}if((document.all)&&(document.getElementById)){var k=new Function("createCalendar('"+f+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");");
var g=new Function("createCalendar('"+o+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");");
var a=new Function("createCalendar('"+e+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");");
var n=new Function("createCalendar('"+c+"', '"+m+"', '"+j+"', "+this.bWeekendsSelectable+");");
if(d.nextMonthAvailable()){document.getElementById("navtopnext")["onclick"]=k;
show(document.getElementById("navtopnext"))
}else{hide(document.getElementById("navtopnext"))
}if(b.previousMonthAvailable()){document.getElementById("navtopprev")["onclick"]=g;
show(document.getElementById("navtopprev"))
}else{hide(document.getElementById("navtopprev"))
}if(h.nextYearAvailable()){document.getElementById("imgNavToNextYear")["onclick"]=a;
show(document.getElementById("imgNavToNextYear"))
}else{hide(document.getElementById("imgNavToNextYear"))
}if(l.previousYearAvailable()){document.getElementById("imgNavToPrevYear")["onclick"]=n;
show(document.getElementById("imgNavToPrevYear"))
}else{hide(document.getElementById("imgNavToPrevYear"))
}}}function populateTables(b,c,a){deleteTable();
populateTable(b,c,a)
}function deleteTable(){var a=document.getElementById("firstCalendarBody");
while(a.rows.length>0){a.deleteRow(0)
}}function populateTable(o,b,v){var q="firstCalendarHeader";
var j="firstCalendarBody";
var k=getFirstDay(o.getFullYear(),o.getMonth());
var u=getMonthLen(o.getFullYear(),o.getMonth());
var l=1;
var n=document.getElementById(j);
var g=new Date(o);
document.getElementById(q).innerHTML=months[o.getMonth()]+" "+o.getFullYear();
var a,f;
var p=false;
var t="";
var c;
var s;
while(!p){a=n.insertRow(n.rows.length);
if(a){for(var r=0;
r<7;
r++){f=a.insertCell(a.cells.length);
g.setDate(l);
if(n.rows.length==1&&r<k){f.innerHTML="&nbsp;";
f.id=0;
continue
}if(l==u){p=true
}if(l<=u){var e=new day(g,this.firstEverAvailableStartDate,v,this.bWeekendsSelectable);
var m=e.isSelectable();
var h=e.formatDay();
f.id=h;
if(!m){f.innerHTML='<div class="dayCounter">'+l+"</div>"
}else{if(this.highlightDate&&this.highlightDate==e.formatDay()){var d="<div class=\"dayCounter\"><a id='highlighteddatelink' onClick=\"chooseDate(event, '"+h+"');\" href='#null' >"+l+"</a></div>"
}else{var d="<div class=\"dayCounter\"><a id='datelink' onClick=\"chooseDate(event, '"+h+"');\" href='#null' >"+l+"</a></div>"
}f.innerHTML=d
}if(!m){t+=" notselectable"
}f.className=t;
l++;
t=""
}else{f.id=0;
f.innerHTML="&nbsp;"
}}}else{p=true
}}}function chooseDate(e,b){var d=document.getElementById(this.targetFormFieldName),f=function(j,h,l){if((typeof TeaLeaf!="undefined")&&(typeof TeaLeaf.Client!="undefined")&&(typeof TeaLeaf.Client.tlAddEvent!="undefined")){if(document.createEventObject){var k=document.createEventObject();
k.type=h;
k.target=j;
k.value=l;
TeaLeaf.Client.tlAddEvent(k)
}else{var k=document.createEvent("MutationEvent");
k.initMutationEvent(h,true,true,j,j.value,l,MutationEvent.MODIFICATION,null);
j.dispatchEvent(k)
}}};
if(d){if(this.isYearFormatYY){var g=b.length;
var c=b.substring(0,6);
var a=b.substring(8,g);
b=c+a
}d.value=b
}toggleAllCalendar(e);
f(d,"click",b)
}function setSelectabledate(b){b=new Date(b);
tmp=new day(b);
var a=false;
while(!a){if(!tmp.isSelectable()){b.setDate(b.getDate()+1)
}a=true
}return b
}function formatDayofmonth(b){var a=b+"";
if(a.length==1){a="0"+a
}return a
}function formatMonthofyear(a){var b=a+"";
if(b.length==1){b="0"+b
}return b
}function day(c,d,b,a){this.cal=new Date(c);
this.today=new Date();
this.dayofweek=this.cal.getDay();
this.dayofmonth=this.cal.getDate();
this.calsmonth=this.cal.getMonth();
this.calsyear=this.cal.getFullYear();
this.milliseconds=this.cal.getTime();
this.lastAvailableDate=b;
if(!d.getTime){this.firstAvailableDate=new Date(d)
}else{this.firstAvailableDate=d
}this.bWeekendsSelectable=a;
this.isToday=isToday;
this.isTomorrow=isTomorrow;
this.isWeekend=isWeekend;
this.isPast=isPast;
this.isSelectable=isSelectable;
this.formatDay=formatDay;
this.nextMonthAvailable=nextMonthAvailable;
this.previousMonthAvailable=previousMonthAvailable;
this.nextYearAvailable=nextYearAvailable;
this.previousYearAvailable=previousYearAvailable
}function isToday(){var a=false;
if((this.dayofmonth==this.today.getDate())&&(this.calsmonth==this.today.getMonth())&&(this.calsyear==this.today.getFullYear())){a=true
}return a
}function isTomorrow(){var c=false;
var b=new Date();
var a=new Date();
a.setTime(b.getTime()+(1000*60*60*24));
if((this.dayofmonth==a.getDate())&&(this.calsmonth==a.getMonth())&&(this.calsyear==a.getFullYear())){c=true
}return c
}function isWeekend(){var a=false;
if(this.dayofweek==0||this.dayofweek==6){a=true
}return a
}function isPast(){var a=false;
if(this.isToday()){a=false
}else{if(parseInt(this.milliseconds)<parseInt(new Date().getTime())){a=true
}}return a
}function isSelectable(){var a=true;
if(parseInt(this.milliseconds)<parseInt(this.firstAvailableDate.getTime())){a=false
}if(parseInt(this.milliseconds)>parseInt(this.lastAvailableDate.getTime())){a=false
}if(this.isWeekend()){if(this.bWeekendsSelectable==false||"false"==this.bWeekendsSelectable){a=false
}}return a
}function formatDay(){var c=formatMonthofyear(this.calsmonth+1);
var b=this.calsyear;
var a=formatDayofmonth(this.dayofmonth);
return c+"/"+a+"/"+b
}function nextMonthAvailable(){var g=false;
var f=12;
var e=this.lastAvailableDate.getFullYear();
var a=this.lastAvailableDate.getMonth()+1;
var b=e*f+a;
var h=parseInt(this.cal.getFullYear());
var d=parseInt(this.cal.getMonth())+1;
var c=h*f+d;
g=c<=b;
return g
}function previousMonthAvailable(){var e=false;
var f=12;
var c=calendarFixedStartDate.getFullYear();
var g=calendarFixedStartDate.getMonth()+1;
var a=c*f+g;
var h=parseInt(this.cal.getFullYear());
var d=parseInt(this.cal.getMonth())+1;
var b=h*f+d;
e=a<=b;
return e
}function nextYearAvailable(){var g=false;
var f=12;
var e=this.lastAvailableDate.getFullYear();
var a=this.lastAvailableDate.getMonth()+1;
var b=e*f+a;
var h=parseInt(this.cal.getFullYear());
var d=parseInt(this.cal.getMonth())+1;
var c=h*f+d;
g=c<=b;
return g
}function previousYearAvailable(){var a=true;
a=this.cal.getFullYear()>this.today.getFullYear()||(this.cal.getFullYear()==this.today.getFullYear()&&this.cal.getMonth()>=this.today.getMonth());
return a
}var isCSS,isW3C,isIE4,isNN4,isIE6CSS;
function initDHTMLAPI(){if(document.images){isCSS=(document.body&&document.body.style)?true:false;
isW3C=(isCSS&&document.getElementById)?true:false;
isIE4=(isCSS&&document.all)?true:false;
isNN4=(document.layers)?true:false;
isIE6CSS=(document.compatMode&&document.compatMode.indexOf("CSS1")>=0)?true:false
}}window.onload=initDHTMLAPI;
function seekLayer(d,b){var a;
for(var c=0;
c<d.layers.length;
c++){if(d.layers[c].name==b){a=d.layers[c];
break
}if(d.layers[c].document.layers.length>0){a=seekLayer(document.layers[c].document,b)
}}return a
}function getRawObject(b){var a;
if(typeof b=="string"){if(isW3C){a=document.getElementById(b)
}else{if(isIE4){a=document.all(b)
}else{if(isNN4){a=seekLayer(document,b)
}}}}else{a=b
}return a
}function getObject(b){var a=getRawObject(b);
if(a&&isCSS){a=a.style
}return a
}function show(b){var a=getObject(b);
if(a){a.visibility="visible"
}}function hide(b){var a=getObject(b);
if(a){a.visibility="hidden"
}}var win=null;
function popup(c,f,d,k,e,h){var j=null;
var g="directories=no,location=no,menubar=yes,scrollbars=yes,status=no,titlebar=yes,toolbar=no,resizable=yes";
var b="directories=yes,location=yes,menubar=yes,scrollbars=yes,status=yes,titlebar=yes,toolbar=yes,resizable=yes";
var a=h!=null?h:"child";
switch(f){case 1:j="height=200,width=300,"+g;
break;
case 2:j="height=350,width=500,"+g;
break;
case 3:j="height=400,width=700,"+b;
break;
case 4:j="width="+arguments[2]+",height="+arguments[3]+",resizable="+arguments[4]+","+b;
break
}win=window.open(c,a,j);
return win
}function newWindow(a){if(a==null||win==null){alert("You may have pop up blocker software preventing this window from opening.")
}else{a.focus()
}}function addEvent(d,c,a){if(d.addEventListener){d.addEventListener(c,a,false);
return true
}else{if(d.attachEvent){var b=d.attachEvent("on"+c,a);
return b
}else{return false
}}};