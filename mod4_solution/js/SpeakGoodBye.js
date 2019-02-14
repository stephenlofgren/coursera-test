(function (window) {
  var speakWord = "Good Bye";
  var byeSpeaker = {};

  byeSpeaker.speakSimple = function (name) {
    return speakWord + " " + name;
  }

  byeSpeaker.speak = function (name) {
    console.log(byeSpeaker.speakSimple(name));
  };

  window.byeSpeaker = byeSpeaker;
})(window);