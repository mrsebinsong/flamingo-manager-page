export default [
    {
      name: 'Justin Steak',
      plan: { current: 'Basic', upgradeRequest: 'Pro' },
      market: 'international',
      social: {
        onUse: ['instagram', 'twitter'],
        urlOnCrawling: ['https://www.instagram.com/justinsteak/']
      },
      review: { 'yelp': true, 'opentable': true, 'tripadvisor': false },
      competitors: [
        {
          name: 'Steak House', market: 'international',
          social: {
            onUse: ['instagram', 'twitter'],
            urlOnCrawling: ['https://www.instagram.com/outback/']
          },
          review: { 'yelp': true, 'opentable': true, 'tripadvisor': true }
        },
        {
          name: 'Outback', market: 'domestic',
          social: {
            onUse: ['instagram', 'twitter'],
            urlOnCrawling: ['https://www.instagram.com/outback/']
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        }
      ]
    },
    { name: 'Petite Coree',
      market: 'international',
      plan: { current: 'Pro', upgradeRequest: 'Premium' },
      social: {
        onUse: ['instagram', 'youtube'],
        urlOnCrawling: ['https://www.instagram.com/thepetitecoree/?hl=ko']
      },
      review: { 'yelp': true, 'opentable': true, 'tripadvisor': true },
      competitors: [
        {
          name: 'Izakaya', market: 'domestic',
          social: ['instagram', 'twitter', 'youtube'],
          review: { 'naver': true, 'mango plate': true, '식신': true }
        }
      ]
    },
    { name: 'Flamingo Data',
      market: 'international',
      plan: { current: 'Basic', upgradeRequest: null },
      social: {
        onUse: ['instagram', 'twitter', 'youtube'],
        urlOnCrawling: ['https://www.instagram.com/flamingodata']
      },
      review: { 'yelp': true, 'opentable': true, 'tripadvisor': true },
      competitors: [
        {
          name: 'Daum Soft', market: 'Domestic',
          social: {
            onUse: ['instagram', 'twitter'],
            urlOnCrawling: ['https://www.facebook.com/daumsoft/']
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        },
        {
          name: 'datamingo', market: 'domestic',
          social: {
            onUse: ['instagram', 'twitter', 'youtube'],
            urlOnCrawling: []
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        }
      ]
    },
    { name: 'Marvel Studio',
      market: 'international',
      plan: { current: 'Premium', upgradeRequest: null },
      social: {
        onUse: ['instagram', 'twitter', 'youtube'],
        urlOnCrawling: [
          'https://www.instagram.com/marvelstudios/',
          'https://www.facebook.com/marvelstudios/'
        ]
      },
      review: { 'yelp': false, 'opentable': true, 'tripadvisor': false },
      competitors: [
        {
          name: 'DC Comics', market: 'international',
          social: {
            onUse: ['instagram', 'twitter', 'youtube'],
            urlOnCrawling: [
              'https://www.facebook.com/dccomics/',
              'https://www.instagram.com/dccomics/'
            ]
          },
          review: { 'yelp': true, 'opentable': true, 'tripadvisor': true }
        },
        {
          name: 'Pixar', market: 'international',
          social: {
            onUse: ['instagram', 'twitter', 'youtube'],
            urlOnCrawling: [
              'https://www.facebook.com/DisneyPixar/',
              'https://www.instagram.com/pixar/'
            ]
          },
          review: { 'yelp': true, 'opentable': true, 'tripadvisor': true }
        }
      ]
    },
    { name: 'Starbucks Korea',
      market: 'domestic',
      plan: { current: 'Basic', upgradeRequest: 'Pro' },
      social: {
        onUse: ['instagram', 'twitter'],
        urlOnCrawling: ['https://www.instagram.com/starbuckskorea/']
      },
      review: { 'naver': true, 'mango plate': true, '식신': true },
      competitors: [
        {
          name: 'Tom and Toms', market: 'domestic',
          social: {
            onUse: ['instagram', 'twitter', 'youtube'],
            urlOnCrawling: [
              'https://www.facebook.com/tomntomscoffee/'
            ]
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        },
        {
          name: 'Twosome Place', market: 'domestic',
          social: {
            onUse: ['instagram', 'twitter', 'youtube'],
            urlOnCrawling: [
              'https://www.facebook.com/ATWOSOMEPLACE/'
            ]
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        },
        {
          name: 'Coffee Smith', market: 'domestic',
          social: {
            onUse: ['instagram', 'twitter'],
            urlOnCrawling: []
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        }
      ]
    },
    { name: 'LG U+',
      market: 'domestic',
      plan: { current: 'Basic', upgradeRequest: 'Pro' },
      social: {
        onUse: ['instagram', 'twitter', 'youtube'],
        urlOnCrawling: ['https://www.instagram.com/lguplus_/']
      },
      review: { 'naver': true, 'mango plate': false, '식신': true },
      competitors: [
        {
          name: 'Olle KT', market: 'domestic',
          social: {
            onUse: ['instagram', 'youtube'],
            urlOnCrawling: [
              'https://www.instagram.com/kt.corp/',
              'https://www.facebook.com/kt.corp/'
            ]
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        },
        {
          name: 'SKT', market: 'domestic',
          social: {
            onUse: ['instagram', 'twitter'],
            urlOnCrawling: [
              'https://www.instagram.com/sktworld/',
              'https://www.facebook.com/sktworld/'
            ]
          },
          review: { 'naver': true, 'mango plate': true, '식신': true }
        }
      ]
    }
];
