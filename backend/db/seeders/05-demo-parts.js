'use strict';

const { Part } = require('../models');

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
        brand: 'NetGear',
        model: 'NC6-10',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/EthernetCableGreen.jpg',
        unit: 'ea',
        defaultPrice: 4.50,
        active: true
      },
      {
        sku: 'SW-24POE',
        name: 'PoE Switch 24 Ports',
        brand: 'Cisco',
        model: 'SG250-26HP',
        description: 'Gigabit PoE+',
        unit: 'ea',
        defaultPrice: 249.99,
        active: true
      },
      {
        sku: "UDM-Pro",
        name: "Ubiquiti Dream Machine Pro",
        description: "All-in-one network appliance",
        brand: "Ubiquiti",
        model: "UDM-Pro",
        imageUrl: "https://cdn11.bigcommerce.com/s-2bh7dp4k3r/images/stencil/1280x1280/products/8313/23624/UDM-PRO-MAX_003__14746.1750190684.jpg",
        unit: "unit",
        active: false
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
