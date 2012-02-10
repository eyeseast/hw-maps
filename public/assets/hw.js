/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+" does not occur "+ntemp+" times in the month of "+$D.getMonthName(temp.getMonth())+" "+temp.getFullYear()+".");}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());

//     Underscore.js 1.3.1
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var result = [];
    _.reduce(initial, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
        memo[memo.length] = el;
        result[result.length] = array[i];
      }
      return memo;
    }, []);
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        func.apply(context, args);
      }
      whenDone();
      throttling = true;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(/\\\\/g, '\\').replace(/\\'/g, "'");
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape || noMatch, function(match, code) {
           return "',_.escape(" + unescape(code) + "),'";
         })
         .replace(c.interpolate || noMatch, function(match, code) {
           return "'," + unescape(code) + ",'";
         })
         .replace(c.evaluate || noMatch, function(match, code) {
           return "');" + unescape(code).replace(/[\r\n\t]/g, ' ') + ";__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', '_', tmpl);
    if (data) return func(data, _);
    return function(data) {
      return func.call(this, data, _);
    };
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);

//     Backbone.js 0.9.0
//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `global`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to slice/splice.
  var slice = Array.prototype.slice;
  var splice = Array.prototype.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.0';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  var $ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback functions
  // to an event; trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback`
    // function. Passing `"all"` will bind the callback to all events fired.
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while (ev = events.shift()) {
        // Create an immutable callback list, allowing traversal during
        // modification.  The tail is an empty object that will always be used
        // as the next node.
        var list  = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all callbacks
    // with that function. If `callback` is null, removes all callbacks for the
    // event. If `ev` is null, removes all bound callbacks for all events.
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if (calls = this._callbacks) {
        events = events.split(/\s+/);
        while (ev = events.shift()) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          // Create a new list, omitting the indicated event/context pairs.
          while ((node = node.next) && node.next) {
            if (node.callback === callback &&
              (!context || node.context === context)) continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      // Save references to the current heads & tails.
      while (event = events.shift()) {
        if (all) events.push({next: all.next, tail: all.tail, event: event});
        if (!(node = calls[event])) continue;
        events.push({next: node.next, tail: node.tail});
      }
      // Traverse each list, stopping when the saved tail is reached.
      rest = slice.call(arguments, 1);
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }

  };

  // Aliases for backwards compatibility.
  Backbone.Events.bind   = Backbone.Events.on;
  Backbone.Events.unbind = Backbone.Events.off;

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    this._changed = {};
    if (!this.set(attributes, {silent: true})) {
      throw new Error("Can't create an invalid model");
    }
    this._changed = {};
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.attributes[attr];
      return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.attributes[attr] != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, value, options) {
      var attrs, attr, val;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs instanceof Backbone.Model) attrs = attrs.attributes;
      if (options.unset) for (var attr in attrs) attrs[attr] = void 0;

      // Run validation.
      if (this.validate && !this._performValidation(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;
      var escaped = this._escapedAttributes;
      var prev = this._previousAttributes || {};
      var alreadyChanging = this._changing;
      this._changing = true;

      // Update attributes.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(now[attr], val)) delete escaped[attr];
        options.unset ? delete now[attr] : now[attr] = val;
        delete this._changed[attr];
        if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
          this._changed[attr] = val;
        }
      }

      // Fire the `"change"` events, if the model has been changed.
      if (!alreadyChanging) {
        if (!options.silent && this.hasChanged()) this.change(options);
        this._changing = false;
      }
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      (options || (options = {})).unset = true;
      return this.set(attr, null, options);
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = Backbone.wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, value, options) {
      var attrs;
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      options = options ? _.clone(options) : {};
      if (attrs && !this[options.wait ? '_performValidation' : 'set'](attrs, options)) return false;
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var serverAttrs = model.parse(resp, xhr);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      return (this.sync || Backbone.sync).call(this, method, this, options);
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var triggerDestroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      if (this.isNew()) return triggerDestroy();
      options.success = function(resp) {
        if (options.wait) triggerDestroy();
        if (success) {
          success(model, resp);
        } else {
          model.trigger('sync', model, resp, options);
        }
      };
      options.error = Backbone.wrapError(options.error, model, options);
      var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
      if (!options.wait) triggerDestroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = getValue(this.collection, 'url') || getValue(this, 'urlRoot') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      for (var attr in this._changed) {
        this.trigger('change:' + attr, this, this._changed[attr], options);
      }
      this.trigger('change', this, options);
      this._previousAttributes = _.clone(this.attributes);
      this._changed = {};
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr) return _.has(this._changed, attr);
      return !_.isEmpty(this._changed);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (!attr || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Run validation against a set of incoming attributes, returning `true`
    // if all is well. If a specific `error` callback has been passed,
    // call that instead of firing the general `"error"` event.
    _performValidation: function(attrs, options) {
      var newAttrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(newAttrs, options);
      if (error) {
        if (options.error) {
          options.error(this, error, options);
        } else {
          this.trigger('error', this, error, options);
        }
        return false;
      }
      return true;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Backbone.Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function() {
      return this.map(function(model){ return model.toJSON(); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, index, length, model, cid, id, cids = {}, ids = {};
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];

      // Begin by turning bare objects into model references, and preventing
      // invalid models or duplicate models from being added.
      for (i = 0, length = models.length; i < length; i++) {
        if (!(model = models[i] = this._prepareModel(models[i], options))) {
          throw new Error("Can't add an invalid model to a collection");
        }
        if (cids[cid = model.cid] || this._byCid[cid] ||
          (((id = model.id) != null) && (ids[id] || this._byId[id]))) {
          throw new Error("Can't add the same model to a collection twice");
        }
        cids[cid] = ids[id] = model;
      }

      // Listen to added models' events, and index models for lookup by
      // `id` and by `cid`.
      for (i = 0; i < length; i++) {
        (model = models[i]).on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // Insert models into the collection, re-sorting if needed, and triggering
      // `add` events unless silenced.
      this.length += length;
      index = options.at != null ? options.at : this.models.length;
      splice.apply(this.models, [index, 0].concat(models));
      if (this.comparator) this.sort({silent: true});
      if (options.silent) return this;
      for (i = 0, length = this.models.length; i < length; i++) {
        if (!cids[(model = this.models[i]).cid]) continue;
        options.index = i;
        model.trigger('add', model, this, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.getByCid(models[i]) || this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Get a model from the set by id.
    get: function(id) {
      if (id == null) return null;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid: function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      var boundComparator = _.bind(this.comparator, this);
      if (this.comparator.length == 1) {
        this.models = this.sortBy(boundComparator);
      } else {
        this.models.sort(boundComparator);
      }
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      models  || (models = []);
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      this._reset();
      this.add(models, {silent: true, parse: options.parse});
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === undefined) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = Backbone.wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var coll = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) coll.add(model, options);
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        if (options.wait) coll.add(nextModel, options);
        if (success) {
          success(nextModel, resp);
        } else {
          nextModel.trigger('sync', model, resp, options);
        }
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(model, options) {
      if (!(model instanceof Backbone.Model)) {
        var attrs = model;
        options.collection = this;
        model = new this.model(attrs, options);
        if (model.validate && !model._performValidation(model.attributes, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(ev, model, collection, options) {
      if ((ev == 'add' || ev == 'remove') && collection != this) return;
      if (ev == 'destroy') {
        this.remove(model, options);
      }
      if (model && ev === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
    'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
    'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
    'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
    'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Backbone.Router.prototype, Backbone.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning leading hashes and slashes .
  var routeStripper = /^[#\/]/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  var historyStarted = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(Backbone.History.prototype, Backbone.Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
        } else {
          fragment = window.location.hash;
        }
      }
      fragment = decodeURIComponent(fragment.replace(routeStripper, ''));
      if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
      return fragment;
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      if (historyStarted) throw new Error("Backbone.history has already been started");
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      historyStarted = true;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(routeStripper, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      historyStarted = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
      if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(window.location.hash);
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you which to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!historyStarted) return false;
      if (!options || options === true) options = {trigger: options};
      var frag = (fragment || '').replace(routeStripper, '');
      if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this.fragment = frag;
        this._updateHash(window.location, frag, options.replace);
        if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
          // When replace is true, we don't want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, frag, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        window.location.assign(this.options.root + fragment);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
      } else {
        location.hash = fragment;
      }
    }
  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var eventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, Backbone.Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove: function() {
      this.$el.remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      this.$el = $(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = getValue(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Event "' + events[key] + '" does not exist');
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = getValue(this, 'attributes') || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.setElement(this.make(this.tagName, attrs), false);
      } else {
        this.setElement(this.el, false);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Backbone.Model.extend = Backbone.Collection.extend =
    Backbone.Router.extend = Backbone.View.extend = extend;

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = getValue(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!options.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request, allowing the user to override any Ajax options.
    return $.ajax(_.extend(params, options));
  };

  // Wrap an optional error callback with a fallback error event.
  Backbone.wrapError = function(onError, originalModel, options) {
    return function(model, resp) {
      var resp = model === originalModel ? resp : model;
      if (onError) {
        onError(model, resp, options);
      } else {
        originalModel.trigger('error', model, resp, options);
      }
    };
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);

(function() {

  this.Homicide = Backbone.Model.extend({
    initialize: function(attrs) {
      this.victims = new VictimList(this.get('victims'));
      this.setTimes();
      this.bind('change', this.setTimes);
      this.bind('change:victims', function() {
        return this.victims = new VictimList(this.get('victims'));
      });
      return this;
    },
    setTimes: function() {
      var attr, _i, _len, _ref, _results;
      _ref = ['datetime', 'created', 'modified'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        if (this.get(attr)) {
          _results.push(this.attributes[attr] = Date.parse(this.get(attr)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    toString: function() {
      var names;
      if (this.victims) {
        names = this.victims.map(function(v) {
          return v.get('full_name');
        });
        return _.compact(names).join(', ');
      } else {
        return "Homicide " + this.id;
      }
    },
    url: function() {
      return this.get('resource_uri') || ("/api/v1/homicides/" + this.id + "/");
    }
  });

}).call(this);
