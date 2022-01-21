const Category = require("./../model/Category.js");
const slugify = require("slugify");
const mongoose = require("mongoose");

//get all Categories
exports.getCategories = async (req , res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            result: categories , 
        }) 
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//add category
exports.addCategory = async(req , res) => {
    try {
        const body = req.body;
        console.log("test" , body)

        //creat user slug
        body.slug = slugify(body.name)

        //create post
        const newCategory = new Category(body);
        let category = await newCategory.save();

        //api response
        res.status(201).json({
            message: "category is added",
            result: category
        })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}