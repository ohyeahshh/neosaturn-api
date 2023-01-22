const mongoose = require('mongoose')

const Kyc = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true	
		},
		aadhaarNo: {
			type: String,
			required: true	
		},
		front: {
            type: String,
            required: true	
		},
        back: {
            type: String,
            required: true	
		},
	
	
	},
	{ collection: 'inf-kyc' }
)


const model = mongoose.model('Kyc', Kyc)
module.exports = model