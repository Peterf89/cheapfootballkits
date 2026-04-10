const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const sources = require('../config/sources.json');

async function fetchShirtListings() {
    try {
        const {data} = await axios.get(sources.classicfootballshirts);
        const $ = cheerio.load(data);
        const shirts = [];

        $('selector_for_shirt_listings').each((index, element) => { // Ensure to replace 'selector_for_shirt_listings' with actual selector
            const name = $(element).find('selector_for_shirt_name').text(); // Replace with actual selector
            const price = $(element).find('selector_for_shirt_price').text(); // Replace with actual selector
            const image = $(element).find('selector_for_shirt_image').attr('src'); // Replace with actual selector
            const link = $(element).find('selector_for_product_link').attr('href'); // Replace with actual selector

            shirts.push({ name, price, image, link });
        });

        fs.writeFileSync(path.join(__dirname, '../data/shirts.json'), JSON.stringify(shirts, null, 2));
        console.log('Shirt listings fetched and saved successfully!');
    } catch (error) {
        console.error('Error fetching shirt listings:', error);
    }
}

fetchShirtListings();