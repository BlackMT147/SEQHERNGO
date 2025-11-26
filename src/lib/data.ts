import type { Program, BlogPost } from './types';

export const programs: Program[] = [
  {
    id: '1',
    title: 'Youth Education & Empowerment',
    summary: 'Providing access to quality education and vocational training for underprivileged youth to unlock their full potential.',
    description: 'Our Youth Education & Empowerment program is designed to break the cycle of poverty by offering quality schooling, mentorship, and skills development. We partner with local schools to improve infrastructure and provide scholarships for promising students. Additionally, our vocational training centers equip young adults with practical skills in trades like tailoring, IT, and sustainable agriculture, paving the way for meaningful employment and entrepreneurship.',
    imageId: 'program-education',
    sdgGoals: [4, 8, 10],
  },
  {
    id: '2',
    title: 'Community Health Initiatives',
    summary: 'Improving community health through mobile clinics, health awareness campaigns, and access to essential medical services.',
    description: 'We believe that a healthy community is a thriving community. Our Community Health Initiatives focus on preventative care and accessibility. Mobile clinics bring doctors and nurses to remote villages, while our awareness campaigns educate on topics like hygiene, nutrition, and disease prevention. We also work to ensure communities have access to clean water and sanitation facilities, which are fundamental to public health.',
    imageId: 'program-health',
    sdgGoals: [3, 6],
  },
  {
    id: '3',
    title: 'Sustainable Agriculture Project',
    summary: 'Promoting food security and sustainable livelihoods by training small-scale farmers in eco-friendly farming techniques.',
    description: 'The Sustainable Agriculture Project empowers local farmers to increase their yields while protecting the environment. We provide training on organic farming, water conservation, and crop diversification. By promoting sustainable practices, we help ensure long-term food security, boost local economies, and build resilience against climate change.',
    imageId: 'program-sustainability',
    sdgGoals: [1, 2, 13, 15],
  },
    {
    id: '4',
    title: 'Women\'s Economic Empowerment',
    summary: 'Fostering financial independence for women through micro-loans, business training, and cooperative development.',
    description: 'Empowering women is crucial for community development. This program provides women with the tools they need to achieve financial independence. We offer micro-loans for starting small businesses, comprehensive business management training, and support for forming cooperatives that give them greater market power.',
    imageId: 'program-empowerment',
    sdgGoals: [5, 1, 8],
  },
  {
    id: '5',
    title: 'Clean Water & Sanitation (WASH)',
    summary: 'Ensuring access to safe drinking water and adequate sanitation facilities for rural and underserved communities.',
    description: 'Access to clean water and sanitation is a basic human right. Our WASH program works with communities to build and maintain wells, water purification systems, and latrines. We also conduct hygiene education workshops to maximize the health benefits of our infrastructure projects.',
    imageId: 'program-water',
    sdgGoals: [6, 3],
  },
];

export const featuredPrograms = programs.slice(0, 3);

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'the-urgent-need-for-climate-action',
        title: 'The Urgent Need for Climate Action',
        content: 'Climate change is the defining crisis of our time, and it is happening even more quickly than we feared. But we are far from powerless in the face of this global threat. As SEQHER, we are committed to SDG 13 (Climate Action) through our various programs. Our sustainable agriculture projects promote farming techniques that reduce carbon emissions and enhance biodiversity. Reforestation efforts not only capture carbon but also restore vital ecosystems. It\'s a challenge we must tackle together, for the planet and for future generations.',
        author: 'Jane Doe',
        authorId: 'admin001',
        createdAt: '2024-05-20T10:00:00Z',
        imageId: 'blog-climate-action',
    },
    {
        id: '2',
        slug: 'how-community-gardens-are-sowing-seeds-of-change',
        title: 'How Community Gardens Are Sowing Seeds of Change',
        content: 'In bustling urban landscapes, community gardens are emerging as green oases of hope and nutrition. These shared plots of land are more than just a source of fresh produce; they are powerful tools for social cohesion, education, and environmental stewardship. At SEQHER, we help establish and support community gardens as part of our commitment to SDG 2 (Zero Hunger) and SDG 11 (Sustainable Cities). They improve food security, provide hands-on learning for children, and create a stronger sense of community among residents.',
        author: 'John Smith',
        authorId: 'admin002',
        createdAt: '2024-05-15T14:30:00Z',
        imageId: 'blog-community-gardens',
    },
    {
        id: '3',
        slug: 'a-volunteers-story-finding-purpose-in-giving-back',
        title: 'A Volunteer\'s Story: Finding Purpose in Giving Back',
        content: 'I joined SEQHER as a volunteer six months ago, hoping to make a small difference. I was assigned to the Youth Education & Empowerment program, where I mentored a group of teenagers. The experience has been nothing short of life-changing—not just for them, but for me. Seeing a student grasp a new concept, or watching their confidence soar as they master a new skill, is an incredible reward. Volunteering has given me a profound sense of purpose and a deep connection to my community. It\'s a reminder that we all have the power to create positive change.',
        author: 'Emily White',
        authorId: 'user003',
        createdAt: '2024-05-10T09:00:00Z',
        imageId: 'blog-volunteer-story',
    },
];
