const express = require('express');
const ShopModel = require('../models/Shop');

const router = express.Router();

// @route   POST /api/shops
// @desc    Create a new shop
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newShop = new ShopModel({
            name: req.body.name,
            age: req.body.age,
            image: req.body.image,
            city: req.body.city,
        });

        const savedShop = await newShop.save();
        res.status(201).json(savedShop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   GET /api/shops
// @desc    Get all shops
// @access  Public

// router.get('/', async (req, res) => {
//     try {
//         const shops = await ShopModel.find();
//         res.status(200).json(shops);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

//pagination added

// src/routes/shop.routes.js

//const ITEMS_PER_PAGE = 5;

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const skip = (page - 1) * ITEMS_PER_PAGE;

//     const totalShops = await ShopModel.countDocuments();
//     const shops = await ShopModel.find()
//       .skip(skip)
//       .limit(ITEMS_PER_PAGE);

//     res.status(200).json({
//       shops,
//       totalPages: Math.ceil(totalShops / ITEMS_PER_PAGE),
//       currentPage: page,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });














//search added
// const ITEMS_PER_PAGE = 5;

// router.get('/', async (req, res) => {
//     try {
//         const { page = 1, limit = 5, search = '' } = req.query;
//         const query = search ? { name: { $regex: search, $options: 'i' } } : {};
//         const shops = await ShopModel.find(query)
//             .skip((page - 1) * limit)
//             .limit(Number(limit));
//         const totalShops = await ShopModel.countDocuments(query);
//         res.status(200).json({
//             shops,
//             totalPages: Math.ceil(totalShops / limit),
//             currentPage: Number(page),
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });


//shorting added

const ITEMS_PER_PAGE = 5;

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 5, search = '', sort = '',city='' } = req.query;

        // Build search query (if a search term exists)
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

          // Add city filter if a specific city is selected (exclude 'all')
          if (city && city !== 'all') {
            query.city = city; // Filter by city
        }

        // Build sorting criteria (if sort parameter exists)
        let sortCriteria = {};
        if (sort === 'asc') {
            sortCriteria = { age: 1 };  // Sort by age ascending
        } else if (sort === 'desc') {
            sortCriteria = { age: -1 }; // Sort by age descending
        }

        // Fetch shops with pagination, search, and sorting
        const shops = await ShopModel.find(query)
            .sort(sortCriteria)  // Apply sort criteria (if provided)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalShops = await ShopModel.countDocuments(query);
        
        res.status(200).json({
            shops,
            totalPages: Math.ceil(totalShops / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




// @route   GET /api/shops/:id
// @desc    Get a shop by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const shop = await ShopModel.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        res.status(200).json(shop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   PATCH /api/shops/:id
// @desc    Update a shop by ID
// @access  Public
router.patch('/:id', async (req, res) => {
    try {
        const updatedShop = await ShopModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedShop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json(updatedShop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/shops/:id
// @desc    Delete a shop by ID
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const deletedShop = await ShopModel.findByIdAndDelete(req.params.id);

        if (!deletedShop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json({ message: 'Shop deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
