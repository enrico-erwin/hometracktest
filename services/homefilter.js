/**
 * Helper function to determined if an object is a valid property object.
 * At the very minimum object should have type and workflow fields for filtering purposes and address field for
 * displaying result purposes
 *
 * @param {Object} item represents a property detail
 * @return {Boolean} returns true if supplied object has the necessary fields for filtering purposes, otherwise false
 */
function validPropertyObject(item){
	return item.workflow && item.type && item.address;
}

/**
 * Helper function to convert address fields to a single string in the following format:
 * [Optional: unitNumber] [buildingNumber] [street] [suburb] [state] [postcode]
 *
 * @param {Object} address representing address fields
 * @return {String} address details as a single string
 */
function concatAddress(address){
	var addressStr = address.buildingNumber + ' ' + address.street + ' ' + address.suburb + ' ' + address.state + ' ' + address.postcode;
	if(!!address.unitNumber) addressStr = address.unitNumber + ' ' + addressStr
	return addressStr;
}

/**
 * Service function to filter properties by type and workflow
 *
 * @param {Array} data represents array containing all properties details
 * @param {Object} type of property to be filtered
 * @param {Object} workflow status of property to be filtered
 * @return {Array} filtered properties in array is transformed to only contain address, type, and workflow
*/
exports.filterByTypeAndWorkflow = function(data, type, workflow) {
	var result = []

	data.forEach(function(item){
		if(validPropertyObject(item) && item.workflow ===  workflow && item.type === type){
			result.push({
				'concataddress': concatAddress(item.address),
				'type': item.type,
				'workflow': item.workflow
			})
		}
	})

	return result;
}
