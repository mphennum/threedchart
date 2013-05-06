/*! ThreeDCharts.JS | mphennum.com | mphennum@gmail.com */

// Configuration Constants & Statics

var THREEDCHARTS = THREEDCHARTS || {
	// misc.
	VERSION: '0.2',
	DATE: '2013-05-05',
	WEBSITE: 'http://mphennum.com/work/threedcharts/',
	CAMERADISTANCE: 17,
	MONTH: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	
	// color
	COLORSCHEMES: {
		basic: {
			bg: 0x707C7F,
			border: 0x25303B,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [
				0x2062AE, // blue
				0x46A53F, // green
				0xCF1A3D, // red
				0xECD621, // yellow
				0x6C2180, // purple
				0xD98407, // orange
				0xD55E72, // pink
				0x6F4F38, // brown
				0xE9E9E9, // white
				0x7F8B8B, // gray
				0x00ACC2, // light blue
				0x617D43, // dark green
				0xDC3FB2, // magenta
				0xD44F22, // orange-red
				0xCFAA9A, // tan
				0xBDD446 // lime
			]
		},
		basic2: {
			bg: 0x777777,
			border: 0x333333,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [
				0xB21F35, // red
				0x00753A, // green
				0x0052A5, // blue
				0xFFF735, // yellow
				0x681E7E, // purple
				0xFFA135, // orange
				0xB21F35, // red
				0x00753A, // green
				0x0052A5, // blue
				0xFFF735, // yellow
				0x681E7E, // purple
				0xFFA135 // orange
			]
		},
		earth: {
			bg: 0x89816C,
			border: 0x291809,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [
				0x404F24, // green
				0x613318, // brown
				0x8F3B1B, // reddish
				0x4E6172, // blue
				0x816C5B, // dull brown
				0x668D3C, // light green
				0x855723, // light brown
				0xD57500, // orange
				0x83929F, // light blue
				0xB99C6B, // tan
				0xBDD09F, // very light green
				0xDBCA69 // yellow
			]
		},
		warm: {
			bg: 0xCC952A,
			border: 0x7D1502,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [
				0xED3225, // red
				0xFFD433, // yellow
				0xFF5C03, // red-orange
				0xFFE870, // light yellow
				0xFF910F, // orange
				0xFD5245, // light red
				0xFFF403, // bright yellow
				0xFFAC03, // orange-red
				0xAD3225, // dark red
				0xFFC10F // bright orange
			]
		},
		cool: {
			bg: 0x739B98,
			border: 0x153020,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [ // alternating greens and blues, dark to light
				0x6E8800,
				0x487A73,
				0x95A43A,
				0x6D9182,
				0xAAB672,
				0x65A292,
				0x9EB830,
				0x78AAA3,
				0xC5E46A,
				0x9DC1B2
			]
		},
		neon: {
			bg: 0x181818,
			border: 0x080808,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [
				0x26FF00, // green
				0xFF00FF, // magenta
				0xF8FF00, // yellow
				0x00FDFF, // teal
				0xFFB800, // orange
				0xA6FF00, // yellow-green
				0xFF80FF, // pink
				0xF8FF80, // light yellow
				0x80FDFF, // light blue
				0xFFFFFF // white
			]
		},
		bluegray: {
			bg: 0x727679,
			border: 0x212930,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [ // alternating light and dark blueish gray
				0xC3C8CD,
				0x767F88,
				0xA8ADB4,
				0x606A74,
				0x313B46,
				0xB3B8BD,
				0x505A64,
				0x989DA4,
				0x414B56,
				0x868F98
			]
		},
		gray: {
			bg: 0x777777,
			border: 0x333333,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [ // alternating light and dark grey
				0xFFFFFF,
				0xA0A0A0,
				0xF0F0F0,
				0x909090,
				0xE0E0E0,
				0x808080,
				0xD0D0D0,
				0x707070,
				0xC0C0C0,
				0x606060,
				0xB0B0B0,
				0x505050
			]
		},
		custom: {
			bg: 0x777777,
			border: 0x333333,
			marks: 0xFFFFFF,
			titles: 0xFFFFFF,
			colors: [
				0xFF0000,
				0x00FF00,
				0x0000FF
			]
		}
	},

	// nodes
	LIGHTDEPTH: 10,
	PLANETHICKNESS: 0.05,
	LINETHICKNESS: 0.05,
	JOINTTHICKNESS: 0.025,
	POINTSIZE: 0.035,
	CHARTSIZE: 10
};

THREEDCHARTS.chartFactory = function(type, controller){
	switch(type){
		//case 'pie':
			//return new THREEDCHARTS.PieChart({controller: controller});
		case 'scatter':
			return new THREEDCHARTS.ScatterChart({controller: controller});
		case 'bar':
			return new THREEDCHARTS.BarChart({controller: controller});
		case 'line':
			return new THREEDCHARTS.LineChart({controller: controller});
		default:
			return null;
	}
};
