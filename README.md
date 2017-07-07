# Scroll

### Installation
```
npm install @wearejust/scroll --save-dev
```

### Usage
```javascript
var Scroll = require('@wearejust/scroll');

$(function() {
    Scroll.init();
});
```

#### With options
```javascript
var Scroll = require('@wearejust/scroll');

$(function() {
    Scroll.init({
		active: 'active',
		delay: 200,
		delayHorizontal: 50,
		gap: 0.1,
		priority: 'scroll-priority',
		selector: '.scroll'
    });
});
```