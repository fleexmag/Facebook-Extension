chrome.webNavigation.onCompleted.addListener(function(e) {
	//add event listener for page update
	chrome.tabs.getSelected(null, function(tab) {
		//if extension is enabled and we are on facebook page, script will work
		if (getCookie('enabled') == '1') {
			var fb_url = 'https://www.facebook.com/';
				fb_url1 = 'http://www.facebook.com/';
			if (tab.url.search(fb_url) == 0 || tab.url.search(fb_url) == 0)
			{
				chrome.tabs.executeScript(
				tab.id, {
					file: 'scripts/content_script_v'+chrome.app.getDetails().version+'.js'
				});
			}
		}
	});
});