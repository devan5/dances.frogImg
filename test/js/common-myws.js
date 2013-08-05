// for development
if((typeof console) === "undefined"){
	console = {};
	console.log = window.Boolean;
}

if(typeof(GLOBAL) === "undefined"){
	window.GLOBAL = {};
}
GLOBAL.namespace = function(z){
	var a = z.split('.'), o = GLOBAL;
	for(var i = (a[0] === "GLOBAL") ? 1 : 0; i < a.length; i++){
		o[a[i]] = o[a[i]] || {};
		o = o[a[i]];
	}
};

GLOBAL.namespace('GLOBAL.oB');
//cookie handle
GLOBAL.oB.cookie={ get:function(str){ var arr =  (new RegExp("\\b"+decodeURI(str)+"=([^;]*)\\b")).exec(document.cookie); return arr?arr[1]:false; }, set:function(name,value,expires,path,domain,secure){ var str = encodeURI(name)+"="+encodeURI(value); if (expires) {	str += "; expires="+expires.toGMTString();} if (path) {str += "; path="+path;} if (domain) {str += "; domain="+domain;} if (secure) {str += "; secure";} document.cookie = str; }, clear:function(str,path,domain,secure){ path=path?"; path="+path:''; domain=domain?"; domain="+domain:''; secure=secure?"; secure="+secure:''; if(str){ document.cookie = str+"=; expires="+(new Date).toGMTString()+path+domain+secure;return ; } var hub=document.cookie.split('; '); for(var i=0;i< hub.length;i++){document.cookie= hub[i].split('=')[0]+'=; expires='+(new Date).toGMTString()+path+domain+secure;} }, remove:function(str,path,domain,secure){ path=path?"; path="+path:''; domain=domain?"; domain="+domain:''; secure=secure?"; secure="+secure:''; if(str){ var f=(new RegExp("\\b"+decodeURI(str)+"=([^;]*)\\b")).test(document.cookie); document.cookie = str+"=; expires="+(new Date).toGMTString()+path+domain+secure; if(f){return 'Done';}else{return 'Nocookie';} } var hub=document.cookie.split('; '); for(var i=0;i< hub.length;i++){document.cookie= hub[i].split('=')[0]+'=; expires='+(new Date).toGMTString()+path+domain+secure;} return 'All may cookie cleared!'; } };


GLOBAL.oB.ie = (function(){
	var reg = /MSIE([\d\.\s]+);/gm;
	if(!document.all)return '0421' * 1;
	return (reg.exec(navigator.appVersion.toUpperCase()))[1] * 1;
}());
GLOBAL.namespace("timer");
GLOBAL.namespace("live");

// jQuery.extend
(function ($) {
    $.prototype.textHolder = function (options) {
        var settings = {
            holderName:"",
            keepName:""
        };
        $.extend(settings, options);

        this.blur(function () {
            var $this = $(this);
            if (0 == $this.val().length) {
                $this.val(settings.holderName || this.defaultValue);
            }
        });
        this.focus(function () {
            var $this = $(this), val = $this.val();
            if ((settings.holderName || this.defaultValue) === val && settings.keepName != val) {
                $this.val('');
            }
        });
    };
})(jQuery);
(function(a){a.prototype.obEventClass=function(j){var d={className:"current",timeHold:100,timeResume:100,clearIn:true,clearResume:true,eventStart:"",eventResume:"",only_ie6:false,keepOne:false},e=this;j=a.extend(d,j);if(j.only_ie6&&6!=GLOBAL.oB.ie){return}if(j.keepOne&&j.eventStart){e.bind(j.eventStart,function(){e.removeClass(j.className);a(this).addClass(j.className)})}else{if(j.eventResume!=j.eventStart&&j.eventStart&&j.eventResume){e.bind(j.eventStart,function(){b(this)}).bind(j.eventResume,function(){i(this)})}else{if(j.eventStart){e.bind(j.eventStart,function(){h(this)});function h(k){if(!!k.dualFag){i(k);k.dualFag=false}else{b(k);k.dualFag=true}}}else{e.hover(function(){b(this)},function(){i(this)})}}}function b(k){if(j.clearResume&&!!(k.aly_remove_action)){clearTimeout(k.aly_remove_action);k.aly_remove_action=""}if(1==k.aly_addClass){return}if(j.timeHold>0){k.aly_add_action=setTimeout(function(){f(k)},j.timeHold)}else{f(k)}}function i(k){if(j.timeResume>0){if(g(k)===false){return false}k.aly_remove_action=setTimeout(function(){c(k)},j.timeResume+k.timeResume_offset)}else{if(g(k)===false){return false}if(0==k.timeResume_offset){c(k)}else{setTimeout(function(){c(k)},k.timeResume_offset)}}}function g(k){k.timeResume_offset=0;if(j.clearIn){clearTimeout(k.aly_add_action);k.aly_add_action="";if(1!=k.aly_addClass){return false}}if(!!j.clearIn==false&&j.timeResume<=j.timeHold){k.timeResume_offset=j.timeHold}}function f(k){a(k).addClass(j.className);k.aly_addClass=1}function c(k){a(k).removeClass(j.className);k.aly_addClass=0}return this}})(jQuery);


