//add event listener for page update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	//if extension is enabled and we are on facebook page, script will work
	if (changeInfo.status == 'complete' && getCookie('enabled') == '1') {
		var fb_url = 'https://www.facebook.com/';
			fb_url1 = 'http://www.facebook.com/';

		if (tab.url.search(fb_url) == 0 || tab.url.search(fb_url) == 0)
		{
			chrome.tabs.executeScript(
			null, {
				file: 'scripts/content_script_v2.1.0.js'
			});
		}
	}
});