export const User = {
  id: '161',
  first_name: 'Levan',
  last_name: 'Tsereteli',
  is_created: '12/12/2025',
  phone: '557484848',
  image: 'https://picsum.photos/seed/picsum/200/300',
  email: 'ako@gmail.com',
  token: 'tok1231231ok2312331239912731231288323',
  giving: 8,
  exchanging: 5,
  exchanged: 6,
  given: 4,
  given_gifts: 12,
  dateOfBirth: '12/10/1996',
};
export const Chats = [
  {
    chat_id: '1', // chat with Jack
    user_id: '161',
    guestUser_id: '187',
    guest_firstName: 'Jack',
    guest_lastName: 'Omali',
    guest_image: 'https://picsum.photos/seed/picsum1/200/300',
  },
  {
    chat_id: '2', // chat with Sara
    user_id: '161',
    guestUser_id: '188',
    guest_firstName: 'Sara',
    guest_lastName: 'Connor',
    guest_image: 'https://picsum.photos/seed/picsum2/200/300',
  },
  {
    chat_id: '3', // chat with Mike, no messages yet
    user_id: '161',
    guestUser_id: '189',
    guest_firstName: 'Mike',
    guest_lastName: 'Johnson',
    guest_image: 'https://picsum.photos/seed/picsum3/200/300',
  },
  {
    chat_id: '4', // chat with Anna, multiple messages, all seen
    user_id: '161',
    guestUser_id: '190',
    guest_firstName: 'Anna',
    guest_lastName: 'Smith',
    guest_image: 'https://picsum.photos/seed/picsum4/200/300',
  },
  {
    chat_id: '5', // chat with Leo, last message unseen
    user_id: '161',
    guestUser_id: '191',
    guest_firstName: 'Leo',
    guest_lastName: 'Brown',
    guest_image: 'https://picsum.photos/seed/picsum5/200/300',
  },
];

export const Messages = [
  // Chat 1: Jack
  {
    chat_id: '1',
    id: '161', // current user sent
    message_id: '1',
    message: 'Hey Jack, how are you?',
    sent_in: 1757940078,
    seen_at: 1757940138,
  },
  {
    chat_id: '1',
    id: '187', // guest sent, unseen
    message_id: '2',
    message: 'I’m good, thanks! What about you?',
    sent_in: 1757940250,
    seen_at: null,
  },

  // Chat 2: Sara
  {
    chat_id: '2',
    id: '161',
    message_id: '1',
    message: 'Hello Sara!',
    sent_in: 1757940350,
    seen_at: 1757940400,
  },
  {
    chat_id: '2',
    id: '188',
    message_id: '2',
    message: 'Hi! How’s your day?',
    sent_in: 1757940450,
    seen_at: 1757940500, // seen
  },

  // Chat 3: Mike (no messages)
  // intentionally empty

  // Chat 4: Anna, multiple seen messages
  {
    chat_id: '4',
    id: '161',
    message_id: '1',
    message: 'Hi Anna!',
    sent_in: 1757940600,
    seen_at: 1757940650,
  },
  {
    chat_id: '4',
    id: '190',
    message_id: '2',
    message: 'Hey there!',
    sent_in: 1757940700,
    seen_at: 1757940750,
  },
  {
    chat_id: '4',
    id: '161',
    message_id: '3',
    message: 'Want to meet later?',
    sent_in: 1757940800,
    seen_at: 1757940850,
  },

  // Chat 5: Leo, last message unseen
  {
    chat_id: '5',
    id: '161',
    message_id: '1',
    message: 'Hey Leo!',
    sent_in: 1757940900,
    seen_at: 1757940950,
  },
  {
    chat_id: '5',
    id: '191',
    message_id: '2',
    message: 'Hey! What’s up?',
    sent_in: 1757941000,
    seen_at: null, // unseen by current user
  },
];




export const Categories = [
{  
  id: '1',
name: 'ტექნიკა',
},
{  
  id: '2',
name: 'სახლი და ბაღი',
},
{ 
   id: '3',
name: 'საოჯახო ტექნიკა',
},
{  
  id: '4',
name: 'სამშენებლო ტექნიკა',
},
{  
  id: '5',
name: 'ნადირობა და თევზაობა',
},
{  
  id: '6',
name: 'საბავშვო',
},
{  
  id: '7',
name: 'მუსიკა',
},
{  
  id: '8',
name: 'სილამაზე და მოდა',
},
{  
  id: '9',
name: 'მშენებლობა და რემონტი',
},
{  
  id: '10',
name: 'სოფლის მეურნეობა',
},
{  
  id: '11',
name: 'ცხოველები',
},
{  
  id: '12',
name: 'სპორტი და დასვენება',
},
{  
  id: '13',
name: 'ბიზნესი და დანადგარები',
},
{  
  id: '14',
name: 'წიგნები და კანცელარია',
},
{  
  id: '15',
name: 'ხელოვნება და საკოლექციო',
},
];

