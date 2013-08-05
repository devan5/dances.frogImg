$(document).ready(function(){
	var $ = jQuery;

	//h-channel-tabs 算法
	$('.t-canl-hdr').each(function(){
		$('span',this).css("left",function(i){
			return -((i*1)+1);
		});
	});

	// 热销排行榜 排行文字
	(function(){
		var sHTML = '<i class="d-item03-tips">';
		$(".t-canlGoods").each(function(){
			$(".d-item03 .img2a",this).each(function(i){
				var itemHTML = sHTML + (i + 1) + '</i>';
				$(this).append(itemHTML);
			});
		});
	})();

	// 热销排行榜Tab
	$('.tab-canl-item').mouseover(function(){
		obTab_v2(this,'.tab-canl-item','current-tab-tie','.t-canl-list','.t-canl');
	});

	// 今日关注Tab
	$('.t-2day-tie').mouseover(function(){
		obTab_v2(this,'.t-2day-tie','t-2day-current','.t-2day-list','.t-2day-con');
	});

	// 店主推荐Tab
	$('.h-notice-tie').click(function(){
		obTab_v2(this,'.h-notice-tie','current-notice-tie','.h-notice-con ul');
	});

	// 店主推荐Hover
	$('.h-notice-con ul').obEventClass({
		className:'notice-yl-hover'
	});

	// 热销排行版 成员事件
	/*$('.t-canlGoods .t-canl-item').mouseover(function(){
		$(this).addClass('hover-t-canl').siblings().removeClass('hover-t-canl');
	});*/

	// one lazzLoding
	$(".h-canl:gt(0)").find(".tab-canl-item:eq(1)").one("mouseover",function(){
		try{
			GLOBAL.HG.Ti.trueImg("hsrc",$(this).parent().next().children(".t-canlBrand"))
		}catch(e){ }
	});
	$(".t-2day-tie:gt(0)").one("mouseover",function(){
		try{
			GLOBAL.HG.Ti.trueImg("hsrc",$(this).next())
		}catch(e){ }
	});

	// 幻灯片A B
	$(".h-sliderA").followSlide({
		nHoldTime       : 650000,
		nAnimateTime    : 700,
		nAnimateSpeed   : 8,
		bVertical       : true,
		bReverseAnimate : true,
		bLazy           : true,
		sLazySrc        : "hsrc"
	});

	$(".h-sliderB-con").followSlide({
		nHoldTime     : 250000,
		nAnimateTime  : 700,
		nAnimateSpeed : 15,
		bVertical     : false,
		bNumericNavi  : false,
		bNavi         : true,
		bLazy         : true,
		sLazySrc      : "hsrc",
		prevHTML      : "<a class=\"b-buttons buttons prev b-prev\"></a>",
		nextHTML      : "<a class=\"b-buttons buttons next b-next\"></a>"

	});

	// tinycarousel 文字滚动
	$(".h-s1-mText").followSlide({
		nHoldTime     : 250000,
		nAnimateTime  : 450,
		bVertical  : true,
		bNavi         : true,
		bNumericNavi  : false,
		prevHTML : "‹",
		nextHTML:"›"
	});

	// ie6 商品hover事件
	$(".d-item01").obEventClass({
		className:"d-item01-hover",
		timeHold:5,
		timeResume:0,
		clearIn:true,
		only_ie6:true
	});

	// 端午主题人物
	$(".s-navW").append('<a href="ext_zhongzi0613.cpp" class="d-topic-dbf"> </a>');

	// back2Top

/*
	dances.back2top(
		(dances.uAgent.msie && dances.uAgent.msie < 9) ?
		{
			speed : 85,
			effect:0,
			title : "返回顶部x",
			height : 700,
			disableUI : 1,
			text : ""
		}
			:
		{
			speed : 85,
			effect : 1,
			title : "返回顶部",
			height : -700,
			disableUI : 1,
			text : ""
		}
	)
*/
});
// documentContent load end---


function obTab_v2(_this,s_triiger,c_light_trigger,s_content,s_position){
	//需要的参数:
	//1.this of trigger ; 2.selector of trigger ; 3.highLightClassName of trigger ; 4.selector of Contents ; 5.selector of position
	if(typeof s_position==='undefined'){
		$(_this).addClass(c_light_trigger).siblings().removeClass(c_light_trigger);
		$(s_content).hide().eq($(_this).index(s_triiger)).show();
		return;
	}
	var tPos=$(_this).parents(s_position);
	$(_this).addClass(c_light_trigger).siblings().removeClass(c_light_trigger);
	var num=tPos.find(s_triiger).index(_this);
	tPos.find(s_content).hide().eq(num).show();
}
