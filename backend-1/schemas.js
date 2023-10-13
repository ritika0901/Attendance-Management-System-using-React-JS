const mongoose = require("mongoose");
const { Int32 } = require("mongodb");


export const FaculSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    course:{
        type:String,
        required:true
    },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	}
});
export const staccSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},

    rno:{
        type:String,
        required:true,
        unique: true,
    }
});
export const stdSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rno: {
		type: String,
		required: true,
		unique: true,
	},
	course1: {
		type: String,
		required: true,
	},
    attend1: {
		type: Int32,
		required: true,
	},
    course2: {
		type: String,
		required: true,
	},
    attend2: {
		type: Int32,
		required: true,
	},
    course3: {
		type: String,
		required: true,
	},
    attend3: {
		type: Int32,
		required: true,
	}
});

