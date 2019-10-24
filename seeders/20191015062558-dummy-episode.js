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
      'Episodes',
      [
        {
          title: 'Ep. 0',
          image:
            'https://swebtoon-phinf.pstatic.net/20140617_248/1403004901360ABk5x_JPEG/tower_000.jpg',
          santoonId: 1,
        },
        {
          title: 'Ep. 1',
          image:
            'https://swebtoon-phinf.pstatic.net/20140617_295/14030049099507m9Vb_JPEG/tower_001.jpg',
          santoonId: 1,
        },
        {
          title: 'Ep. 2',
          image:
            'https://swebtoon-phinf.pstatic.net/20140617_195/1403005037123dyxtJ_JPEG/tower_002.jpg',
          santoonId: 1,
        },
        {
          title: 'Ep. 3',
          image:
            'https://swebtoon-phinf.pstatic.net/20140617_88/14030050556140gStl_JPEG/tower_003.jpg',
          santoonId: 1,
        },
        {
          title: 'Ep. 4',
          image:
            'https://swebtoon-phinf.pstatic.net/20140624_20/1403594533030vO6x0_JPEG/tower_004.jpg',
          santoonId: 1,
        },
        {
          title: 'Ep. 5',
          image:
            'https://swebtoon-phinf.pstatic.net/20140624_287/1403594512878SRgVE_JPEG/tower_005.jpg',
          santoonId: 1,
        },
        {
          title: 'Ep. 6',
          image:
            'https://swebtoon-phinf.pstatic.net/20140624_211/1403594500229fVS8d_JPEG/tower_006.jpg',
          santoonId: 1,
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
    return queryInterface.bulkDelete('Episodes', null, {});
  },
};
