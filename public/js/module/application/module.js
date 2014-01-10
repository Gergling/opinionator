qh.setModule("application", {
	app: true,
	require: [
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