// contentLoadInvoke js
// 2012.05.22:Main-page
$(document).ready(function(){

	// 收缩伸展 分类事件
	$('.s-classW').obEventClass({className:'show_Sclass'});

	GLOBAL.namespace('oB.timer');
	// 购物车 展开事件
	$('.s-spCar').obEventClass({
		className:'hover-spCar',
		timeHold:220,
		clearIn:true
	});

	// 关闭分类
	/*
	$('.sec-close').click(function(){
		$(this).parents('.s-class-tie').removeClass('current');
		return false;
	});
	*/

	// 展开联系我们
	$('.u-cox02-trigger').click(function(){
		var $this=$(this);
		if(!!this.obflag){
			//$this.find('a').html('联系我 <br /><s class=\"a\"></s>');
			this.obflag=false;
		}else{
			//$this.find('a').html('联系我 <br /><s class=\"m\"></s>');
			this.obflag=true;
		}
		$this.next().toggle();
	});

	// 搜索focus
	$(".s-search-uI").obEventClass({
		className:"s-search-input-focus",
		eventStart:"focusin",
		eventResume:"focusout",
		timeHold:0,
		timeResume:0
	});

	// nav-extra
	$(".nav-extra").obEventClass({
		className:"nav-extra-con-hover",
		timeResume:200
	});

	//
	$(".d-wrap02").obEventClass({
		className:"d-wrap02-hover",
		timeResume:200
	});

	// 点击登录
	$(".s-greet .s-c-grey4").click(function() {
        HUI.Ti.mask.show();
        showLogin();
		return false;
    });

    // 登陆工作台
    if(HUI.Ti.ltIE7){
            HUI.Ti.maxWidth(".s-greet .uName","10em");
    }

	// 文字公告
	$(".h-global-ntce").followSlide({
		nHoldTime    : 300500,
		nAnimateTime : 450,
		bVertical    : true,
		bNumericNavi : false,
		bNavi        : true,
		nViewWidth   : "none",
		nextHTML     : "下一条"
	});

	// 顶部公告
	$(".h-global-ntce").obEventClass({className:"h-global-ntce-hover",only_ie6:true});

    //screen.fontSmoothingEnabled;
    try{
//        if(true) $("html").addClass("fontSmoothingDisabled");
        if(false === screen.fontSmoothingEnabled) $("html").addClass("fontSmoothingDisabled");
    }catch(e){}
});

// evt delegate
$(document)
	// 联系我
	.delegate(".u-cox02-hold","click",(function(){
		var $tension;
		return function(){
			$tension = $tension || $(".u-cox02-tension");
			$tension.removeClass("none");
		}
	})())
	.delegate(".s-line01-hdr","click",function(){
		$(this).parents(".u-cox02-tension").addClass("none");
	})

	// 关闭共有分类
	.delegate(".sec-close","click",function(){
		$(this).parents('.s-class-tie').removeClass('current');
		return false;
	})
;


// back2top
/*
(function() {
	var options={
		className:"backToTop curp",
		txt:"",
		title:"返回顶部",
		speed:50,
		father:".s-top",
		height:1500
	};
	var $back = $("<a/>",{
		"class":options.className,
		text:options.txt,
		title:options.title,
		click:function(){
			($.browser.safari?($("body")):$("html")).animate({"scrollTop":0},options.speed);
			return false;
		}
	}).attr("href","#").addClass("vh");
	$(options.father).after($back);

	var bShow;
	var backHead = function() {
		if($(document).scrollTop() > options.height){
			if(!bShow){
				$back.removeClass("vh");
				bShow=true;
			}
		}else{
			if(bShow){
				$back.addClass("vh");
				bShow=false;
			}
		}
	};
	$(function() {backHead();});
	$(window).bind("scroll", backHead);
}());
*/

GLOBAL.namespace("GLOBAL.HG.Ti");