export const Product = [
  {
    id: '1',
    category: 'Electronics',
    category_id: '1',
    title: 'Wireless Earbuds',
    description:
      'Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation,Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation.',
    owner: 'John Doe',
    ownerNumber: '+1234567890',
    giftOrExchange: 1,
    giftedOrExchanged: 2,
    images: [
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/seed/picsum/200/300',
    ],
  },
  {
    id: '2',
    category: 'Books',
    category_id: '2',
    title: 'Atomic Habits',
    description:
      'An easy & proven way to build good habits and break bad ones.',
    owner: 'Sarah Lee',
    ownerNumber: '+1987654321',
    giftOrExchange: 2,
    giftedOrExchanged: 1,
    images: ['https://picsum.photos/seed/picsum/200/300'],
  },
  {
    id: '3',
    category: 'Fashion',
    category_id: '3',
    title: 'Leather Backpack',
    description: 'Stylish leather backpack with multiple compartments.',
    owner: 'Mike Johnson',
    ownerNumber: '+1122334455',
    giftOrExchange: 1,
    giftedOrExchanged: 2,
    images: [
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/seed/picsum/200/300',
    ],
  },
    {
    id: '4',
    category: 'Electronics',
    category_id: '1',
    title: 'Wireless Earbuds',
    description:
      'Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation,Compact and powerful earbuds with noise cancellation, Compact and powerful earbuds with noise cancellation.',
    owner: 'John Doe',
    ownerNumber: '+1234567890',
    giftOrExchange: 2,
    giftedOrExchanged: 1,
    images: [
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/seed/picsum/200/300',
    ],
  },
  {
    id: '5',
    category: 'Books',
    category_id: '2',
    title: 'Atomic Habits',
    description:
      'An easy & proven way to build good habits and break bad ones.',
    owner: 'Sarah Lee',
    ownerNumber: '+1987654321',
    giftOrExchange: 2,
    giftedOrExchanged: 2,
    images: ['https://picsum.photos/seed/picsum/200/300'],
  },
  {
    id: '6',
    category: 'Fashion',
    category_id: '3',
    title: 'Leather Backpack',
    description: 'Stylish leather backpack with multiple compartments.',
    owner: 'Mike Johnson',
    ownerNumber: '+1122334455',
    giftOrExchange: 2,
    giftedOrExchanged: 2,
    images: [
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/seed/picsum/200/300',
      'https://picsum.photos/seed/picsum/200/300',
    ],
  },
];

export const News = [
  {
    id: '1',
    title: 'Breaking: Market Hits New High',
    description:
      'Stock markets reached a new record high today as investors remain optimistic.',
    date: '2025/07/11',
    images: [
      'https://picsum.photos/seed/picsum1/200/300',
      'https://picsum.photos/seed/picsum2/200/300',
    ],
  },
  {
    id: '2',
    title: 'Local Sports Team Wins Championship',
    description:
      'An incredible finish to the season as the local team claims the national title.',
    date: '2025/07/10',
    images: ['https://picsum.photos/seed/picsum3/200/300'],
  },
  {
    id: '3',
    title: 'Tech Giant Announces New Device',
    description:
      'The latest smartphone promises to revolutionize the industry with cutting/edge features.',
    date: '2025/07/09',
    images: [
      'https://picsum.photos/seed/picsum4/200/300',
      'https://picsum.photos/seed/picsum5/200/300',
      'https://picsum.photos/seed/picsum6/200/300',
    ],
  },
  {
    id: '4',
    title: 'Weather Alert: Storm Incoming',
    description:
      'Authorities warn residents to prepare for heavy rain and strong winds over the weekend.',
    date: '2025/07/08',
    images: ['https://picsum.photos/seed/picsum7/200/300'],
  },
  {
    id: '5',
    title: 'Art Exhibition Opens Downtown',
    description:
      'Local artists showcase modern works in a new exhibit attracting crowds.',
    date: '2025/07/07',
    images: [
      'https://picsum.photos/seed/picsum8/200/300',
      'https://picsum.photos/seed/picsum9/200/300',
    ],
  },
];


