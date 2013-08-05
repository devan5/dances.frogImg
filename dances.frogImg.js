/**
 * @author devan5 <devan5.pan#gmail.com>
 * @overview dances 插件, 支持惰性加载图片
 *
 * @require jquery-1.10.2.min.js
 *
 * @firstDate 2013.08.
 * @lastDate 2013.08.06
 *
 */

(function(exports){
    var
        Model,

        /**
         * @exports
         */
        frog,
        Frog,

        throttle,

        uc = function(fn){
            return function(){
                return Function.prototype.call.apply(fn, arguments);
            }
        },

        slice = uc(Array.prototype.slice),
        toString = uc(Object.prototype.toString),

        create = Object.create || (function(){

            var Foo = function(){ };

            return function(){

                if(arguments.length > 1){
                    throw new Error('Object.create implementation only accepts the first parameter.');
                }

                var proto = arguments[0],
                    type = typeof proto
                    ;

                if(!proto || ("object" !== type && "function" !== type)){
                    throw new TypeError('TypeError: ' + proto + ' is not an object or null');
                }

                Foo.prototype = proto;

                return new Foo();
            }
        })(),

	    forEach = "function" === typeof Array.forEach ?
		    Array.forEach :
		    function(arr, fn){
			    var len,
				    i,
				    fHas
				    ;

			    fHas = Object.prototype.hasOwnProperty;

			    for(i = 0, len = arr.length; i < len; i++){
				    fHas.call(arr, i) && fn(arr[i], i, arr);
			    }

		    },

	    $ = window.jQuery
    ;

	// ensure jQuery
	if(!$ || "string" !== typeof $().jquery){
		throw "jquery.dances.pin expect jQuery Library";
	}

	exports || (exports = (function(){
		function Foo(){ }
		Foo.prototype.root = "dances.frogImg";
		window.dances = new Foo();
		return window.dances;
	})());

	// 实验室 Model 模式
    Model = (function(){
        var fMixin;

        fMixin = function(oFrom, oTarget){
            for(var prop in oFrom){
                if(oFrom.hasOwnProperty(prop)){
                    oTarget[prop] = oFrom[prop];
                }
            }
        };

        return {

            // 创建一个新模型
            create: function(opts){

                var
                    model = create(this)
                    ;

                opts = opts || {};

                model.create = function(){ return this; };

                model.prototype = create(this.prototype);

                "function" === typeof opts._construct && (this._construct = opts._construct);

                return model;
            },

            init: function(){
                if(this === Model){
                    throw "Model logical error";
                }
                var inst;

                inst = create(this.prototype);
                "function" === typeof this._construct && this._construct.apply(inst, arguments);
                return inst;
            },

            /**
             * 扩展模型的实例
             * @param {Object | String} oos
             * @param {Function | *} [fn]
             */
            extend: function(oos, fn){
                if(this === Model){
                    return this;
                }

                "[object Object]" === toString(oos) ?
                    fMixin(oos, this) :
                    (this[oos] = fn)
                ;

                return this;
            },

            /**
             * 扩展模型的实例 prototype
             * @param {Object | String} oos
             * @param {Function | *} [fn]
             */
            implement: function(oos, fn){
                if(this === Model){
                    return this;
                }

                "[object Object]" === toString(oos) ?
                    fMixin(oos, this.prototype) :
                    (this.prototype[oos] = fn)
                ;

                return this
            },

            prototype: { }

        }
    })();

	// throttle
    throttle = function(fn, nDelay){
        var
            promise,
            time
        ;

        nDelay = "number" === typeof nDelay && nDelay === nDelay ? nDelay : 25;

        return function(){
            clearTimeout(promise);

            if(new Date - time > nDelay){
                fn();
                time = new Date;
            }else{
                promise = setTimeout(function(){
                    fn();
                    time = new Date;
                }, nDelay);
            }

        }
    };

	Frog = Model
        .create({
            _construct: function(){
                var
                    args = slice(arguments),
                    opts = args.pop()
                ;

                this._uid = Frog.uid();

                if("[object Object]" !== toString(opts)){
	                // in case that, only one argument as element's selector
                    args.push(opts);
                    opts = null;
                }

                this.opts = opts = $.extend({
	                // 灵敏度 指定间隔时间去响应 scroll resize 事件
	                // 值越大 性能越好
	                // 值越小 效果越好
	                sensitive: 25,

	                // 预加载 距离
	                px       : 55,
	                footerPX : 150,
	                attrUrl  : "_src",
	                include  : ["img"],
	                exclude  : [""],
	                win      : window

                }, opts);

	            // ensure window reality
	            if(!opts.win || opts.win.top !== top){
		           opts.win = window;
	            }

                // ensure [options.px] [options.sensitive] 数值准确性
                opts.px = ("number" === typeof opts.px && opts.px === opts.px) ? opts.px : 0;
	            opts.footerPX = ("number" === typeof opts.footerPX && opts.footerPX === opts.footerPX) ? opts.footerPX : 0;
                opts.sensitive = ("number" === typeof opts.sensitive && opts.sensitive > 0) ? opts.sensitive : 0;

	            // expect scopeElement or not
	            this.rootElem = "string" === typeof args[0] ?
		            $(args[0])[0]:
		            ""
	            ;

	            // size images & cal them
	            if(false === this.refresh()){
		            // 图片数量为0, 提前结束
		            return "end's";
	            }

                this.bind();

                // 初始化迅速, 执行一次
                this.response();

            }
        })
        .implement({

		    // 抓取 image 并获取子元素们高度
		    refresh: function(){
			    var
				    opts = this.opts,
				    rootElem = this.rootElem,
				    $imgs = $()
			    ;

			    $.each(opts.include, function(){
				    $imgs = $imgs.add(this + "", rootElem || opts.win.document);
			    });

			    if(opts.exclude && opts.exclude.length > 0){
				    $.each(opts.exclude, function(){
					    var $this = $(this);
					    if($this.length > 0){
						    $imgs = $imgs.not($(this + ""));
					    }
				    });
			    }

			    if($imgs.length < 1){
				    return  false;
			    }

			    this.$imgs = $imgs;

			    return this.cal();
		    },

		    // 获取子元素们高度
			cal: function(){
			    var
				    arrImgAio = [],
				    base = this.$imgs,
				    len = base.length,
				    scopeEl
			    ;

			    scopeEl = this.rootElem ?
				    this.rootElem :
				    this.opts.win.document.documentElement
			    ;

			    while(len--){
                    arrImgAio.push([base[len], Frog.offset(base[len], scopeEl).top]);
			    }

			    this.arrImgAio && (this.arrImgAio.length = 0);
			    this.arrImgAio = arrImgAio;

			    return this;
		    },

            bind: function(){
	            // 绑定对象:
	            // 1. window, current window(window === top)
	            // 2. window, frame window(window !== top)
	            // 3. element

	            // 绑定事件
	            // 1. scroll, resize
	            // 2. scroll
	            // 3. scroll

                var
                    _this = this,

	                rootElem = _this.rootElem,

	                opts = _this.opts

                ;

	            if(!_this.__binded){
		            if(rootElem){
			            $(rootElem).bind("scroll.frogImg" + _this._uid, throttle(function(){
				            console.log(5);
				            _this.response();
			            }, opts.sensitive));

			            // TODO bind click for resize element

		            }else{
			            Frog.bindWin(_this);
		            }

		            _this.__binded = true;
	            }

            },

            unbind: function(){
	            var
		            _this = this,

		            rootElem = _this.rootElem
	            ;

	            if(_this.__binded){

		            if(rootElem){
			            $(rootElem).unbind("scroll.frogImg" + _this._uid);
		            }else{
			            Frog.unbindWin(_this);
		            }
		            _this.__binded = false;
	            }

            },

		    // scroll/resize 监听之后, 执行的方法
		    // 也可手动调用, 为了更高阶的逻辑
            response: function(){
                var
                    arrImgAio = this.arrImgAio,
                    len = arrImgAio.length,

	                nCurrentScrollTop ,

	                item,
                    elemItem,
                    itemSrc,

	                opts,

				    sAttrUrl,
				    nOffsetY,

	                viewHeight,
	                pageHeight,

	                bFoot

                ;

                if(len < 1){
                    this.unbind();
                    return ;
                }


	            opts = this.opts;

	            sAttrUrl = opts.src;
	            nOffsetY = opts.px;

	            if(this.rootElem){
		            viewHeight = this.rootElem.clientHeight;
		            pageHeight = this.rootElem.scrollHeight;
		            nCurrentScrollTop = this.rootElem.scrollTop;

	            }else{
		            viewHeight = opts.win.document.documentElement.clientHeight;
		            pageHeight = opts.win.document.documentElement.scrollHeight;
		            nCurrentScrollTop = undefined === window.pageYOffset ?
			            Math.max(document.body.scrollTop, document.documentElement.scrollTop) :
			            window.pageYOffset
		            ;
	            }

	            bFoot = (nCurrentScrollTop + viewHeight > pageHeight - opts.footerPX);

                while(len--){
                    item = arrImgAio[len];
                    elemItem = item[0];

                    if(!elemItem){
	                    arrImgAio.splice(len, 1);
                        continue;
                    }

                    if(
                        // 从上往下
	                    (nCurrentScrollTop + viewHeight + nOffsetY > item[1]) &&
	                    // 从下往上
	                    (nCurrentScrollTop - nOffsetY <= item[1]) ||

                        bFoot
	                    ){
                        itemSrc = elemItem.getAttribute(sAttrUrl);
                        if(itemSrc){
                            elemItem.setAttribute("src", itemSrc);
                            elemItem.removeAttribute(sAttrUrl);
                        }

                        elemItem = item[0] = null;

                        arrImgAio.splice(len, 1);
                    }

                }

            }

        })

	    .extend({
			_uid :0,

			uid: function(){
				return ++this._uid;
			},

		    arrWin   : [],

		    getWinInfo: function(win, bDel){
			    var
				    arrWin = this.arrWin,
				    len = arrWin.length,
				    result
			    ;

			    // 获取已经绑定 window
			    while(len--){
				    if(win === arrWin[len].win){
					    result = arrWin[len];
					    bDel && arrWin.splice(len, 1);
					    break;
				    }
			    }

			    return result;
		    },

		    bindWin: function(inst){
			    var
				    opts = inst.opts,
				    win = opts.win,
				    itemWin
			    ;

			    itemWin = this.getWinInfo(win);

			    inst.responseAdapter = function(){
				    inst.response();
			    };

			    if(itemWin){
				    itemWin.repo.push(inst.responseAdapter);

			    }else{

				    itemWin = {
					    win       : win,
					    repo     : []
				    };

				    itemWin.repo.push(inst.responseAdapter);

				    $(win).bind("scroll.frogImage", throttle(function(){
					    forEach(itemWin.repo, function(fn){
						    fn();
					    });
				    }, opts.sensitive));

				    // TODO 测试一下 真实 ie8 情况
				    $log(win === top);
				    if(win === top){
					    $(win).bind("resize.frogImage", throttle(function(){
						    $log("re");
						    forEach(itemWin.repo, function(fn){
							    fn();
						    });
						    itemWin.viewHeight = win.document.documentElement.clientHeight;
					    }, opts.sensitive));
				    }

				    this.arrWin.push(itemWin);
			    }

		    },

		    unbindWin: function(inst){
			    var
				    itemWin,
				    win = inst.opts.win,

				    f = inst.responseAdapter,

				    base,
				    len
			    ;

			    itemWin = this.getWinInfo(win);
			    base = itemWin.repo;
			    len = base.length;

			    while(len--){
				    if(f === base[len]){
					    base.splice(len, 1);
					    break;
				    }
			    }

			    if(0 === itemWin.repo.length){
			        this.getWinInfo(win, true);
				    $(win).unbind("scroll.frogImage");
				    win === top && $(win).unbind("resize.frogImage");
			    }

		    },

			// offset
			offset: function(elemOffset, elemScope){

				var
					nTop,
					nLeft,
					commonOffsetParent,
					_nTop,
					_nLeft,

					$parent,
					oOffset
				;

				if(!elemOffset || !elemScope || !$.contains(elemScope, elemOffset)){
					return {};
				}

				nTop = 0;
				nLeft = 0;
				commonOffsetParent = elemScope.offsetParent;
				_nTop = elemScope.offsetTop;
				_nLeft = elemScope.offsetLeft;

				if("none" === $(elemOffset).css("display")){
					elemOffset = elemOffset.parentNode;
					$parent = $(elemOffset);

					// jquery 1.9 add
					oOffset = $parent.css([
						"paddingTop",
						"borderTopWidth",
						"paddingLeft",
						"borderLeftWidth"
					]);

					nTop += parseInt(oOffset.paddingTop || 0);
					nTop += parseInt(oOffset.borderTopWidth || 0);

					nLeft += parseInt(oOffset.paddingLeft || 0);
					nLeft += parseInt(oOffset.borderLeftWidth || 0);
				}

				while(elemOffset !== commonOffsetParent){
					nTop += elemOffset.offsetTop;
					nLeft += elemOffset.offsetLeft;
					elemOffset = elemOffset.offsetParent;
				}

				// gc
				elemOffset = elemScope = commonOffsetParent = null;

				return {
					left: nLeft - _nLeft,
					top : nTop - _nTop
				};

			}

	    })
    ;

    /**
     * @param selector
     * @param opts
     */
    frog = function(selector, opts){
	    return Frog.init.apply(Frog, arguments);
    };

    exports["frogImg"] = frog;

    // amd
    "function" === typeof window.define && define.amd && define.amd.dancesFrogImg && define(function(){
        return frog;
    });

})(window.dances);