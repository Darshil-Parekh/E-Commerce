# DARVE E-Commerce

DARVE is a luxury lifestyle e-commerce website for watches, fragrances, and refined everyday essentials. The site presents a dark, gold-accented shopping experience focused on timeless design and personal style.

## Live Website

Visit the deployed site: [DARVE E-Commerce](https://darshil-parekh.github.io/E-Commerce/)

## Features

- Responsive navigation with Home, About, Products, and Contact links
- Hero section introducing the DARVE brand
- About section explaining the DARVE experience
- Product collection with watches and fragrances
- Category filters for all products, perfumes, and watches
- Product cards generated from the `products.json` catalog
- Product images, descriptions, prices, and Add to Cart actions
- Shopping cart with item quantities and a running cart count
- Cart data saved in the browser with `localStorage`
- Admin login and protected product management panel
- Admin tools to add, edit, delete, and filter products
- Product changes saved in the browser with `localStorage`
- Responsive layout for desktop, tablet, and mobile screens
- Shared dark luxury background with gold visual accents
- Footer with quick links, collection links, customer service, contact details, and newsletter signup
- DARVE page title and browser favicon using the brand logo

## How It Works

1. Open the live website and start on the hero section.
2. Use the navigation links to move between the Home, About, Products, and Contact areas.
3. Read about the DARVE philosophy in the About section.
4. Open the Products section and choose a category filter:
   - **All** shows the complete collection.
   - **Perfumes** shows fragrance products.
   - **Watches** shows watch products.
5. Review each product's image, category, description, and price.
6. Select **Add to Cart** to save the product in the browser cart.
7. Open the cart to review selected products, quantities, and the total.
8. Use the footer links to explore the collection, customer service information, and contact options.

## Product Management

The project includes a separate admin workflow:

1. Open `admin-login.html`.
2. Sign in to access the protected `admin.html` product panel.
3. Add new products or edit and delete existing products.
4. Filter the admin product list by category.
5. Changes are stored in browser `localStorage` and are used by the storefront during that browser session.

The admin interface is intended for this static demonstration project. It does not use a server-side database or production authentication.

## Product Collection

The current collection includes:

- DARVE Elan
- DARVE Noir
- DARVE Eclat
- DARVE Noir Essence
- DARVE Aureus
- DARVE Imperial

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- JSON product data
- Browser `localStorage` for cart and admin catalog state
- GitHub Pages

## Project Structure

- `index.html` - storefront homepage
- `cart.html` - shopping cart page
- `products.json` - default product catalog
- `admin-login.html` - admin authentication page
- `admin.html` - product management panel
- `style.css` - storefront styling
- `admin.css` - admin and cart styling
- `js/products.js` - product loading, filtering, and rendering
- `js/cart.js` - cart state and item counts
- `js/cart-page.js` - cart page rendering and totals
- `js/admin.js` - admin product management
- `js/admin-auth.js` - admin session handling
- `Images/` - product and brand image assets

## Run Locally

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.

Product and branding images are stored in the `Images` directory. Keep the directory name and filenames' capitalization unchanged because GitHub Pages uses a case-sensitive file system. Product image paths in `products.json` must match the tracked filenames exactly.
