var fs = require('fs')
var sg = require('./schema-generator');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});

/* Generate Schema for a given JSON file */
var schema = {
	generate: function(filename) {
		sg.readJson(filename, function(data) {
			if (data != undefined) {
				data = JSON.parse(data);
				fields = [];
				sg.csvTraverse(fields, data); // Traverse through the Object to find the Schema
				sg.writeJsonSchema(JSON.stringify(fields)); // Write the Schema to a JSON file
			} else {
				console.log("Unable to read file " + filename);
			}
		});
	}
}

converter.on("end_parsed", function(JSONArr) {
	var sampleJSONArr = [],
			sampleOutputFile = 'sample_output.json';
	sampleJSONArr.push(JSONArr[0]); // Push the sample json to an array
	var stringifyJSON = JSON.stringify(sampleJSONArr);
	fs.writeFile(sampleOutputFile, stringifyJSON, 'utf8', function(err) {
		if (err) console.log(err);
		console.log('Sample JSON Generated =>',sampleOutputFile);
	});
	schema.generate(sampleOutputFile);
});

require('fs').createReadStream('dashboard_data.csv').pipe(converter);