GLOBAL.HG.Ti.trueImg=function(/*string*/sSRCname,/*dom*/pos){
	if(!sSRCname)return;
	pos=pos?$(pos):$("body");
	pos=pos.find("img");
	for(var i=0,dom,sUrl;dom=pos[i++];){
		sUrl= dom.getAttribute(sSRCname);
		if(sUrl){
			dom.src=sUrl;
			dom.removeAttribute(sSRCname);
		}
	}
};
function showLogin() {
    var $miliW = $(".miliLogin"),
        miliIframe = $miliW.find("iframe")[0],
        src=miliIframe.getAttribute("hsrc");

    if (src) {
        miliIframe.setAttribute("src",src);
        miliIframe.removeAttribute("hsrc");
    }
    $miliW.show();
}

// namespace HUI
var HUI = ("object" == typeof HUI) ? HUI : ("function" == typeof HUI) ? HUI : function(){
};
HUI.nameSpace = function(s){
	var a = s.split("."), o = this;
	for(var i = (a[0] == "Ds") ? 1 : 0, u; u = a[i++];){
		o[u] = o[u] || {};
		o = o[u];
	}
};
HUI.nameSpace("Ti");

HUI.Ti.mask=function(options){
    var settings={
        className:"ti_mask",
        zIndex:1050,
        opacity:0.5
    };
    $.extend(settings,options);
    if(!HUI.Ti.mask.mask){
        HUI.Ti.mask.mask=$("<div/>",settings);
        HUI.Ti.mask.mask.hide().css("z-index",settings.zIndex).css("opacity",settings.opacity).appendTo("body");
    }
};
HUI.Ti.mask.show=function(){
    if(!HUI.Ti.mask.mask){ HUI.Ti.mask(); }
    HUI.Ti.mask.mask.show();

};
HUI.Ti.mask.hide=function(){
    if(!HUI.Ti.mask.mask)return ;
    HUI.Ti.mask.mask.hide();
};
HUI.Ti.mask.toggle=function(){
    if(!HUI.Ti.mask.mask){ HUI.Ti.mask(); }
    HUI.Ti.mask.mask.toggle();
};

HUI.Ti.ltIE7 = (function(num){
	num = num || 7;
	var result = false;
	if(document.all && /msie\s*([\d\.]*)/.test(navigator.userAgent.toLowerCase())){
		result = RegExp.$1<num;
	}
	return result;
})();

HUI.Ti.maxWidth = function (dom, size) {
    var $dom = $(dom),
        px_width = parseInt($dom.width()),
        px_size,
        fz
        ;

    // em
    if (size.indexOf("em") > 0) {
        fz = parseInt($dom.css("font-size"));
        px_size = parseInt(size) * fz;
    } else {
        px_size = parseInt(size)
    }

    if(px_width>px_size){
        $dom.css({
            width: px_size,
            overflow: "hidden"
        });
    }
};

// 2012.05.27-1120 modify by fiv
// 全部分类字数扩展
(function(){
	var fFixClass,fAddSpace,fFenceFix
		;

/* 废弃
	fFixClass = function(){
		$(".trd-class-list").each(function(){
			var $Els = $(this).children(),
				i = 0,
				firstEL,
				lastEl,

				fTextL,
				lTextL,

				_Text,
				pigeonText,

				nCha
				;
			do{
				firstEL = $Els.eq(i).find("a")[0];
				lastEl = $Els.eq(i + 3).find("a")[0];

				fTextL = firstEL ? firstEL.firstChild.length : 0;
				lTextL = lastEl ? lastEl.firstChild.length : 0;

				if(0 === fTextL){
					continue;
				}
				if(0 === lTextL && 2 === fTextL){
//					console.log("第san方案", firstEL);

					_Text = firstEL.firstChild.nodeValue;
					pigeonText = _Text.substring(1);
					_Text = _Text.substring(0,1);

					firstEL.innerHTML = _Text + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + pigeonText;
					continue;
				}

				if(2 === fTextL && 2 < lTextL){
					console.log("第一.1方案", firstEL);
					nCha = lTextL - fTextL;
					fAddSpace(firstEL,nCha);
				}else if(2 === lTextL && 2 < fTextL){

					console.log("第一.2方案", firstEL);
					nCha =fTextL - lTextL;
					fAddSpace(lastEl,nCha);

				}else if((fTextL === lTextL) && 2 === fTextL){
					fAddSpace(firstEL,2);
					fAddSpace(lastEl,2);
				}

			}while(++i < 3);

			firstEL = lastEl = null;
		})
	};
*/

	fFixClass = function(){
		$(".trd-class-list").each(function(){

			$(this).children().each(function(){
				var aEl = this.getElementsByTagName("a")[0];
				if(2 === aEl.firstChild.nodeValue.length){
					fAddSpace(aEl,1);
				}
			});
		});
	};

	fAddSpace = function(El, nCha){
		var i = 0,
			sSpace = ["&nbsp;&nbsp;"],
			pigeonText,
			_Text
			;

		while(nCha--){
			sSpace.push('&nbsp;&nbsp;')
		}
		sSpace = sSpace.join("");

		_Text = El.firstChild.nodeValue;
		pigeonText = _Text.substring(1);
		_Text = _Text.substring(0, 1);

		El.innerHTML = _Text + sSpace + pigeonText;

	};

	fFenceFix = function(){
		$(".trd-class-list").each(function(){
			var $Els = $(this).children();
			$Els.eq(2).addClass("fence");
			$Els.eq(5).addClass("fence");
		});
	};

	$(function(){
		var $box = $(".s-class");
//		fFenceFix();
		setTimeout(function(){
			$box.addClass("vh");
			fFixClass();
			$box.removeClass("vh");
			$box = null;
		},0)
	});

})();

