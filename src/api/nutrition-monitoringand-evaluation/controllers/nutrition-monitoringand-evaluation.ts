import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::nutrition-monitoringand-evaluation.nutrition-monitoringand-evaluation',
  ({ strapi }) => ({
    async update(ctx) {
      try {
        const { id } = ctx.params;
        const { data } = ctx.request.body;

        // Check if the record exists
        const entity = await strapi.entityService.findOne(
          'api::nutrition-monitoringand-evaluation.nutrition-monitoringand-evaluation',
          id
        );

        if (!entity) {
          return ctx.notFound('Record not found');
        }

        // Update the record
        const result = await strapi.entityService.update(
          'api::nutrition-monitoringand-evaluation.nutrition-monitoringand-evaluation',
          id,
          { data }
        );

        return { data: result };
      } catch (error) {
        return ctx.throw(500, error);
      }
    }
  })
);
