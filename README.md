# threedchart

3 dimensional charts using threejs.

## contents

- [install](#install)
- [usage](#usage)
- [options](#options)
- [methods](#methods)

* * *

## install

### npm

```bash
$ npm install @mphennum/threedchart
```

### browser

```html
<script src="/path/to/dist/threedchart.js"></script>
```

* * *

## usage

### node

```js
import threedchart from '@mphennum/threedchart';
let chart = new threedchart({ el: '#chart', type: 'bar', data: [ ] });
```

### browser

```js
var threedchart = window.threedchart;
var chart = new threedchart({ el: '#chart', type: 'bar', data: [ ] });
```

* * *

## options

> Default options.

```js
new threedchart({
	el: '#chart', // required
	type: 'bar', // required
	colors: 'default',
	fullScreen: false,
	showLegend: true,
	title: null,
	xLabel: null,
	yLabel: null,
	xPrefix: null,
	yPrefix: null,
	xSuffix: null,
	ySuffix: null,
	data: [ ] // required
});
```

### el

> Target html element for rendering.

- types: `String`, `Element`
- required
- options
	- `'#element-id'` - target an element by id
	- `'.class-name'` - target the first matching element by class name
	- `'tag-name'` - target the first matching element by tag name
	- `domElement` - target a given dom element, example below

> Target a dom element directly.

```js
var domElement = document.createElement('div');
// or
var domElement = document.getElementById('#chart');

var chart = new threedchart({
	el: domElement,
	type: 'bar',
	data: [ ]
});
```

### type

> Chart display type.

- type: `String`
- required
- options:
	- `'bar'` - bar chart
	- `'line'` - line chart
	- `'pie'` - pie chart
	- `'scatter'`' - scatter plot

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
	- `customColors` - custom object, example below

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
		0x5092EE
	]
};

var chart = new threedchart({
	el: '#chart',
	type: 'bar',
	colors: customColors,
	data: [ ]
});
```

### fullScreen

> Full screen mode.

- type: `Boolean`
- default: `false`


### title

> Main title above chart.

- type: `String`
- default: `null`

### xLabel

> Label below the x axis.

- type: `String`
- default: `null`

### yLabel

> Label to the left of the y axis.

- type: `String`
- default: `null`

### xPrefix

> Prefix prepended to marks along x axis.

- type: `String`
- default: `null`

### yPrefix

> Prefix prepended to marks along y axis.

- type: `String`
- default: `null`

### xSuffix

> Suffix appended to marks along x axis.

- type: `String`
- default: `null`

### ySuffix

> Suffix appended to marks along y axis.

- type: `String`
- default: `null`

### data

> Chart data. Different types of charts have different formats.

- type: `Array`
- required

#### bar chart data format

- type: `Array` of `Object`s
- fields: `name`, `val`

```js
var data = [
	{
		name: 'Elves',
		val: 14
	},
	{
		name: 'Men',
		val: 7
	},
	{
		name: 'Dwarves',
		val: 8
	}
];
```

#### line chart data format

- type: `Array` of `Object`s
- fields: `name`, `vals`

```js
var data = [
	{
		name: 'Internet Explorer',
		vals: [ 34.27, 32.7, 31.68, 30.81, 28.87, 28.95, 28.49, 28.98, 28.77, 28.13, 27.15, 26.3 ]
	},
	{
		name: 'Chrome',
		vals: [ 25.99, 27.24, 28.09, 28.24, 29.15, 29.35, 30.06, 29.63, 30.01, 30.49, 31.05, 31.12 ]
	},
	{
		name: 'Firefox',
		vals: [ 22.68, 22.76, 22.73, 22.49, 22.97, 22, 21.01, 20.16, 19.7, 19.57, 19.74, 18.71 ]
	},
];
```

#### pie chart data format

- type: `Array` of `Object`s
- fields: `name`, `val`

```js
var data = [
	{
		name: 'BTC',
		val: 193.2
	},
	{
		name: 'ETH',
		val: 43.3
	},
	{
		name: 'USDT',
		val: 14.7
	},
	{
		name: 'XRP',
		val: 11.2
	},
	{
		name: 'LINK',
		val: 4.4
	}
];
```

#### scatter chart data format

- type: `Array` of `Object`s
- fields: `name`, `vals`

```js
var data = [
	{
		name: 'United States',
		vals: [ 0.978, 77.97 ]
	},
	{
		name: 'Norway',
		vals: [ 0.989, 80.45 ]
	},
	{
		name: 'France',
		vals: [ 0.968, 80.95 ]
	},
	{
		name: 'Japan',
		vals: [ 0.949, 82.73 ]
	},
	{
		name: 'United Kingdom',
		vals: [ 0.957, 79.53 ]
	},
	{
		name: 'South Africa',
		vals: [ 0.843, 51.2 ]
	},
	{
		name: 'Germany',
		vals: [ 0.954, 79.85 ]
	},
	{
		name: 'Australia',
		vals: [ 0.993, 81.44 ]
	}
];
```

* * *

## methods

> Rendering a chart.

```js
var chart = new threedchart({ type: 'bar', data: [ ] });
```

### setData

> Replaces all data points in chart.

- params
	- `data`: `Array` of `Object`s - all replacement data points

```js
chart.setData([
	{
		name: 'Feanor',
		val: 14
	},
	{
		name: 'Fingolfin',
		val: 8
	}
]);
```
