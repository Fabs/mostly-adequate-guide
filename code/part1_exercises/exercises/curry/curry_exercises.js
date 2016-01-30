var _ = require('lodash/fp');

function match(e,x){ return e.exec(x); };
var _keepHighest = function(x,y){ return x >= y ? x : y; }
function aslice(start, end, xs){ return xs.slice(start,end);}

var words = _.split(' ');
var sentences = _.map(words);
var filterQs = _.filter(_.partial(match, /q/i))
var max = _.reduce(_keepHighest, -Infinity);
var slice = _.curry(aslice);

var take = slice(0);

module.exports = { words: words,
                   sentences: sentences,
                   filterQs: filterQs,
                   max: max,
                   slice: slice,
                   take: take
                 };
