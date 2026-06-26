const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.post.deleteMany();
  await prisma.contactMessage.deleteMany();

  console.log('Seeding space-themed posts...');

  const posts = [
    {
      title: 'The James Webb Space Telescope: A New Era',
      excerpt: 'How JWST is fundamentally changing our understanding of the early universe and exoplanets.',
      content: 'The James Webb Space Telescope (JWST) is the largest, most powerful and complex space telescope ever built and launched into space. It will fundamentally alter our understanding of the universe. By looking in the infrared spectrum, JWST can peer through dust clouds to see the birth of stars, observe the atmospheres of exoplanets in unprecedented detail, and look back in time to the very first galaxies that formed after the Big Bang.\n\nIts massive honeycomb mirrors and tennis-court-sized sunshield are marvels of engineering, operating at temperatures near absolute zero to capture the faintest whispers of ancient light.',
      author: 'Dr. Nova',
      imageUrl: 'https://images.unsplash.com/photo-1614729939124-03290b55c9ce?auto=format&fit=crop&q=80&w=800',
      tags: 'Astronomy, JWST, Universe',
    },
    {
      title: 'Mars Colonization: Challenges and Horizons',
      excerpt: 'What will it actually take to build a self-sustaining city on the Red Planet?',
      content: 'Establishing a human presence on Mars is perhaps the most audacious goal of the 21st century. While companies like SpaceX are building the transportation infrastructure (Starship) to get us there, surviving and thriving on a cold, irradiated, arid planet is an entirely different challenge.\n\nWe will need closed-loop life support systems, in-situ resource utilization (ISRU) to create fuel and water from Martian ice and atmosphere, and advanced radiation shielding. But the psychological challenge of living millions of miles from Earth may be the hardest hurdle of all.',
      author: 'Astrobyte Team',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800',
      tags: 'Mars, Future, Exploration',
    },
    {
      title: 'Decoding Black Holes',
      excerpt: 'Understanding the most enigmatic and powerful objects in the cosmos.',
      content: 'A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape. For decades, they were purely theoretical—mathematical quirks of Einstein\'s general relativity. Today, we have actual photographs of their event horizons, thanks to the Event Horizon Telescope.\n\nBut what lies inside a black hole? The singularity remains one of the greatest mysteries in physics, where our current understanding of gravity and quantum mechanics breaks down completely.',
      author: 'Dr. Nova',
      imageUrl: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&q=80&w=800',
      tags: 'Physics, Black Holes, Science',
    },
    {
      title: 'The Search for Extraterrestrial Life',
      excerpt: 'Are we alone in the universe? The scientific pursuit of cosmic companionship.',
      content: 'The Drake Equation suggests that the Milky Way should be teeming with intelligent life, yet the Fermi Paradox asks: "Where is everybody?" Our search for extraterrestrial intelligence (SETI) has primarily focused on listening for anomalous radio signals.\n\nHowever, the discovery of thousands of exoplanets has shifted our focus. We are now looking for biosignatures in the atmospheres of distant worlds—gases like oxygen and methane that might indicate the presence of life. The discovery of even microbial life elsewhere would be a paradigm shift for humanity.',
      author: 'Astrobyte Team',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      tags: 'Exoplanets, SETI, Aliens',
    },
    {
      title: 'The Beauty of Nebulae',
      excerpt: 'Exploring the stellar nurseries where stars are born and die.',
      content: 'Nebulae are giant clouds of dust and gas in space. Some come from the gas and dust thrown out by the explosion of a dying star, such as a supernova. Other nebulae are regions where new stars are beginning to form, earning them the name "stellar nurseries."\n\nThe vibrant colors we see in images of nebulae (like the Orion Nebula or the Pillars of Creation) are often assigned by astronomers to represent different elements, like hydrogen, oxygen, and sulfur, painting a chemical portrait of these vast structures.',
      author: 'Dr. Nova',
      imageUrl: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=800',
      tags: 'Nebula, Astronomy, Photography',
    }
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post
    });
  }

  console.log('Seeded database successfully with space-themed posts!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
