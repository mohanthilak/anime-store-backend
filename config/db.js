const {connect} = require('mongoose');
const {DB_URL} = require('./EnvVars')

const connectDB = async () =>{
    try{
        await connect(DB_URL)
    }catch(e){
        console.log('Error while connecting to the DB:', e);
        process.exit(1);
    }
}


module.exports = {connectDB};