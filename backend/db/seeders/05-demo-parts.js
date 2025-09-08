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
        "name": "Ethernet Cable",
        "description": "Cat6 Ethernet cable for network connectivity",
        "ticketId": 1,
        "imageUrl": "https://media.startech.com/cms/products/gallery_large/n6patcxmbl.main.jpg"
      },
      {
        "name": "Network Switch",
        "description": "5-port Gigabit Network Switch for office network",
        "ticketId": 1,
        "imageUrl": "https://intellinetsolutions.com/cdn/shop/products/24-port-gigabit-ethernet-switch-561273-1_11790351-cb3d-41e5-b877-6424af02441c.jpg"
      },
      {
        "name": "Solid State Drive (SSD)",
        "description": "500GB SSD for performance improvement",
        "ticketId": 2,
        "imageUrl": "https://i5.walmartimages.com/seo/WD-Blue-2-5-Inch-3D-NAND-SATA-SSD-500GB-WDBNCE5000PNC-WRSN_48196402-2f69-45b8-97f0-5f5f486e8801.1a509058826f46b18c7340a2d5902cbc.jpeg"
      },
      {
        "name": "Memory Upgrade",
        "description": "16GB DDR4 RAM for desktop",
        "ticketId": 2,
        "imageUrl": "https://m.media-amazon.com/images/I/51L+S7mtXdL.jpg"
      },
      {
        "name": "Outlook Setup Guide",
        "description": "Guide to set up Outlook for email configuration",
        "ticketId": 3,
        "imageUrl": "https://cirasync.com/wp-content/uploads/2022/09/Add-an-email-account-to-outlook.jpg"
      },
      {
        "name": "USB Keyboard",
        "description": "Replacement USB keyboard for desktop",
        "ticketId": 4,
        "imageUrl": "https://m.media-amazon.com/images/I/81d+kcI8ZdL.jpg"
      },
      {
        "name": "Phone Adapter",
        "description": "VoIP phone adapter for office phone system",
        "ticketId": 5,
        "imageUrl": "https://m.media-amazon.com/images/I/61R1UCFSRKL.jpg"
      },
      {
        "name": "Printer Roller",
        "description": "Replacement roller for printer to fix jamming issue",
        "ticketId": 6,
        "imageUrl": "https://m.media-amazon.com/images/I/31xD-HL-qLL._AC_UF894,1000_QL80_.jpg"
      },
      {
        "name": "Monitor Power Cable",
        "description": "Replacement power cable for monitor",
        "ticketId": 7,
        "imageUrl": "https://m.media-amazon.com/images/I/81Gi0Xr7fEL.jpg"
      },
      {
        "name": "Wi-Fi Range Extender",
        "description": "Dual-band Wi-Fi range extender for better coverage",
        "ticketId": 8,
        "imageUrl": "https://cdn1.bigcommerce.com/server700/90ebe/products/544/images/2452/WiFi-Extender__52615.1658499807.1280.1280.jpg"
      },
      {
        "name": "CPU Cooler",
        "description": "Replacement CPU cooler for desktop to prevent freezing",
        "ticketId": 9,
        "imageUrl": "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Custom-Cooling/CW-9060065-WW/iCUE-H100x-RGB-ELITE-Liquid-CPU-Cooler-0.webp"
      },
      {
        "name": "Software Installation Disc",
        "description": "Software installation disc for the latest update",
        "ticketId": 10,
        "imageUrl": "https://archive.org/download/ATIDriverInstallationCDSoftwareVersion7032004/CD%20Front.jpg"
      },
      {
        "name": "Wireless Mouse",
        "description": "Logitech wireless mouse for computer use",
        "ticketId": 2,
        "imageUrl": "https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502x-lightspeed/gallery/g502x-lightspeed-gallery-1-black.png"
      },
      {
        "name": "External Hard Drive",
        "description": "1TB external hard drive for backups",
        "ticketId": 9,
        "imageUrl": "https://m.media-amazon.com/images/I/71eBuhkDs0L.jpg"
      },
      {
        "name": "Office Headset",
        "description": "Noise-canceling headset for office phone systems",
        "ticketId": 5,
        "imageUrl": "https://m.media-amazon.com/images/I/61FR3JgJ0EL._AC_UF894,1000_QL80_.jpg"
      },
      {
        "name": "Wireless Router",
        "description": "Dual-band wireless router for improved network connectivity",
        "ticketId": 8,
        "imageUrl": "https://m.media-amazon.com/images/I/51ge3tjw5uL.jpg"
      },
      {
        "name": "Ink Cartridge",
        "description": "Black ink cartridge for HP printer",
        "ticketId": 6,
        "imageUrl": "https://i5.walmartimages.com/seo/Canon-CL-244-Color-Ink-Cartridge-Compatible-to-iP2820-MG2420-MG2924-MG492-MG3020-MG2525-TS3120-TS202-TR4520-and-TR4522_314c6639-66a0-4fac-8dc3-6aa79b4a7f93.1e632f353948b307cde7cb9563aedc6b.jpeg"
      },
      {
        "name": "Surge Protector",
        "description": "6-outlet surge protector for computer systems",
        "ticketId": 9,
        "imageUrl": "https://m.media-amazon.com/images/I/51G1QOC7WoL.jpg"
      },
      {
        "name": "USB Flash Drive",
        "description": "64GB USB flash drive for data transfer",
        "ticketId": 3,
        "imageUrl": "https://www.westerndigital.com/content/dam/store/en-us/assets/products/usb-flash-drives/cruzer-glide-usb-2-0/gallery/cruzer-glide-usb-2-0-angle-open2.png.thumb.1280.1280.png"
      },
      {
        "name": "HDMI Cable",
        "description": "6ft HDMI cable for monitor connection",
        "ticketId": 7,
        "imageUrl": "https://m.media-amazon.com/images/I/61RXLDFWz1L.jpg"
      },
      {
        "name": "Backup Power Supply",
        "description": "Uninterruptible Power Supply (UPS) for network devices",
        "ticketId": 1,
        "imageUrl": "https://i5.walmartimages.com.mx/mg/gm/3pp/asr/ebf7d5d3-9b04-4885-9eb3-160a4681e5d2.471379173e77c206d2cea3d05e307309.jpeg"
      },
      {
        "name": "CPU Thermal Paste",
        "description": "Thermal paste for CPU heat dissipation",
        "ticketId": 9,
        "imageUrl": "https://www.dateks.lv/images/pic/1200/1200/647/547.jpg"
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
