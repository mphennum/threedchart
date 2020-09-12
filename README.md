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
let chart = new threedcharts.chart();
```

### browser

```js
var threedcharts = window.threedcharts;
var chart = new threedcharts.chart();
```

* * *

## options

> Default options.

```js
new threedcharts.chart({
	el: 'body',
	colors: 'basic',
	fullScreen: false,
	showLegend: true,
	data: null,
});
```

### el

> Target html element for rendering.

- types: `String`, `Element`
- default: `'body'`
- options
	- `'body'` - targets the `document.body` element
	- `'#element-id'` - target an element by id
	- `'.class-name'` - target the first matching element by class name
	- `'tag-name'` - target the first matching element by tag name
	- `domElement` - target a given dom element

### colors

> Color scheme string, or custom color scheme object.

- types: `String`, `Object`
- default: `'default'`
- options
	- `'default'` -- blue, green, red, yellow, etc
	- `'grey'` - shades of grey
	- `'warm'` - red, orange, yellow
	- `'cool'` - blue, green
	- `'neon'` - bright colors
	- `'earth'` - brown, green
	- `customColors` - custom object defined below

> Custom color scheme with hex numbers or color strings

```js
var customColors = {
	background: '#707C7F', // hex string
	border: 0x25303B,
	marks: 0x25303B,
	titles: '#FFF', // short hex string
	data: [
		'rgb(32, 98, 174)', // rgb colors
		0x46A53F,
		0xD98407,
		0x6C2180,
		0xCF1A3D,
		0x5092EE,
	],
}
```

### fullScreen

> Fullscreen mode.

- type: `Boolean`
- default: `false`
- options
	- `true` - full screen mode on
	- `false` - full screen mode off

### data

> Chart data. Different types of charts have different formats.

- type: `Array`
- required
