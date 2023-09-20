const mongoose = require("mongoose");
const url = process.env.MongodbUrl

const studentShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'email is required '],
        unique: [true, 'email is already exit !']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    }
});

const studentModel = mongoose.model('allStudent', studentShema);

const main = async () => {
    try {
        await mongoose.connect(url);
        console.log(`Mongodb is connect`.bgWhite.black);
    } catch (error) {
        console.log('there is one error in | db');
    }
}
main();

module.exports = studentModel;

