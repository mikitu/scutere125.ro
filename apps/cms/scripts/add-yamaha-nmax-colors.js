const { addScooterColors } = require('./add-scooter-colors');

async function main() {
  console.log('🎨 Adăugare culori pentru Yamaha NMAX 125 și NMAX 125 Tech Max\n');
  
  // Yamaha NMAX 125 - culori disponibile (oficiale 2025 de pe site Yamaha)
  const nmaxColors = [
    {
      name: 'Icon Black',
      code: 'icon-black',
      hex: '#1a1a1a',
      listingImageFile: 'Yamaha-NMAX-125-blue.jpg', // temporar până găsim imagine black
      imageFile: 'Yamaha-NMAX-125-blue.jpg',
    },
    {
      name: 'Milky White',
      code: 'milky-white',
      hex: '#f8f9fa',
      listingImageFile: 'Yamaha-NMAX-125-blue.jpg', // temporar până găsim imagine white
      imageFile: 'Yamaha-NMAX-125-blue.jpg',
    },
  ];
  
  // Yamaha NMAX 125 Tech Max - culori disponibile (oficiale 2025/2026 de pe site Yamaha)
  const nmaxTechMaxColors = [
    {
      name: 'Ceramic Grey',
      code: 'ceramic-grey',
      hex: '#9ca3af',
      listingImageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg',
      imageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg',
    },
    {
      name: 'Dark Magma',
      code: 'dark-magma',
      hex: '#7f1d1d',
      listingImageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg', // temporar până găsim imagine dark magma
      imageFile: 'Yamaha-NMAX-125-tech-max-grey.jpg',
    },
    {
      name: 'Crystal Graphite',
      code: 'crystal-graphite',
      hex: '#4a5568',
      listingImageFile: 'Yamaha-NMAX-125-tech-max-graphite.jpg',
      imageFile: 'Yamaha-NMAX-125-tech-max-graphite.jpg',
    },
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

