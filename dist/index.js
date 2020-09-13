'use strict';

var REQUIREDOPTIONS = ['type', 'data'];

var threedcharts = function threedcharts(opts) {
  if (opts === void 0) {
    opts = {};
  }

  for (var i = 0; i < REQUIREDOPTIONS.length; i++) {
    if (!opts[REQUIREDOPTIONS[i]]) {
      throw new Error("Missing required option \"" + REQUIREDOPTIONS[i] + "\"");
    }
  }
};

module.exports = threedcharts;
