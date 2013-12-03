qh.setModule("application", {
	app: true,
	require: [
		"subject"
	],
	config: [
		"index"
	],
	controller: [
		"index",
		"list"
	],
	directive: [
		"dashboard-panel",
	],
});
