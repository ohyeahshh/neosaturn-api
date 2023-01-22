const mongoose = require('mongoose')

const ImeiRecord = new mongoose.Schema(
	{
		tempId: {
			type: String,
			required: true	
		},
		imei: {
			type: String,
            required: true
		},
        createdOn: {
            type: String,
            required: true
        },
	
	},
	{ collection: 'inf-imei' }
)


const model = mongoose.model('ImeiRecord', ImeiRecord)
module.exports = model