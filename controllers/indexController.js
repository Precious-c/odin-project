const validator = require("validator");
const multer = require("multer")
// const Categories = require("../models/categoryModel");
const Category = require("../models/categoryModel")
const Item = require("../models/ItemModel")


module.exports = {
    getIndex: async (req, res) => {
        const categories = await Category.find()
        const items = await Item.find()
        // console.log(categories)
        // console.log(items)
        res.render('index', { title: 'Inventory Manager', categories: categories, items: items });
        res.status(200)
    },
    getNewCategory: async (req, res) => {
        const categories = await Category.find()
        res.render('newEntry', { categories: categories });
    },
    addCategory: async (req, res) => {
        console.log(req.body)
        try{
            await Category.create({
                categoryName: req.body.categoryName,
                categoryDescription: req.body.categoryDescription,
                noOfItems: 0,
            })
            console.log(`${req.body.categoryName} have been added`)
            res.redirect("/new-category")
        } catch (err) {
            console.log(err)
        }
    },
    removeCategory: async (req, res) => {
        const categoryName = req.body.categoryName
        await Category.findOneAndDelete({categoryName: req.body.categoryName})
        console.log(categoryName + ' deleted')
        res.json("Deleted Successully")
        // res.redirect('/new-category')
    },

    getOneItem: async (req, res) => {
        const item = await Item.findOne({_id: req.params.id})
        res.render("item", {title: item.itemName, item: item, messages: req.flash('message')})
    }, 

    getItems: async (req, res) => {
        const categories = await Category.find()
        res.render('addItem', { categories: categories});
    },

    addItem: async(req, res) => {
        console.log(req.body)
        try{
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            await Item.create({
                itemName: req.body.itemName,
                itemDescription: req.body.itemDescription,
                itemPrice: req.body.itemPrice,
                numberInStock: req.body.noOfItems,
                category: req.body.category,
                image: req.file
            })
            await Category.findOneAndUpdate({categoryName: req.body.category}, {
                $inc: {
                    noOfItems: req.body.noOfItems
                }
            })
            res.redirect('./')
            // res.status(200).send('Image uploaded and saved successfully.')
            // console.log(req.body)
            // console.log(req.file)
        } catch(err) {
            console.log(err)
        }
    },

    removeItem: async (req, res) => {
        try{
            const item = await Item.findOne({_id: req.params.id})
            await Category.findOneAndUpdate({categoryName: item.category}, {
                $inc: {
                    noOfItems: -item.numberInStock
                }
            })
            await Item.findOneAndDelete({_id: req.params.id})
            // res.redirect("/")
            res.json("Deleted Successully")
        } catch (err){
            console.log(err)
        }
    },

    removeOne: async(req, res) => {
        try{
            const item = await Item.findOne({_id:req.params.id})
            console.log(item.numberInStock)
            if(item.numberInStock){
                console.log("Reducing")
                await Category.findOneAndUpdate({categoryName: item.category}, {
                    $max: { 
                        noOfItems: 0 
                    },
                    $inc: {
                        noOfItems: -1
                    }
                }) 
                await Item.findOneAndUpdate({_id: req.params.id}, {
                    $inc: {
                        numberInStock: -1
                    }
                })
                console.log(item.numberInStock)
                res.json('Success')
            } 
            req.flash('message', `${item.numberInStock} ${item.itemName} left. Cannot reduce further`);
            res.json(`${item.numberInStock} left. Cannot reduce further`)
            
            // res.redirect(`/item/:${req.params.id}`)
            console.log(`${item.numberInStock} left. Cannot reduce further`)
        } catch (err){
            console.log(err)
        }
    },

    addOne: async(req, res) => {
        try{
            const item = await Item.findOne({_id:req.params.id})
            if(item.numberInStock){
                console.log("Increasing")
                await Category.findOneAndUpdate({categoryName: item.category}, {
                    $max: { 
                        noOfItems: 0 
                    },
                    $inc: {
                        noOfItems: -1
                    }
                }) 
                await Item.findOneAndUpdate({_id: req.params.id}, {
                    $inc: {
                        numberInStock: -1
                    }
                })
                console.log(item.numberInStock)
                res.json('Success')
            } 
            req.flash('message', `${item.numberInStock} ${item.itemName} left. Cannot reduce further`);
            res.json(`${item.numberInStock} left. Cannot reduce further`)
            
            // res.redirect(`/item/:${req.params.id}`)
            console.log(`${item.numberInStock} left. Cannot reduce further`)
        } catch (err){
            console.log(err)
        }
    }
   
}