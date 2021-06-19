(function () {
    /**
     * The naked domain name to be used for verification and loading
     * Change this to the production domain name
     */
    var MAIN_DOMAIN = 'http://example.com';

    var SessionManager = {
        GET_SESSION_ID: 'session-get',
        SET_SESSION_ID: 'session-set',

        init: function() {
            var self = this;
            //create iframe to load saving script
            var helperFrame = document.createElement('iframe');
            helperFrame.src = MAIN_DOMAIN + '/session/frame.html';
            helperFrame.id = 'helperFrame';
            helperFrame.style = 'display:none;';
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(helperFrame);

            helperFrame.addEventListener('load', () => {
                self.afterIframeLoad();
            });
        },

        afterIframeLoad: function () {
            var self = this;
            //request session id from naked domain
            var helperFrameWindow = helperFrame.contentWindow;
            helperFrameWindow.postMessage({
                sessionFn: 'get'
            }, MAIN_DOMAIN);

            // Capture incoming session from helper frame
            window.addEventListener('message', (event) => {
                //Security mechanism: if origin doesn't match, skip.
                //this is essential to ensure security
                if (event.origin !== MAIN_DOMAIN) {
                    return;
                }
                var sessionContext = event.data;
                //broadcast the session id
                window.dispatchEvent(
                    new CustomEvent(self.GET_SESSION_ID, {
                        detail: sessionContext,
                    })
                );
            });

            //capture session set events and set the session in naked domain
            window.addEventListener(self.SET_SESSION_ID, (event) => {
                var session = event.detail;
                helperFrameWindow.postMessage({
                    sessionFn: 'set',
                    customSessionKey: session
                }, MAIN_DOMAIN);
            });
        }
    }

    SessionManager.init();

})();