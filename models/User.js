const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		customerId: {
			type: String,
			required: true
		},
		firstName: {
			type: String,
			required: true,
            trim: true
		},
		middleName: {
			type: String,
            trim: true
		},
		lastName: {
			type: String,
            trim: true
		},
		email: { 
			type: String, 
			required: true, 
			unique: true,
            lowercase: true
          
		},
		phone: { 
			type: String, 
			required: true, 
			unique: true 
		},
        fatherName: {
            type: String, 
			required: true
        },
        dob: {
            type: String, 
            required: true
        },
        createdOn: {
            type: String,
            required: true
        },
		location: {
			type: String,
            required: true
		},
		imei: {
			type: String,
            required: true
		},

		 tempId:{
			type: String,
            required: true
		},
        tokens: [{
            token:{
                type: String,
                required: true
            }
        }]
		
		
	},
	{ collection: 'inf-users' }
)


const model = mongoose.model('UserData', User)
module.exports = model