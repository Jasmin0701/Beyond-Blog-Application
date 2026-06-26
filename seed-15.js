const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.post.deleteMany();

  console.log('Seeding 15 space-themed posts...');

  const posts = [
    {
      title: 'The James Webb Space Telescope: A New Era',
      excerpt: 'How JWST is fundamentally changing our understanding of the early universe.',
      content: 'The James Webb Space Telescope (JWST) is the largest, most powerful and complex space telescope ever built and launched into space. It will fundamentally alter our understanding of the universe. By looking in the infrared spectrum, JWST can peer through dust clouds to see the birth of stars, observe the atmospheres of exoplanets in unprecedented detail, and look back in time to the very first galaxies that formed after the Big Bang.',
      author: 'Dr. Nova',
      imageUrl: 'https://picsum.photos/seed/jwst/800/500',
      tags: 'Astronomy',
      views: 1205,
      likes: 340,
    },
    {
      title: 'Mars Colonization: Challenges and Horizons',
      excerpt: 'What will it actually take to build a self-sustaining city on the Red Planet?',
      content: 'Establishing a human presence on Mars is perhaps the most audacious goal of the 21st century. While companies like SpaceX are building the transportation infrastructure to get us there, surviving and thriving on a cold, irradiated, arid planet is an entirely different challenge. We will need closed-loop life support systems, in-situ resource utilization, and advanced radiation shielding.',
      author: 'Elon M.',
      imageUrl: 'https://picsum.photos/seed/mars/800/500',
      tags: 'Mars',
      views: 940,
      likes: 289,
    },
    {
      title: 'Decoding Black Holes',
      excerpt: 'Understanding the most enigmatic and powerful objects in the cosmos.',
      content: 'A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape. For decades, they were purely theoretical. Today, we have actual photographs of their event horizons, thanks to the Event Horizon Telescope. But what lies inside a black hole? The singularity remains one of the greatest mysteries in physics.',
      author: 'Dr. Nova',
      imageUrl: 'https://picsum.photos/seed/blackhole/800/500',
      tags: 'Physics',
      views: 3042,
      likes: 890,
    },
    {
      title: 'The Search for Extraterrestrial Life',
      excerpt: 'Are we alone in the universe? The scientific pursuit of cosmic companionship.',
      content: 'The Drake Equation suggests that the Milky Way should be teeming with intelligent life, yet the Fermi Paradox asks: "Where is everybody?" Our search for extraterrestrial intelligence (SETI) has primarily focused on listening for anomalous radio signals. However, the discovery of thousands of exoplanets has shifted our focus to atmospheric biosignatures.',
      author: 'Astrobyte Team',
      imageUrl: 'https://picsum.photos/seed/seti/800/500',
      tags: 'Exoplanets',
      views: 885,
      likes: 124,
    },
    {
      title: 'The Beauty of Nebulae',
      excerpt: 'Exploring the stellar nurseries where stars are born and die.',
      content: 'Nebulae are giant clouds of dust and gas in space. Some come from the gas and dust thrown out by the explosion of a dying star, such as a supernova. Other nebulae are regions where new stars are beginning to form, earning them the name "stellar nurseries." The vibrant colors we see are often assigned by astronomers to represent different elements.',
      author: 'Dr. Nova',
      imageUrl: 'https://picsum.photos/seed/nebula/800/500',
      tags: 'Astronomy',
      views: 1540,
      likes: 540,
    },
    {
      title: 'Dark Matter and Dark Energy',
      excerpt: 'The invisible forces that make up 95% of our universe.',
      content: 'When we look at the night sky, everything we see—stars, planets, galaxies—makes up only about 5% of the universe. The rest is composed of dark matter (27%) and dark energy (68%). Dark matter exerts a gravitational pull, holding galaxies together, while dark energy is pushing the universe apart at an accelerating rate.',
      author: 'Neil D. Tyson',
      imageUrl: 'https://picsum.photos/seed/darkmatter/800/500',
      tags: 'Physics',
      views: 2200,
      likes: 670,
    },
    {
      title: 'The Voyager Missions: 45 Years Later',
      excerpt: 'Humanity\'s farthest travelers continue to send data from interstellar space.',
      content: 'Launched in 1977, Voyager 1 and 2 were designed to explore the outer planets of our solar system. After completing their primary missions, they kept going. Today, they are the only human-made objects to have crossed the heliopause and entered interstellar space. They continue to send back valuable data about the space between stars.',
      author: 'Carl Sagan',
      imageUrl: 'https://picsum.photos/seed/voyager/800/500',
      tags: 'Technology',
      views: 1890,
      likes: 445,
    },
    {
      title: 'Exoplanet Atmospheres and Biosignatures',
      excerpt: 'How we analyze the air of planets light-years away.',
      content: 'By watching a star\'s light pass through the atmosphere of a transiting exoplanet, astronomers can use spectroscopy to determine what gases are present. We are looking for biosignatures—combinations of gases like oxygen and methane that shouldn\'t coexist in large quantities without life constantly replenishing them.',
      author: 'Astrobyte Team',
      imageUrl: 'https://picsum.photos/seed/exoplanet/800/500',
      tags: 'Exoplanets',
      views: 730,
      likes: 110,
    },
    {
      title: 'The Artemis Program: Return to the Moon',
      excerpt: 'NASA\'s ambitious plan to establish a sustainable presence on the lunar surface.',
      content: 'The Artemis program aims to return humans to the Moon, including the first woman and the first person of color, by the mid-2020s. Unlike the Apollo missions, Artemis focuses on sustainability. We will build the Lunar Gateway space station and establish a base camp at the lunar south pole to prepare for the ultimate leap: Mars.',
      author: 'J. Smith',
      imageUrl: 'https://picsum.photos/seed/artemis/800/500',
      tags: 'Mars',
      views: 4500,
      likes: 1200,
    },
    {
      title: 'Quantum Entanglement in Deep Space',
      excerpt: 'Could "spooky action at a distance" enable faster-than-light communication?',
      content: 'Quantum entanglement links particles so that the state of one instantly affects the other, regardless of distance. While current physics dictates that this cannot be used to transmit classical information faster than light, scientists are exploring how entangled particles could revolutionize secure quantum communication networks across the solar system.',
      author: 'Dr. Nova',
      imageUrl: 'https://picsum.photos/seed/quantum/800/500',
      tags: 'Sci-Fi',
      views: 950,
      likes: 210,
    },
    {
      title: 'The Great Filter: Why We Might Be Alone',
      excerpt: 'Exploring the terrifying solution to the Fermi Paradox.',
      content: 'The Great Filter hypothesis suggests that there is some evolutionary step or catastrophic event that stops intelligent civilizations from becoming space-faring and colonizing the galaxy. The big question is: is the filter behind us (e.g., the jump from single to multi-cellular life) or ahead of us (e.g., nuclear war or AI)?',
      author: 'Marcus Vance',
      imageUrl: 'https://picsum.photos/seed/filter/800/500',
      tags: 'Sci-Fi',
      views: 3100,
      likes: 850,
    },
    {
      title: 'Asteroid Mining: The Trillion Dollar Industry',
      excerpt: 'How space rocks could fuel the next economic revolution.',
      content: 'Asteroids are rich in precious metals like platinum, gold, and rare earth elements, as well as water ice. Mining these resources could not only create unprecedented wealth on Earth but also provide the necessary materials to build and fuel spacecraft directly in orbit, drastically reducing the cost of space exploration.',
      author: 'Elon M.',
      imageUrl: 'https://picsum.photos/seed/asteroid/800/500',
      tags: 'Technology',
      views: 1240,
      likes: 310,
    },
    {
      title: 'The Future of Ion Propulsion',
      excerpt: 'Moving beyond chemical rockets for deep space travel.',
      content: 'Chemical rockets are powerful but inefficient, carrying massive amounts of fuel. Ion thrusters, which accelerate ions using electricity, provide a gentle but continuous thrust that can achieve much higher top speeds over long distances. Next-generation ion drives could drastically cut travel times to the outer planets.',
      author: 'Astrobyte Team',
      imageUrl: 'https://picsum.photos/seed/ion/800/500',
      tags: 'Technology',
      views: 680,
      likes: 190,
    },
    {
      title: 'Gravitational Waves: A New Way to "See" the Universe',
      excerpt: 'How ripples in spacetime are unlocking cosmic mysteries.',
      content: 'Predicted by Einstein in 1916 and finally detected in 2015, gravitational waves are ripples in the fabric of spacetime caused by some of the most violent and energetic processes in the universe, like colliding black holes. They allow us to "hear" the universe in a way completely separate from light.',
      author: 'Neil D. Tyson',
      imageUrl: 'https://picsum.photos/seed/gravity/800/500',
      tags: 'Physics',
      views: 2800,
      likes: 740,
    },
    {
      title: 'The Oort Cloud: The Edge of Our Solar System',
      excerpt: 'The icy reservoir of comets that surrounds our sun.',
      content: 'The Oort Cloud is a theoretical, vast, spherical shell of icy bodies surrounding the solar system, extending up to a light-year away from the Sun. It is believed to be the source of all long-period comets. Because it is so far and faint, we have yet to directly observe an object while it is still in the Oort Cloud.',
      author: 'Dr. Nova',
      imageUrl: 'https://picsum.photos/seed/oort/800/500',
      tags: 'Astronomy',
      views: 520,
      likes: 85,
    }
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post
    });
  }

  console.log('Seeded database successfully with 15 space-themed posts!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
