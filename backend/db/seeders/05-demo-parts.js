'use strict';

const { Part } = require('@db/models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Part.bulkCreate([
      {
        sku: 'CAB-ETH-10FT',
        name: 'Ethernet Cable 10ft',
        description: 'Cat6 UTP',
        unit: 'ea',
        defaultPrice: 4.50,
        active: true
      },
      {
        sku: 'SW-24POE',
        name: 'PoE Switch 24 Ports',
        description: 'Gigabit PoE+',
        unit: 'ea',
        defaultPrice: 249.99,
        active: true
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Parts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Parts', {
      name: {
        [Op.in]: ["Printer Cartridge", "USB Cable", "Power Supply Unit", "RAM Module", "Microsoft Office 365 License", "Accounting Software License Key", "Power Cord", "Printer Drum Unit", "Replacement Hard Drive", "Keyboard and Mouse Set", "Microsoft Office USB Installer", "Laptop Battery", "Wireless Adapter", "Printer Paper", "Motherboard", "Graphics Card", "Replacement Fan", "Backup Battery", "Printer Toner", "Software Installation Disc"]
      }
    }, options);
  }
};
