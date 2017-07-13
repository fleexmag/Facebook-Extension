chrome.webNavigation.onCompleted.addListener(function(e) {
	chrome.tabs.getSelected(null, function(tab) {
		//if extension is enabled and we are on facebook page, script will work
		storageGet('enabled', function(storage) {
			if (storage.enabled != '0') {
				var fb_url = ['https://www.facebook.com/', 'http://www.facebook.com/'];
				if (tab.url.search(fb_url[0]) == 0 || tab.url.search(fb_url[1]) == 0)
				{
					chrome.tabs.executeScript(
					tab.id, {
						file: 'js/content_script_v'+chrome.app.getDetails().version+'.js'
					});
				}
			}
		});
	});
});