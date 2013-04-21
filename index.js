
/**
 * dependencies.
 */

var emitter = require('emitter')
  , events = require('events');

/**
 * export `Video`
 */

module.exports = Video;

/**
 * Initialize new `Video` with `el`.
 * 
 * @param {Element} el
 */

function Video(el){
  this.events = events(el, this);
  this.events.bind('canplaythrough');
  this.events.bind('progress');
  this.events.bind('timeupdate');
  this.events.bind('ended');
  this.el = el;
}

/**
 * mixins.
 */

emitter(Video.prototype);

/**
 * toggle play / pause.
 * 
 * @return {Video}
 */

Video.prototype.toggle = function(){
  return this.el.paused
    ? this.play()
    : this.pause();
};

/**
 * play video.
 * 
 * @return {Video}
 */

Video.prototype.play = function(){
  this.el.play();
  return this;
};

/**
 * pause video.
 * 
 * @return {Video}
 */

Video.prototype.pause = function(){
  this.el.pause();
  return this;
};

/**
 * onprogress.
 * 
 * @param {Event} e
 */

Video.prototype.onprogress = function(e){
  var end = this.el.buffered.end(0);
  e.percent = end / this.el.duration * 100 | 0;
  this.emit('progress', e);
  return this;
};

/**
 * ontimeupdate.
 * 
 * @param {Event} e
 */

Video.prototype.ontimeupdate = function(e){
  e.percent = this.el.currentTime / this.el.duration * 100;
  this.emit('timeupdate', e);
};

/**
 * oncanplaythrough.
 * 
 * @param {Event} e
 */

Video.prototype.oncanplaythrough = function(e){
  this.emit('ready', e);
};

/**
 * onended.
 * 
 * @param {Event} e
 */

Video.prototype.onended = function(e){
  this.emit('ended');
};
