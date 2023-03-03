const {Schema, model} = require('mongoose');

const refreshTokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
     createdAt: { type: Date, expires: 86400, default: Date.now }
})

module.exports = model('refreshToken', refreshTokenSchema);