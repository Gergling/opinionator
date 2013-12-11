qh.setModule("application", {
	app: true,
	require: [
		"subject",
		"util"
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
