(function() {
    if (Hls.isSupported()) {
        var video = document.getElementById('video');
        var hls = new Hls();
        
        // --- start VHL integration ---
        // Create the VideoPlayer.
        var videoplayer = new VideoPlayer('video');
        
        // Create the AnalyticsProvider instance and attach it to the VideoPlayer instance.
        var analyticsProvider = new VideoAnalyticsProvider(videoplayer);
            
        // Export AppMeasurement s_omni Object & Track PageView
        window.s_omni = analyticsProvider._mediaHeartbeat.appMeasurement;
        s_omni.debugTracking = true;
        s_omni.contextData = Configuration.CONTEXTDATA;
        s_omni.track();
        // --- end VHL integration ---
        
        // bind them together
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.log("video and hls.js are now bound together !");
            hls.loadSource("http://nhkxmtest-i.akamaihd.net/hls/live/232378/hlstest02/playlist.m3u8");
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("manifest loaded, found " + data.levels.length + " quality level");
            video.play(); 
        });
    }
})();