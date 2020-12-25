const onClick = () => (_, tab) => chrome.tabs.sendMessage(tab.id, '');

const parent = chrome.contextMenus.create({
	title : 'DRMaker',
	type : 'normal',
	contexts : ['all'],
	id: 'parent_id',
	onclick : onClick()
});
