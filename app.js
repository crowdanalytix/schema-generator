var sg = require('./schema-generator');

// RUN
var filename = 'sample_data.json'
var arguments = process.argv.slice(2);
if (arguments.length > 0) {
	filename = arguments[0];
}

sg.readJson(filename, function(data) {
	if (data != undefined) {
		data = JSON.parse(data);
		fields = [];
		sg.csvTraverse(fields, data);
		sg.writeJsonSchema(JSON.stringify(fields));
	} else {
		console.log("Unable to read file " + filename);
	}
});
