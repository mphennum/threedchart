var threedchart = (function () {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  // import * as THREE from 'three';
  var OPTIONSCFG = {
    el: {
      type: [String, Element],
      required: true,
      validator: function validator(v) {
        var type = typeof v;

        if (type === 'string') {
          return /^[#.]?[\w-]+$/.test(v);
        }

        return type === 'object';
      }
    },
    type: {
      type: String,
      required: true,
      validator: function validator(v) {
        return Object.keys(CHARTS).includes(v);
      }
    },
    colors: {
      type: [String, Object],
      "default": 'default',
      validator: function validator(v) {
        var type = typeof v;

        if (type === 'string') {
          return v !== 'custom' && Object.keys(COLORSCHEMES).includes(v);
        }

        return type === 'object';
      }
    },
    fullScreen: {
      type: Boolean,
      "default": false
    },
    showLegend: {
      type: Boolean,
      "default": true
    },
    title: String,
    xLabel: String,
    yLabel: String,
    xPrefix: String,
    yPrefix: String,
    xSuffix: String,
    ySuffix: String,
    data: {
      type: Array,
      required: true,
      validator: function validator(v) {
        if (!(v instanceof Array)) {
          return false;
        }

        return v.every(function (item) {
          return item && typeof item === 'object';
        });
      }
    }
  };
  var COLORSCHEMES = {
    "default": {
      background: 0x707C7F,
      border: 0x25303B,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [0x2062AE, // blue
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
    earth: {
      background: 0x89816C,
      border: 0x291809,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [0x404F24, // green
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
      background: 0xCC952A,
      border: 0x7D1502,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [0xED3225, // red
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
      background: 0x739B98,
      border: 0x153020,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [// alternating greens and blues, dark to light
      0x6E8800, 0x487A73, 0x95A43A, 0x6D9182, 0xAAB672, 0x65A292, 0x9EB830, 0x78AAA3, 0xC5E46A, 0x9DC1B2]
    },
    neon: {
      background: 0x181818,
      border: 0x080808,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [0x26FF00, // green
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
      background: 0x727679,
      border: 0x212930,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [// alternating light and dark blueish gray
      0xC3C8CD, 0x767F88, 0xA8ADB4, 0x606A74, 0x313B46, 0xB3B8BD, 0x505A64, 0x989DA4, 0x414B56, 0x868F98]
    },
    gray: {
      background: 0x777777,
      border: 0x333333,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [// alternating light and dark grey
      0xFFFFFF, 0xA0A0A0, 0xF0F0F0, 0x909090, 0xE0E0E0, 0x808080, 0xD0D0D0, 0x707070, 0xC0C0C0, 0x606060, 0xB0B0B0, 0x505050]
    },
    custom: {
      background: 0x777777,
      border: 0x333333,
      marks: 0xFFFFFF,
      titles: 0xFFFFFF,
      data: [0xFF0000, 0x00FF00, 0x0000FF]
    }
  }; //#TODO hook up classes here

  var CHARTS = {
    bar: null,
    line: null,
    pie: null,
    scatter: null
  };

  var threedchart = // options
  // threejs
  function threedchart(opts) {
    var _this = this;

    if (opts === void 0) {
      opts = {};
    }

    _defineProperty(this, "el", OPTIONSCFG.el["default"]);

    _defineProperty(this, "type", null);

    _defineProperty(this, "colors", OPTIONSCFG.colors["default"]);

    _defineProperty(this, "fullScreen", OPTIONSCFG.fullScreen["default"]);

    _defineProperty(this, "showLegend", OPTIONSCFG.showLegend["default"]);

    _defineProperty(this, "title", null);

    _defineProperty(this, "xLabel", null);

    _defineProperty(this, "yLabel", null);

    _defineProperty(this, "xPrefix", null);

    _defineProperty(this, "yPrefix", null);

    _defineProperty(this, "xSuffix", null);

    _defineProperty(this, "ySuffix", null);

    _defineProperty(this, "data", null);

    _defineProperty(this, "renderer", null);

    var _loop = function _loop(k) {
      var opt = opts[k];
      var cfg = OPTIONSCFG[k];

      if (typeof cfg === 'function' || cfg instanceof Array) {
        cfg = {
          type: cfg
        };
      }

      var _cfg = cfg,
          _cfg$type = _cfg.type,
          type = _cfg$type === void 0 ? null : _cfg$type,
          def = _cfg["default"],
          _cfg$required = _cfg.required,
          required = _cfg$required === void 0 ? false : _cfg$required,
          _cfg$validator = _cfg.validator,
          validator = _cfg$validator === void 0 ? null : _cfg$validator;

      if (type && !(type instanceof Array)) {
        type = [type];
      }

      if (def === undefined) {
        def = type && type[0] === Boolean ? false : null;
      }

      if ([null, undefined].includes(opt)) {
        if (required) {
          throw new Error("Missing required option \"" + k + "\"");
        }

        opt = def;
      }

      if (type) {
        var isNull = opt === null;

        if (!type.some(function (t) {
          return isNull && t !== Boolean || !isNull && opt.constructor === t;
        })) {
          throw new Error("Invalid data type for option \"" + k + "\". Expected " + type.map(function (t) {
            return "\"" + t.name + "\"";
          }).join(', ') + ".");
        }
      }

      if (validator && (def === undefined || opt !== def) && !validator(opt)) {
        throw new Error("Option \"" + k + "\" failed validation.");
      }

      _this[k] = opt;
    };

    // validate + set options
    for (var k in OPTIONSCFG) {
      _loop(k);
    }
  };

  return threedchart;

}());
