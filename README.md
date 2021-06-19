# Cross Domain Session Management
This snippet gives a way to bypass restrictions on cross domain browser sessions. By using main domain's local storage to save session key, any other domain can include the javascript file in the html and the script will make sure the session is saved on the main domain. Hence giving any of the scripts running on the other domains access to single session saved in the main domain.

## Installation Instructions
Note: Domain names are specifically hardcoded in files to prevent security issues when communicating between domains.
- Add base domain name in `session.js` file's variable `var MAIN_DOMAIN = 'http://example.com';`. Change example.com with your main domain name
- Add all the supported domain & subdomains to the array variable listed in `frame.html`. `var allowedDomains = ['http://example.com', 'http://sub.example.com'];`
- Upload `session` folder to the root of the web server so they are loaded via the URL http://example.com/session/frame.html
- Add following Javascript to all the domains that need access to the session ID.
>
    <script type="text/javascript" src="http://example.com/session/session.js"></script>

## Testing
- `staging` folder contains an example of including the javascript file and examples for getting and setting session.