// dances_mod_HUI_beta
// 2012.06.29-1126
/*
(function(){
	var copyCounts = 0,
		dances = function(){
			this.copyCount =  copyCounts++;
			dances.fn.copyCounts++;
		}
	;
	dances.fn = dances.prototype;

	dances.fn.copyCounts = copyCounts;

	dances.uAgent = dances.fn.uAgent = (function(){
		var Agent = navigator.userAgent.toLowerCase(),
			uAgent = {
				ua:Agent
			},
			numREG = /^\d*\.\d*//*
,
			vClient, vEngine,
			environment = false,
			engine = false
		;

		// 检测 Opera presto
		if(window.opera){
			engine = "presto";
			environment = "opera";
			uAgent.opera = window.opera.version();
			vClient = [uAgent.opera];

			// 检测 presto 版本
			if(/presto\/([\d\.]*)/.test(Agent)){
				vEngine = RegExp.$1.match(numREG);
				uAgent.presto = vEngine ? vEngine[0] : 0;
			}

		// 检测 webkit
		}else if(/applewebkit\/([\d\.]*)/.test(Agent)){
			engine = "webkit";
			vEngine = RegExp.$1.match(numREG);
			uAgent.webkit = vEngine ? vEngine[0] : 0;

			// 检测 chrome
			if(/chrome\/([\d\.]*)/.test(Agent)){
				environment = "chrome";
				vClient = RegExp.$1.match(numREG);
				uAgent.chrome = vClient ? vClient[0] : 0;

			// 检测 safari
			}else if(/safari\/([\d\.]*)/.test(Agent)){
				environment = "safari";
				if(/version\/([\d\.]*)/.test(Agent)){
					vClient = RegExp.$1.match(numREG);
					uAgent.safari = vClient ? vClient[0] : 0;
				}
			}

		// 检测 msie trident
		}else if(/msie\s*([\d\.]*)/.test(Agent)){
			engine = "trident";
			environment = "msie";
			vClient = RegExp.$1.match(numREG);
			uAgent.msie = vClient ? vClient[0] : 0;

			// 检测 trident 版本
			if(/^([\d\.]*)/.test(navigator.appVersion.toLowerCase())){
				vEngine = RegExp.$1.match(numREG);
				uAgent.trident = vEngine ? vEngine[0] : 0;
			}

		// 检测 Gecko
		}else if(/rv:([\d\.]*)[^\/]*gecko\/\d{8}/.test(Agent)){
			engine = "gecko";
			vEngine = RegExp.$1.match(numREG);
			uAgent.gecko = vEngine ? vEngine[0] : 0;

			// 检测 firefox
			if(/firefox\/([\d\.]*)/.test(Agent)){
				environment = "firefox";
				vClient = RegExp.$1.match(numREG);
				uAgent.firefox = vClient ? vClient[0] : 0;
			}
		}

		// gc
		numREG = null;

		uAgent.whois = environment;
		uAgent.ver = vClient ? vClient[0] : false;
		uAgent.engine = engine;
		uAgent.engineVer = vEngine;

		return uAgent;
	})();

	dances.fn.type = (function(){
		var Main,
			isNode,
			isElement,
			isElements,
			isText,
			isArr
		;

		isNode = function(dom, bStrict){
			var ownDOC,
				predict = false
			;
			if("object" !== typeof dom){
				return predict;
			}

			if(!bStrict){
				// It's enough for Loose.
				return "object" === typeof dom && "number" === typeof dom.nodeType && "string" === typeof dom.nodeName;
			}
			try{
				ownDOC = dom.ownerDocument || dom;
				predict = ownDOC.createElement("div").ownerDocument === ownDOC;

				// gc
				ownDOC = null;
			}catch(e){
				predict = false;
			}

			return predict;
		};

		isElement = function(dom,bStrict){
			return (isNode(dom, bStrict)) ? 1 === dom.nodeType : false;
		};

		isElements = function(Els,bStrict){
			var answer = false;
			if("object" !== typeof Els){
				return answer;
			}
			try{
				if("item" in Els && "length" in Els && isElement(Els[dances.random(0, Els.length - 1)], bStrict)){
					answer = true;
				}
			}catch(e){
				answer = false;
			}
			return answer;
		};

		isText = function(dom, bStrict){
			return ("object" === typeof dom && isNode(dom, bStrict))?3 === dom.nodeType:false;
		};

		isArr = function(data, bStrict, options){
			var i,
				num,
				max,
				randomFN
			;

			if(!data || "object" !== typeof data){
				return false;
			}

			options = dances.stab(options,{
				win : window,
				nStrict : 5
			});

			if(data instanceof options.win.Array){
				return true;
			}

			// 判断是否为真数组
			if(bStrict){
				return false;
			}

			if(!("length" in data)){
				return false;
			}

			num = data.length;
			if("number" !== typeof num || num < 0){
				return false;
			}

			i = 0;
			max = options.nStrict;
			if(num > 0){
				randomFN = dances.random;

				// 指定宽松模式
				if(!max){
					return true;
				}

				do{
					if(!(randomFN(0, num - 1) in data)){
						return false;
					}
				}while(++i < max);
			}

			// gc
			randomFN = null;
			return true;
		};

		Main = function(data, options){
			var type = typeof data,
				answer,
				nodeType
			;

			options = dances.stab(options,{
				win : window
			});

			switch(type){
				case "string":
					answer = data ? type : false;
					break;

				case "number":
					answer = type;
					break;

				case "boolean":
					answer = type;
					break;

				case "object":
					answer = data ? type : "null";
					if(!data){
						break;
					}

					// 可能的情况 数组 DOM集合
					if("length" in data){
						if(isElements(data,true)){
							answer = "elements";
							break;
						}
						// 检测 window
						if(data.top === top){
							answer = "window";
							break;
						}
						if(isArr(data,false,options)){
							answer = "array";
							break;
						}
					}

					// 可能的情况 元素节点 文本节点
					nodeType = data.nodeType;
					if("number" === typeof nodeType){
						switch(nodeType){
							case 1:
								if(isElement(data,1)){
									answer = "element";
								}
								break;
							case 2:
								if(isNode(data,1)){
									answer = "attribute";
								}
								break;
							case 3:
								if(isText(data,1)){
									answer = "text";
								}
								break;
							case 9:
								if(isNode(data,1)){
									answer = "document";
								}
								break;
							case 11:
								if(isNode(data,1)){
									answer = "fragment";
								}
								break;
						}
						if(type !== answer){
							break;
						}
					}

					if(data instanceof  options.win.RegExp){
						answer = "regexp";
						break;
					}

					if(data instanceof  options.win.Date){
						answer = "date";
						break;
					}

					break;
				case "function":
					answer = type;
					break;

				case "undefined":
					answer = "undefined";
					break;
			}
			return answer;
		};
		Main.isNode = isNode;
		Main.isElement = isElement;
		Main.isElements = isElements;
		Main.isText = isText;
		Main.isArr = isArr;
		return Main;
	})();

	dances.random = dances.fn.random = function (lt, gt) {
		if(!arguments){
			return Math.random();
		}

	    if ("number" !== typeof lt) {
			lt = parseInt(lt);
			if(isNaN(lt)){
				lt = Number.MIN_VALUE;
			}
	    }

	    if ("number" !== typeof gt) {
			gt = parseInt(gt);
			if(isNaN(gt)){
				gt = Number.MAX_VALUE;
			}
	    }

		if(lt > gt){
	        dances.random.tem = gt;
	        gt = lt;
	        lt = dances.random.tem;
	        dances.random.tem = null;
	    }
	    return Math.floor(Math.random() * (gt - lt + 1) + lt);
	};

	// dances.core
	dances.fn.extend = function(name,fn){
		// beta
		if(!dances.hasOwnProperty(name)){
			dances[name] = fn;
		}
	};

	dances.fn.implement = function(name,fn){
		// beta
		dances.fn[name] = fn;
	} ;

	dances.stab = dances.fn.stab = function(father,son,offspring*/
