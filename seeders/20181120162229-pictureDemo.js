"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
      return queryInterface.bulkInsert('Picture', [{
        file: "https://i.ytimg.com/vi/Iu1IsdIbC7M/hqdefault.jpg",
        description: "Peacock feather",
        createdAt : new Date(),
        updatedAt : new Date(),
        ArtistId: 1
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete("Picture", null, {});
  }
};
