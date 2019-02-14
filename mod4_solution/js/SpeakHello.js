(function (window) {
  var speakWord = "Hello";
  var helloSpeaker = {};

  helloSpeaker.speakSimple = function (name) {
    return speakWord + " " + name;
  }

  helloSpeaker.speak = function (name) {
    console.log(helloSpeaker.speakSimple(name));
  };

  window.helloSpeaker = helloSpeaker;
})(window);