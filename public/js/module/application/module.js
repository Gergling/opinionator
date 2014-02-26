qh.setModule("application", {
	app: true,
	require: [
		"collection",
		"subject",
		"sort-filter",
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
