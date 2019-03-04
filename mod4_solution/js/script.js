(function (window) {

  // *******************************
  // START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
  // *******************************
  //
  // Module 4 Assignment Instructions.
  //
  // The idea of this assignment is to take an existing array of names
  // and then output either Hello 'Name' or Good Bye 'Name' to the console.
  // The program should say "Hello" to any name except names that start with a "J"
  // or "j", otherwise, the program should say "Good Bye". So, the final output
  // on the console should look like this:
  /*
  Hello Yaakov
  Good Bye John
  Good Bye Jen
  Good Bye Jason
  Hello Paul
  Hello Frank
  Hello Larry
  Hello Paula
  Hello Laura
  Good Bye Jim
  */
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    if (name.charAt(0).toLowerCase() == 'j') {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

  /*this meets the requirement but is pretty inefficient*/
  var hasJ = function (name) {
    var firstLetter = name.charAt(0).toLowerCase();
    return firstLetter == 'j';
  }

  var getMessage = function (name) {
    return hasJ(name) ? byeSpeaker.speakSimple(name) : helloSpeaker.speakSimple(name);
  };

  var messages = names.map(name => getMessage(name));
  messages.map(message => console.log(message));

  const greeter = (aac, cur, idx, src) => {
    if(hasJ(cur)){
      aac.bye.push(byeSpeaker.speakSimple(cur));
    }
    else {
      aac.hello.push(helloSpeaker.speakSimple(cur));
    }
    return aac;
  }

  /*this is much more efficient*/
  //const greeter = (acc, cur, idx, src) => {
  //  acc[idx] = getMessage(cur);
  //  return acc;
  //};

  /*this is probably a little closer to what you were looking for*/
  var messages = {hello: [], bye: []};
  messages = names.reduce(greeter, messages);
  messages.hello.map(m => console.log(m));
  messages.bye.map(m => console.log(m));
})();

