const Product = require('../models/Product');



//get all products
module.exports.product = async function(req, res){

    try {
        //fetch all product
        let product = await Product.find({});

        //return status and product
        res.status(200).json({ product});
        
    } 
    catch (error) {
        //if error are occured
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
   
}

//add new product
module.exports.create = async function (req, res) {

    try {

        //scarching product name in database 
        let product = await Product.findOne({ name: req.body.name })

        //if product name are find 
        if (product) {
            return res.status(400).json({ errors: 'this product are allready exist' });
        }

        //Creat a new Product
        product = await Product.create({
            name: req.body.name,
            quantity: req.body.quantity
        })  

        //return status and product
        return res.status(200).json({product });
    } catch (error) {
        //if error are occured
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}


//Delete product
module.exports.destroy = async function (req, res) {

    try {

        //scarching product id 
        let product = await Product.findById(req.params.id);

        //if the product are find
        if (product) {
            const query = { id: req.params.id };
            //delete product
            await product.deleteOne(query);
            
            //send status code and a message
            return res.status(200).json({message: 'product deleted'});
           
        } else {
            //if the product are not find
            return res.status(404).json({ errors: 'not found' });
        }

    } catch (error) {
        //if  any error are occured
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}


//Update Product
module.exports.update = async function (req, res) {

    try {
        //destructure 
        const {quantity } = req.body;
        //find product with the help of id of product
        let product = await Product.findById(req.params.id).select("-name ");
        //if the product are not found
        if (!product) { return res.status(404).send("Not Found") }

        // Create a newProduct object    
        const newProduct = {};
        if (quantity) { newProduct.quantity = quantity };
        
        //update product
        product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })

        //send status and a message when update are done
        res.status(200).json({ product,message: 'updated successfully' });
        
    } catch (err) {
        //if any kind of error are occoured
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}