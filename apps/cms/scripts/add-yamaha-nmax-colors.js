const { addScooterColors } = require('./add-scooter-colors');

async function main() {
  console.log('🎨 Adăugare culori pentru Yamaha NMAX 125 și NMAX 125 Tech Max\n');
  
  // Yamaha NMAX 125 - culori disponibile
  const nmaxColors = [
    {
      name: 'Midnight Black',
      code: 'midnight-black',
      hex: '#1a1a1a',
      listingImageFile: 'Yamaha-NMAX-125-blue.jpg', // folosim blue ca default pentru acum
      imageFile: 'Yamaha-NMAX-125-blue.jpg',
    },
    {
      name: 'Icon Blue',
      code: 'icon-blue',
      hex: '#2563eb',
      listingImageFile: 'Yamaha-NMAX-125-blue.jpg',
      imageFile: 'Yamaha-NMAX-125-blue.jpg',
    },
    // Când adaugi Yamaha-NMAX-125-Graphite.jpg, decomentează:
    // {
    //   name: 'Graphite',
    //   code: 'graphite',
    //   hex: '#4a5568',
    //   listingImageFile: 'Yamaha-NMAX-125-Graphite.jpg',
    //   imageFile: 'Yamaha-NMAX-125-Graphite.jpg',
    // },
  ];
  
  // Yamaha NMAX 125 Tech Max - culori disponibile
  const nmaxTechMaxColors = [
    {
      name: 'Tech Kamo Grey',
      code: 'tech-kamo-grey',
      hex: '#6b7280',
      listingImageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg',
      imageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg',
    },
    // Când adaugi Yamaha-NMAX-125-tech-max-Graphite.jpg, decomentează:
    // {
    //   name: 'Tech Graphite',
    //   code: 'tech-graphite',
    //   hex: '#4a5568',
    //   listingImageFile: 'Yamaha-NMAX-125-tech-max-Graphite.jpg',
    //   imageFile: 'Yamaha-NMAX-125-tech-max-Graphite.jpg',
    // },
  ];
  
  try {
    // Adaugă culori pentru NMAX 125
    console.log('═══════════════════════════════════════════════════');
    console.log('📦 Yamaha NMAX 125');
    console.log('═══════════════════════════════════════════════════');
    await addScooterColors('yamaha-nmax-125', nmaxColors);
    
    console.log('\n\n');
    
    // Adaugă culori pentru NMAX 125 Tech Max
    console.log('═══════════════════════════════════════════════════');
    console.log('📦 Yamaha NMAX 125 Tech Max');
    console.log('═══════════════════════════════════════════════════');
    await addScooterColors('yamaha-nmax-125-tech-max', nmaxTechMaxColors);
    
    console.log('\n\n🎉 Toate culorile au fost adăugate cu succes!');
    
  } catch (err) {
    console.error('\n❌ Eroare fatală:', err);
    process.exit(1);
  }
}

main();

