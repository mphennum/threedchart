# threedcharts

3 dimensional charts using threejs.

## table of contents

- [install](#install)
- [usage](#usage)
- [options](#options)

* * *

## install

### npm

```bash
$ npm install @mphennum/threedcharts
```

### browser

```html
<script src="/path/to/threedcharts.js"></script>
```

* * *

## usage

### node

```js
import threedcharts from '@mphennum/threedcharts';
let chart = new threedcharts.chart({
	el: 'body',
});
```

### browser

```js
var threedcharts = window.threedcharts;
var chart = new threedcharts.chart({
	el: 'body',
});
```

* * *

## options

```js
new threedcharts.chart({
	el: 'body', // element that chart will be appended to
	// el: 'body', // default
	// el: '#id', // target by id
	// el: '.class', // target by class name, first element chosen
	// el: domElement, // directly pass a dom element
});
```
