
var Backbone = require('backbone');
var jPlayer = require('jplayer');
var  $ = require('jquery');
var TweenMax = require('gsap');

        module.exports =  Backbone.View.extend(new function (){

            this.className = 'video_container';
            this.ready = false;
            this.need_play = false;

            this.initialize = function () {
            }

            this.setVideo = function(media_path, width, height) {


                    this.$video_div = $('<div/>');
                    this.video_div = this.$video_div.get(0);

                    var media = {
                     m4v: media_path+".mp4",
                     webmv: media_path+".webm"
                    };

                    this.jplayer = this.$video_div.jPlayer.bind(this.$video_div);
                    this.jplayer({
                         ready : function() {
                             this.jplayer('setMedia', media);
                             this.trigger('ready');
                             this.ready = true;
                             if (this.need_play) {
                                 this.play();
                                 this.need_play = false;
                             }

                         }.bind(this),
                         ended: _videoEnd.bind(this),
                         solution: 'html',
                         muted:true,
                         supplied: 'webmv',
                         errorAlerts: false,
                         playbackRate:5,
                         warningAlerts: false
                    });

                    _setVideo.call(this, this.video_div, width, height);

            }

            function _videoEnd() {
                this.trigger('end');
            }

            function _setVideo(video,width,height) {
                if (this.video) this.$video_div.remove();
                this.$el.append(video);

                $(video).css('position','absolute');
                // $(video.el()).css('z-index','9');

                this.video_width = width;
                this.video_height = height;
                this.video = video;

                // this.resize();
            }

            this.play =function() {
                if (!this.ready) this.need_play = true
                else this.jplayer('play');
            }
            this.stop =function() {

                if (!this.ready) this.need_play = false
                else this.jplayer('stop');
            }

            this.loop = function(loop) {
                this.jplayer('option', 'loop', true);
            }

            this.show = function (direct){
                this.$el.show();
            //    TweenMax.to(this.el, .5, {onComplete:this.shown, onCompleteScope:this, autoAlpha:1});
            }

            this.shown = function () {
                this.trigger('shown');
            }


            this.hide = function (direct){
                this.$el.hide();

            // TweenMax.to(this.el, .5, {onComplete:this.hidden, onCompleteScope:this, autoAlpha:0});
            }

            this.hidden = function () {
                this.trigger('hidden');
            }

            // this.resize = function () {
            //     if(!this.$video_div|| !this.video_div) return;

            //     var size = {
            //         w : this.$el.width(),
            //         h : this.$el.height()
            //     }

            //     if (size.w == 0) return _.delay(this.resize.bind(this), 100);

            //     this.scale = ResizeTools.getScale("cover", size.w ,  size.h, this.video_width, this.video_height,.8);

            //     this.$video_div.width(this.scale*this.video_width);
            //     this.$video_div.height(this.scale*this.video_height);

            //     this.$video_div.css({
            //         width : this.scale*this.video_width,
            //         height : this.scale*this.video_height,
            //         left : (size.w - this.$video_div.width())/2,
            //         top : (size.h - this.$video_div.height())/2
            //     })

            // }

            this.flush = function () {

                    if (this.jplayer) {
                        this.jplayer('setMedia', {m4v : '', webm : '', poster:''});
                    }


                    this.jplayer = null;
                    this.video_div = null;
                    this.$video_div = null;
                    this.off();

                    this.$el.empty();
                    this.video = null;

            }



    });
