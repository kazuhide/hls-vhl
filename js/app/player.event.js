/*
 * ADOBE SYSTEMS INCORPORATED
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.

 * NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 * terms of the Adobe license agreement accompanying it.  If you have received this file from a
 * source other than Adobe, then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

(function() {
    'use strict';

    var StreamType = ADB.va.MediaHeartbeat.StreamType;
    var MediaHeartbeat = ADB.va.MediaHeartbeat;

    var PlayerEvent = {
        VIDEO_LOAD: 'video_load',
        VIDEO_UNLOAD: 'video_unload',
        PLAY: 'play',
        PAUSE: 'pause',
        COMPLETE: 'COMPLETE',
        BUFFER_START: 'buffer_start',
        BUFFER_COMPLETE: 'buffer_complete',
        SEEK_START: 'seek_start',
        SEEK_COMPLETE: 'seek_complete',
    };

    function VideoPlayer(id) {
        this._playerName = Configuration.PLAYER.NAME;
        this._videoId = Configuration.PLAYER.VIDEO_ID;
        this._videoName = Configuration.PLAYER.VIDEO_NAME;
        this._streamType = StreamType.VOD;

        this._videoLoaded = false;

        // Build a static/hard-coded QoS info here.
        this._qosInfo = MediaHeartbeat.createQoSObject(50000, 0, 24, 10);

        this._clock = null;

        this.$el = $('#' + id);

        var self = this;
        if (this.$el) {
            this.$el.on('playing', function() {
                self._onPlay();
            });
            this.$el.on('seeking', function() {
                self._onSeekStart();
            });
            this.$el.on('seeked', function() {
                self._onSeekComplete();
            });
            this.$el.on('pause', function() {
                self._onPause();
            });
            this.$el.on('ended', function() {
                self._onComplete();
            });
        }
    }

    VideoPlayer.prototype.getCurrentPlaybackTime = function() {
        var playhead = this.getPlayhead();
        return playhead;
    };

    VideoPlayer.prototype.getVideoInfo = function() {
        return this._videoInfo;
    };

    VideoPlayer.prototype.getQoSInfo = function() {
        return this._qosInfo;
    };

    VideoPlayer.prototype.getDuration = function() {
        return this.$el.get(0).duration;
    };

    VideoPlayer.prototype.getPlayhead = function() {
        var playhead = this.$el.get(0).currentTime;
        return playhead ? playhead : 0;
    };

    VideoPlayer.prototype._onPlay = function(e) {
        this._openVideoIfNecessary();
        NotificationCenter().dispatchEvent(PlayerEvent.PLAY);
    };

    VideoPlayer.prototype._onPause = function(e) {
        NotificationCenter().dispatchEvent(PlayerEvent.PAUSE);
    };

    VideoPlayer.prototype._onSeekStart = function(e) {
        this._openVideoIfNecessary();
        NotificationCenter().dispatchEvent(PlayerEvent.SEEK_START);
    };

    VideoPlayer.prototype._onSeekComplete = function(e) {
        NotificationCenter().dispatchEvent(PlayerEvent.SEEK_COMPLETE);
    };

    VideoPlayer.prototype._onComplete = function(e) {
        this._completeVideo();
    };

    VideoPlayer.prototype._openVideoIfNecessary = function() {
        if (!this._videoLoaded) {
            this._resetInternalState();
            this._startVideo();
        }
    };

    VideoPlayer.prototype._completeVideo = function() {
        if (this._videoLoaded) {
            // Complete the second chapter
            this._completeChapter();

            NotificationCenter().dispatchEvent(PlayerEvent.COMPLETE);

            this._unloadVideo();
        }
    };

    VideoPlayer.prototype._unloadVideo = function() {
        NotificationCenter().dispatchEvent(PlayerEvent.VIDEO_UNLOAD);
        clearInterval(this._clock);

        this._resetInternalState();
    };

    VideoPlayer.prototype._resetInternalState = function() {
        this._videoLoaded = false;
        this._clock = null;
    };

    VideoPlayer.prototype._startVideo = function() {
        // Prepare the main video info.
        this._videoInfo = {};
        this._videoInfo.id = this._videoId;
        this._videoInfo.name = this._videoName;
        this._videoInfo.playerName = this._playerName;
        this._videoInfo.length = this.getDuration();
        this._videoInfo.streamType = this._streamType;
        this._videoInfo.playhead = this.getPlayhead();

        this._videoLoaded = true;

        NotificationCenter().dispatchEvent(PlayerEvent.VIDEO_LOAD);
    };

    // Export symbols.
    window.PlayerEvent = PlayerEvent;
    window.VideoPlayer = VideoPlayer;
})();
