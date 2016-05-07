require('../../support');
var Task = require('data.task');
var r = require('ramda');
var _ = r;

var user = { id: 2, name: "Albert" };
var id = _.curry(function(x){ return x.__value; });
var safeProp = _.curry(function (x, o) { return Maybe.of(o[x]); });
var getPost = function (i) {
  return new Task(function(rej, res) {
    setTimeout(function(){
      res({id: i, title: 'Love them futures'})
    }, 100)
  });
};
var upperTitle = _.compose(_.toUpper, _.prop('title'))
var showWelcome = _.compose(_.add( "Welcome "), _.prop('name'));

// ==========
// Write a function that uses checkActive() and showWelcome() to grant access or return the error

var showWelcome = _.compose(_.concat( "Welcome "), _.prop('name'));

var checkActive = function(user) {
 return user.active ? Right.of(user) : Left.of('Your account is not active')
};

var ex1 = _.map(_.add(1));
var ex2 = _.map(_.head);
var ex3 = _.compose(_.map(_.head),safeProp('name'));
var ex4 = _.compose(_.map(parseInt), Maybe.of);
var ex5 = _.compose(_.map(upperTitle), getPost);
var ex6 = _.compose(_.map(showWelcome),checkActive);
var ex7 = function(x) {
  return x.length > 3 ? Right.of(x) : Left.of("You need > 3");
};

var save = function(x) {
  return new IO(function() {
    console.log("SAVED USER!");
    return x + '-saved';
  });
};
var ex8 = _.compose(either(IO.of,save),ex7);

module.exports = {ex1: ex1, ex2: ex2, ex3: ex3, ex4: ex4, ex5: ex5, ex6: ex6, ex7: ex7, ex8: ex8};
