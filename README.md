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
		priority: 'scroll-priority',
		selector: '.scroll'
    });
});
```