const mongoose = require('mongoose')

const Permissions = new mongoose.Schema(
	{
		tempId: {
			type: String,
			required: true	
		},
		imei: {
			type: String,
			required: true	
		},
		isLocationGranted: {
			type: Boolean,
			required: true	
		},
		isReadSmsGranted: {
            type: Boolean,
			required: true	
		},
        isContactsGranted: {
            type: Boolean,
			required: true	
        },
		isCameraGranted: {
            type: Boolean,
			required: true	
        },
		isAudioGranted: {
            type: Boolean,
			required: true	
        },
        PP: {
            type: Boolean,
			required: true	
        },
        TNC: {
            type: Boolean,
			required: true	
        },
        createdOn: {
            type: String,
            required: true
        },

	
	},
	{ collection: 'inf-permissions' }
)


const model = mongoose.model('Permissions', Permissions)
module.exports = model