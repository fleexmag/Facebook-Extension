chrome.webNavigation.onCompleted.addListener(function(e) {
	chrome.tabs.getSelected(null, function(tab) {
		//if extension is enabled and we are on facebook page, script will work
		storageGet('enabled', function(storage) {
			if (storage.enabled != '0') {
				if (tab.url.search('://www.facebook.com/') != 0)
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