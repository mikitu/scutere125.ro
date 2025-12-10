/**
 * Custom routes for scooter-color
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/scooter-colors/available-scooters/:id?',
      handler: 'scooter-color.getAvailableScooters',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

