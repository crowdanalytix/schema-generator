var fs = require('fs');

exports.readJson = function (filename, callback) {
	fs.readFile(filename, 'utf8', function (err,data) {
	  if (err) {
		return callback(undefined);
	  }
	  callback(data);
	});
}

exports.writeJsonSchema = function (data) {
	fs.writeFile("schema.json", data, function(err) {
		if(err) {}
		console.log("The schema was saved to schema.json");
	});
}

exports.createField = function (type, name, mode) {
	if (mode) {
		return {
			name: name,
			type: type,
			mode: mode
		};
	}

	return {
		name: name,
		type: type
	};
}

exports.getType = function(value) {
  var str = value.toString(),
      strSplit = str.split('');
  if ( !isNaN(parseInt(str)) ) {
    if ( strSplit.indexOf('.') >= 0 ) {
      return 'float';
    } else {
      return 'integer';
    }
  } else {
    var strToLower = str.toLowerCase();
    if ( strToLower == 'true' || strToLower == 'false' ) {
      return 'boolean';
    } else {
      return 'string';
    }
  }
}

exports.csvTraverse = function (fields, o) {
  var obj = o[1],
      keys = Object.keys(obj);
  keys.forEach(function(key) {
    var name = key,
        value = obj[key],
        type = exports.getType(value);
    fields.push(exports.createField(type, name, 'required'));
  });
  return fields;
}

module.exorts = exports;
