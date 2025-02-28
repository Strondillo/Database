import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::screened-patient.screened-patient', ({ strapi }) => ({
  async delete(ctx) {
    const { id } = ctx.params;
    try {
      // Use the direct query method to force a hard delete
      const entity = await strapi.db.query('api::screened-patient.screened-patient').delete({
        where: { id },
      });
      return this.transformResponse(entity);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));
