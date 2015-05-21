var Backbone = require('backbone');
var jPlayer = require('jplayer');
var $ = require('jquery');
var TweenMax = require('gsap');

module.exports = Backbone.View.extend(new function() {

    this.className = 'image_container';
    this.ready = false;
    this.need_play = false;

    this.initialize = function() {}

    this.setImage = function(imagePath, width, height) {
        this.$image_div = $('<div/>')
        this.image_div = this.$image_div.get(0);
        this.$image_div.append('<img src='+imagePath+'>');

        this._setImage(this.image_div,width,height);
    }

    this._setImage = function(image, width, height) {
        if (this.image) this.$image_div.remove();
        this.$el.append(image);

        $(image).css({
            position:'absolute',
            top:0,
            width:width,
            height:height
        });
        this.image = image;

    }


    this.show = function(direct) {
        this.$el.show();
        //    TweenMax.to(this.el, .5, {onComplete:this.shown, onCompleteScope:this, autoAlpha:1});
    }

    this.shown = function() {
        this.trigger('shown');
    }


    this.hide = function(direct) {
        this.$el.hide();


    }

    this.hidden = function() {
        this.trigger('hidden');
    }


    this.flush = function() {

        // this.off();
        this.video_div = null;
        this.$video_div = null;
        this.video = null;
        this.$el.empty();
        // this.$el.remove();

    }



});