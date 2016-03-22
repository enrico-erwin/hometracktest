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

exports.filterByTypeAndWorkflow = function(req, res) {
	var data = req.body.payload
	var type = req.params.type || 'htv'
	var workflow = req.params.workflow || 'completed'
	var result = {
		response: []
	}

	if(data){
		data.forEach(function(item){
			if(validPropertyObject(item) && item.workflow ===  workflow && item.type === type){
				result.response.push({
					'concataddress': concatAddress(item.address),
					'type': item.type,
					'workflow': item.workflow
				})
			}
		})

		res.send(result)
	}
	else{
		res.status(400)
		res.send({ error: 'Could not decode request: JSON parsing failed' })
	}

}