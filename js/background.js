chrome.webNavigation.onCompleted.addListener(function(e) {
	chrome.tabs.getSelected(null, function(tab) {
		//if extension is enabled and we are on facebook page, script will work
		if (getCookie('enabled') != '0') {
			var fb_url = 'https://www.facebook.com/';
				fb_url1 = 'http://www.facebook.com/';
			if (tab.url.search(fb_url) == 0 || tab.url.search(fb_url1) == 0)
			{
				chrome.tabs.executeScript(
				tab.id, {
					file: 'js/content_script_v'+chrome.app.getDetails().version+'.js'
				});
			}
		}
	});
});