chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	setCookie('tabId', tabId, 365);

	if (changeInfo.status == 'complete' && getCookie('enabled') == '1') {
		var fb_url = 'https://www.facebook.com/';
			fb_url1 = 'http://www.facebook.com/';

		if (tab.url.search(fb_url) == 0 || tab.url.search(fb_url) == 0)
		{
			chrome.tabs.executeScript(
			null, {
				file: 'scripts/content_script_v2.0.5.js'
			});
		}
	}
});