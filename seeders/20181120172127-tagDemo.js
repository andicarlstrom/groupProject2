"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
      return queryInterface.bulkInsert("Tags", [{
        style: "New School",
        bodypart: "Forearm",
        createdAt : new Date(),
        updatedAt : new Date(),
        PictureId: 1
      }, {
        style: "Tribal",
        bodypart: "Chest",
        createdAt : new Date(),
        updatedAt : new Date(),
        PictureId: 2
      }], {});
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete("Tags", null, {});
  }
};