/**,[options]*//*
){
	*/
/*~~~~~~
		默认值
		var options = {
			bLost   : false,
			bStrong : false,
			bDeep   : false,
			win     : window
		};
	~~~~~~*//*

		var __typeof,
			i = 0,
			num = arguments.length,

			options,

			bLost, bStrong, bDeep,
			sup, nom, prop, supValue
		;

		// 检测 father
		// JavaScript一切皆对象,yc不用严格检测
		__typeof = typeof father;
		if(!father || ("object" !== __typeof ? "function" !== __typeof : false)){
			// 当'第一参数"不存在时, 尝试返回"第二参数"
			__typeof = typeof son;
			return (!son || ("object" !== __typeof ? "function" !== __typeof : false)) ? {} : son;
		}


		// 检测可选参数
		// 并定制可选参数 options
		// 接收的参数大于2,并且最后一参数有 bDeep | bStrong | bLost 其中任意属性,即可断言已有 options 传入.
		options = arguments[num - 1];
		if(num > 2 && "object" === typeof options && ("bDeep" in options || "bStrong" in options || "bLost" in options) && !("__stab" in options)){
			num -= 2;
		}else{
			options = {};
			num--;
		}

		// 扩展 window
		options.win = (options.win && options.win.top === top) ? options.win : window;

		// 检测 son , 若没有 son 参数,相等于 Ds.copy(father)
		// 此行可断言 已经存在有 father 参数
		__typeof = typeof son;
		if(!son || "object" !== __typeof ? "function" !== __typeof : false){
	//		$log("support: use .copy() better.");
			return dances.copy(father,options);
		}

		// bLost ,有值则迷失模式
		// bStrong ,有值强壮模式
		bLost = options.bLost || false;
		bStrong = options.bStrong || false;
		bDeep = options.bDeep || false;

		// 遍历群组
		do{
			sup = arguments[i++];
			nom = arguments[i];

			// 检测 sup(左一) 类型
			__typeof = typeof sup;
			if(!sup || ("object" !== __typeof ? "function" !== __typeof : false)){
				continue;
			}

			// 遍历属性
			for(prop in sup){

				// detect bLost && bStrong
				if(!(bStrong && prop in nom) && (bLost || (sup.hasOwnProperty && sup.hasOwnProperty(prop)))){

					// 深度作业
					if(bDeep){
						supValue = sup[prop];

						switch(typeof supValue){
							case "undefined":
								supValue = undefined;
								break;

							case "object":
								// 如果 supValue 的值,是javascript 扩展对象,如:Math Data RegExp
								// .stab 负责把它们实例附加的数据,拷贝至一个新的 object 对象里
	//							supValue = supValue ? supValue instanceof options.win.Array ? dances.copy(supValue, options) : dances.copy(supValue, options) : null;
								if(supValue){
									// bDeep 的 入口
									supValue = dances.stab(supValue,nom[prop]);
								}else{
									supValue = null;
								}
								break;

							case "function":
								supValue = dances.copy(supValue,options);
								break;

							case "number":
							case "boolean":
								break;

							default:
								supValue = supValue.toString();
						}
						nom[prop] = supValue;
					}else{
						nom[prop] = sup[prop];
					}
				}
			}
		}while(i < num);

		// gc
		sup = supValue = options = null;
		return nom;
	};

	dances.copy = dances.fn.copy = (function(){
		var Main,
			copyArray,
			copyFn,

			ltIE9 = dances.uAgent.msie && dances.uAgent.msie < 9
		;

		copyArray = function(data, options){

			// 初始化 options
			options = (options && "object" === typeof options) ? options : {};

			// 扩展 windows
			options.win = (options.win && options.win.top === top) ? options.win : window;

			if(!(data instanceof options.win.Array)){
				throw("copyArray() require pureArray");
			}

			var copy2 = [],

				i = 0,
				num = data.length,

				prop ,
				value,

				bLost = options.bLost,
				bDeep = options.bDeep

			;

			// 拷贝数组 索引值 数据
			for(; i < num; i++){
				copy2.push(data[i]);
			}


			// 拷贝数组 额外 数据
			for(prop in data){
				if((isNaN(prop) || prop > num) && (bLost || data.hasOwnProperty(prop))){

					value = data[prop];
					// deep way
					if(bDeep){
						switch(typeof value){
							case "undefined":
								value = undefined;
								break;

							case "object":
								value = value ? value instanceof options.win.Array ? copyArray(value, options) : dances.copy(value, options) : null;
								break;

							case "function":
								value = copyFn(value, options);
								break;

							case "number":
							case "boolean":
							case "string":
								break;

							default:
								value = value.toString();
						}
					}
					copy2[prop] = value;
				}
			}

			// gc
			value = null;
			return copy2;
		};

		copyFn = function(data, options){
			var copy2 = data.toString().replace("function", "function " + "dances_copyFN" + fnCounts++);
			if(ltIE9){
				copy2 = eval('(function (){return '+copy2+'})()');
			}else{

				copy2 = eval("(" + copy2 + ")");
			}

			// 初始化 options
			options = (options && "object" === typeof options) ? options : {};

			// 扩展 windows
			options.win = (options.win && options.win.top === top) ? options.win : window;

			options.pos = copy2;

			copy2 = dances.copy(data, options);

			return copy2;
		};

		fnCounts = 0;

		Main =  function(data, options){
			var prop,
				value,
				type = dances.type(data),
				posType,
				copy2,

				bLost, bDeep
			;

			// 不是用严格检测
			switch(type){
				case "string":
					return new String(data);
				case "number":
					return new Number(data);
				case "boolean":
					return new Boolean(data);
				case "regexp":
					return new RegExp(data.toSource());
				case "date":
					return new Date(data.getTime());

				case "element":
				case "elements":
				case "fragment":
				case "text":
				case "attribute":
					console.log("use dances.clone()");
					return false;
				case "document":
					console.log("yes!u can't");
					return false;
			}

			// 初始化 options
			options = (options && "object" === typeof options) ? options : {};

			// 扩展 windows
			options.win = (options.win && options.win.top === top) ? options.win : window;

			bLost = options.bLost;
			bDeep = options.bDeep;
			posType = typeof options.pos;

			// options.pos 是 data 的克隆副本存入的对象,一般情况下为空
			if(!options.pos || ("object" !== posType && "function" !== posType)){
				switch(type){
					case "array":
						copy2 = [];
						break;
					case "function":
						return copyFn(data, options);
					default:
						copy2 = {};
				}
			}else{
				copy2 = options.pos;
			}

			for(prop in data){
				if(bLost || (data.hasOwnProperty && data.hasOwnProperty(prop))){
					value = data[prop];

					if(bDeep){
						switch(typeof value){
							case "undefined":
								value = undefined;
								break;

							case "object":
								value = value ? value instanceof options.win.Array ? copyArray(value, options) : dances.copy(value, options) : null;
								break;

							case "function":
								value = copyFn(value, options);
								break;

							case "number":
							case "boolean":
							case "string":
								break;

							default:
								value = value.toString();
						}
					}

					copy2[prop] = value;
				}
			}
			return copy2;
		};

		return Main;
	})();

	dances.trim = dances.fn.trim = (function(){
		var regTrimL = /^\s*//*
,
			regTrimR = /\s*$/,
			regClean = /\s*//*
g
			;
		return function(str, bClean){
			if(!str || "string" !== typeof str){
				return false;
			}
			if(bClean){
				str = str.replace(regClean,RegExp.$1);
			}else{
				str = str.replace(regTrimL,"").replace(regTrimR,"");
			}
			return str;
		};
	})();

	dances.addCss = dances.fn.addCss = (function(){
		var headEl;
		return function(ss){
			if(!ss || "string" !== typeof ss){
				return false;
			}
			var styleEl = document.createElement("style");
			styleEl.type = "text/css";
			try{
				styleEl.appendChild(document.createTextNode(ss));
			}catch(e){
				styleEl.styleSheet.cssText = ss;
			}
			headEl = headEl || document.getElementsByTagName("head")[0];
			headEl.appendChild(styleEl);
			return styleEl;
		};
	})();

	dances.El = dances.fn.El = (function(){
		var regHTML = /^<\w+\/>$/,
			regFullHTML = /^<([^\s]+)[\s\S]*\1>$/
			;
		return function(sHTML){
			if(!sHTML){
				return false;
			}

			sHTML = dances.trim(sHTML);

			if(!regFullHTML.test(sHTML) && !regHTML.test(sHTML)){
				throw("inValid HTML construct");
			}

			var El,
				pigeon
				;
			El = document.createElement("div");
			El.innerHTML = sHTML;
			pigeon = El.firstChild.cloneNode(true);

			// gc
			El.removeChild(El.firstChild);
			El = null;
			return pigeon;
		};
	})();

	dances.getViewportSize = dances.fn.getViewportSize = function(win){
		var oView = {},
			_doc
		;

		try{
			_doc = (win && top === win.top) ? win.document : top.document;
		}catch(e){
			_doc = document;
		}

		if("CSS1Compat" === _doc.compatMode){
			oView.width = _doc.documentElement.clientWidth;
			oView.height = _doc.documentElement.clientHeight;
		}else{
			oView.width = _doc.body.clientWidth;
			oView.height = _doc.body.clientHeight;
		}

		// gc
		_doc = null;
		return oView;
	};

	dances.fn.back2top = (function(){
		var sHtml = '<span id="dances-back2top" class="dances-back2top dances-back2top-ui none" title="返回顶部">' +
						'返回顶部⇡' +
					'</span>',
			scrollEl,

			viewH = dances.getViewportSize().height,

			ss

		;

		ss = '.dances-back2top{'+
					'right: 5px; bottom: 5px; '
		;
		if(dances.uAgent.msie && dances.uAgent.msie < 7){
			ss +=	' position:absolute; ' +
					'top: expression(eval(( document.documentElement && document.documentElement.scrollTop || document.body.scrollTop)+(document.documentElement && document.documentElement.clientHeight || document.body.clientHeight)-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0))); '
			;
		}else{
			ss += 'position: fixed;'
			;
		}
		ss += '}';

		return function(options){

			if(document.getElementById("dances-back2top")){
				return "hasBack2Top";
			}

			// 第一次调用 .back2top 去获取滚动条元素
			scrollEl = scrollEl || dances.uAgent.webkit ? document.body : document.documentElement;

			// 扩展参数
			options = dances.stab(options,{
				text      : "返回顶部⇡",
				speed     : 0,
				height    : 0,
				effect    : false,
				disableUI : false
			});

			var back2top,
				$html,
				backEL = dances.El(sHtml)
			;

			if(!options.disableUI){
				ss += '.dances-back2top-ui{ ' +
						'width: 1em; ' +
						'padding: 3px; ' +
						'word-wrap: break-word; ' +
						'font-size: 12px; ' +
						'text-align: center; ' +
						'white-space: normal; ' +
						'color: #fff; ' +
						'background-color: #DBCC9F; ' +
						'border-radius: 2px; ' +
						'cursor: pointer; ' +
						'line-height:14px; ' +
					'}';
			}
			dances.addCss(ss);

			// 未设置 高度
			if(!options.height){
				options.height = scrollEl.scrollHeight;

			}else{
				// 检测高度
				options.height = parseInt(options.height);
				if(isNaN(options.height)){
					options.height = scrollEl.scrollHeight;
				}else if(options.height < 0){
					if(scrollEl.scrollHeight + options.height > 0){
						options.height = scrollEl.scrollHeight + options.height;
					}else{
						options.height = scrollEl.scrollHeight / 2;
					}
				}
			}

			// 新建 元素
			$html = $(backEL)
				.bind("click.dances_back2top",function(){
					$(scrollEl).animate({scrollTop : 0},options.speed);
				});

			backEL.firstChild.nodeValue = options.text;
			backEL.setAttribute("title",options.text || options.title);

			// 核心函数
			back2top = (function($html,settings){
				var scrollH ,
					bShow
					;
				if(settings.effect){
					scrollH = settings.height ? settings.height : scrollEl.offsetHeight;
					return function(){
						var degree;
						if(settings.effect){
							$html.css("opacity",0).removeClass("none");
							degree = scrollEl.scrollTop / (scrollH - viewH);
							if(degree < 1){
								$html.css("opacity",degree);
							}else{
								$html.css("opacity",1);
							}
						}
					};
				}else{
					return function(){
						if(scrollEl.scrollTop > settings.height){
							if(!bShow){
								$html.removeClass("none");
								bShow = true;
							}
						}else{
							if(bShow){
								$html.addClass("none");
								bShow = false;
							}
						}
					};
				}
			})($html,options);

			// 页面加载后迅速执行一次
			$(function(){
				$html.appendTo("body");
				back2top();
			});

			// 绑定 滚动事件
			$(window)
				.bind("scroll.dances_back2top",back2top)
				.bind(" resize.dances_back2top",function(){
					viewH = dances.getViewportSize().height;
					back2top();
				});
		};

	})();

	window.dances = new dances();

})();*/
