require('../../support');
var Task = require('data.task');
var _ = require('ramda');

var localStorage = {};

var ex1 = function(x, y) {
  return Maybe.of(add).ap(Maybe.of(x)).ap(Maybe.of(y))
};
var ex2 = liftA2(add);

var makeComments = _.reduce(function(acc, c){ return acc+"<li>"+c+"</li>" }, "");
var render = _.curry(function(p, cs) { return "<div>"+p.title+"</div>"+makeComments(cs); });

var ex3 = Task.of(render).ap(getPost(2)).ap(getComments(2));

localStorage.player1 = "toby";
localStorage.player2 = "sally";

var getCache = function(x) {
  return new IO(function() { return localStorage[x]; });
}
var game = _.curry(function(p1, p2) { return p1 + ' vs ' + p2; });

//  ex4 :: IO String
var ex4 = liftA2(game, getCache('player1'), getCache('player2'));

// TEST HELPERS
// =====================
function getPost(i) {
  return new Task(function (rej, res) {
    setTimeout(function () { res({ id: i, title: 'Love them futures' }); }, 300);
  });
}

function getComments(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res(["This book should be illegal", "Monads are like space burritos"]);
    }, 300);
  });
}

module.exports = {ex1: ex1, ex2: ex2, ex3: ex3, ex4: ex4}
