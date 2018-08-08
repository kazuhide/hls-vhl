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

    // Export symbols.
    window.Configuration = {
        PLAYER: {
            NAME: '[hls] hls.js sample player',
            VIDEO_ID: '[hls] test live content id',
            VIDEO_NAME: '[hls] test live content name'
        },

        VISITOR: {
            MARKETING_CLOUD_ORG_ID: '4B6240445A96B71D0A495E81@AdobeOrg',
            TRACKING_SERVER: 'kayamamo.sc.omtrdc.net'
        },

        APP_MEASUREMENT: {
            RSID: 'akyhlsdev',
            TRACKING_SERVER: 'kayamamo.sc.omtrdc.net',
            PAGE_NAME: '[hls] Sample Page Name'
        },

        HEARTBEAT: {
            TRACKING_SERVER: 'kayamamo.hb.omtrdc.net',
            PUBLISHER: '4B6240445A96B71D0A495E81@AdobeOrg',
            CHANNEL: '[hlstest]',
            OVP: '',
            SDK: 'HLS VHL2 Sample Player v1.0'
        },
        CONTEXTDATA: {
          pr_container01: 'D="[hls-test]"+t',
          pr_container02: 'D="[hls-test]"+g',
          pr_container03: 'D="[hls-test]"+User-Agent',
          ev_container01: 'D="[hls-test]"+t',
          ev_container02: 'D="[hls-test]"+g',
          ev_container03: 'D="[hls-test]"+User-Agent'
        }
    };
})();
