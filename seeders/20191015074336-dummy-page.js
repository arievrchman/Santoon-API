'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'Pages',
      [
        {
          page: 1,
          image:
            'https://swebtoon-phinf.pstatic.net/20141216_300/14186577318388F1Hj_JPEG/14186577317869515.jpg',
          episodeId: 1,
        },
        {
          page: 2,
          image:
            'https://swebtoon-phinf.pstatic.net/20141216_297/1418657731844vhrIu_JPEG/14186577317939513.jpg',
          episodeId: 1,
        },
        {
          page: 3,
          image:
            'https://swebtoon-phinf.pstatic.net/20141216_199/1418657731838lN86V_JPEG/14186577317859517.jpg',
          episodeId: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Pages', null, {});
  },
};
