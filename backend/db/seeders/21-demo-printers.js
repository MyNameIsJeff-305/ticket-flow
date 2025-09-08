'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Printer } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Printer.bulkCreate([
      {
        assessmentId: 1,
        iPAddress: '192.168.1.100',
        iPType: 'Static',
        brand: 'HP',
        model: 'LaserJet Pro M404dn',
        connection: 'Wired',
        location: 'Front Office'
      },
      {
        assessmentId: 1,
        iPAddress: '192.168.1.101',
        iPType: 'DHCP',
        brand: 'Canon',
        model: 'imageCLASS MF743Cdw',
        connection: 'Wireless',
        location: 'Meeting Room'
      },
      {
        assessmentId: 2,
        iPAddress: '192.168.1.102',
        iPType: 'Static',
        brand: 'Epson',
        model: 'EcoTank ET-4850',
        connection: 'Wired',
        location: 'Reception'
      },
      {
        assessmentId: 2,
        iPAddress: '192.168.1.103',
        iPType: 'DHCP',
        brand: 'Brother',
        model: 'HL-L2395DW',
        connection: 'Wireless',
        location: 'Accounting'
      },
      {
        assessmentId: 3,
        iPAddress: '192.168.1.104',
        iPType: 'Static',
        brand: 'Kyocera',
        model: 'ECOSYS P2040dn',
        connection: 'Wired',
        location: 'HR Department'
      },
      {
        assessmentId: 3,
        iPAddress: '192.168.1.105',
        iPType: 'DHCP',
        brand: 'Samsung',
        model: 'Xpress M2835DW',
        connection: 'Wireless',
        location: 'IT Room'
      },
      {
        assessmentId: 1,
        iPAddress: '192.168.1.106',
        iPType: 'Static',
        brand: 'Ricoh',
        model: 'SP C261DNw',
        connection: 'Wired',
        location: 'CEO Office'
      },
      {
        assessmentId: 2,
        iPAddress: '192.168.1.107',
        iPType: 'DHCP',
        brand: 'Lexmark',
        model: 'MC3326adwe',
        connection: 'Wireless',
        location: 'Conference Room'
      },
      {
        assessmentId: 3,
        iPAddress: '192.168.1.108',
        iPType: 'Static',
        brand: 'Dell',
        model: 'B2360dn',
        connection: 'Wired',
        location: 'Warehouse'
      },
      {
        assessmentId: 1,
        iPAddress: '192.168.1.109',
        iPType: 'DHCP',
        brand: 'Xerox',
        model: 'Phaser 6510',
        connection: 'Wireless',
        location: 'Design Studio'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Printers';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
