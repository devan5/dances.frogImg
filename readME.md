# dances.frogImg

## desc
dances.frogImg 移植自 dances.frogImage
dances.frogImage 移植自 Ds.jQ.lazzImging

### effect
+  实现全局window 或 元素内部图片惰性加载,
+ 在元素上使用 frogImage 由于resize 仅支持<body><iframe><frameset>,为了模拟 resize 事件,使用了 clicks事件

### syntax
	dances.frogImg(sSelectors, opts); // 针对 window
	dances.frogImg(opts);

### log
#### 2.0
重构之第一版本 

+ 舍弃 jQuery 实例化方式. 
+ 增加 amd  