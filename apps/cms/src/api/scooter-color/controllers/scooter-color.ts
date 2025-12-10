/**
 * scooter-color controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::scooter-color.scooter-color', ({ strapi }) => ({
  /**
   * Custom endpoint to get available scooters (not already assigned to a color)
   * Used in the admin panel to filter the scooter dropdown
   */
  async getAvailableScooters(ctx) {
    try {
      const { id } = ctx.params; // Current color ID (if editing)

      // Get all scooters
      const allScooters = await strapi.entityService.findMany('api::scooter.scooter', {
        fields: ['id', 'name'],
        publicationState: 'preview',
      });

      // Get all colors with their scooter relations
      const allColors = await strapi.entityService.findMany('api::scooter-color.scooter-color', {
        fields: ['id'],
        populate: {
          scooter: {
            fields: ['id'],
          },
        },
        publicationState: 'preview',
      });

      // Get IDs of scooters that are already assigned to colors (excluding current color if editing)
      const assignedScooterIds = allColors
        .filter((color: any) => {
          // Exclude current color when editing
          if (id && color.id === parseInt(id)) {
            return false;
          }
          return color.scooter?.id;
        })
        .map((color: any) => color.scooter.id);

      // Filter out assigned scooters
      const availableScooters = allScooters.filter(
        (scooter: any) => !assignedScooterIds.includes(scooter.id)
      );

      return ctx.send({
        data: availableScooters,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));

