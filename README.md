# scroll.js

### Installation
```
npm install scroll.js --save-dev
```

### Usage
```javascript
var Scroll = require('scroll.js');

$(function() {
    Scroll.init();
});
```

#### With options
```javascript
var Scroll = require('scroll.js');

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