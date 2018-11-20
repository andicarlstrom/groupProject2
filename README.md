# Tatu App

# Overview
The Tatu app is an app that is designed for people who are looking for particular tattoo styles or characters and to find tattoo artists who meet those criteria; and by tattoo artist who want to promote their work and gain clients.

## Customer Usage
The app requires users to create an account or login to their existing account to start with. If they are a customer, they are presented with a landing page that displays categories of tattoos and a search field/form that allows them to search for photos that match those criteria after signup/login.

## Tattoo Artist Usage
Tattoo artists must create an account that contain their information (Location Name and Address, Pricing Structure, Style Specialization) and can upload photos of their work. For each photo they assign tags describing it (this is how photos will appear in cusotmer's searches).

## Functionality Included in MVP
    * Account Creation for both customers and tattoo artists (personas)
    * Required login for both personas
    * Database Creation including posting and retrieving information
    * Customer Landing page will include categories of images (as a default) and an option to search by photo tags (i.e. style, body location, ###need more here###).
    * Artist Profile page will show their first and last name, location name and address, and pricing structure. There will be a button to select to add photos
    * Add photo form will include a photo upload button, fields to enter or select description, style, body location, etc
    * Log out button once logged in

## Future Functionality

    * Log out button
    * Allow customers to save images to a gallery for future reference
    * Connect customers and artist via IM or email in the app
    * Allow users to make appointments with artists and to make payments via the app (artists would be able to keep track of all of their appointments)
    * Validate the artist's address and include a map of the artists location in their profile and filter customer's searches by closeness
    * ### What else? ###

## Technology Used and Architecture
* Handlebars
* Materialize (CSS) and Google Fonts
* Node.js and Express
* Express Sessions (user authentication)
* Sequelize and MySQL (Database and Architecture)
* GitHub (Repository and Version Control)
* Heroku and Jaws DB (Deployment)

## Team Roles, Responsiblities & Contact Info
* Frontend (Andi Carlstrom, Jacob Morris, Chancy Leath)
    * Andi Carlstrom (andi.carlstrom@gmail.com): Artist Profile Page and Photo Upload Form
    * Jacob Morris (jacobthomasmorris@gmail.com): Customer Landing/Search Page and Results
    * Chancy Leath (chancyleath@hotmail.com): Initial Login Page and Account Creation form, Overall CSS

* Backend (Jonathan Pena and Mitch Waite)
    * Jonathan Pena (penajtokyorm@gmail.com): Database and Models creation, Authorization Routes
    * Mitch Waite (mitchtwaite@gmail.com): HTML and API Routes

## Credits
* Page background image PNGtree.com