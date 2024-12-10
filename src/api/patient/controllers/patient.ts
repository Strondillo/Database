import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::patient.patient', ({ strapi }) => ({
    async create(ctx) {
        try {
          const { data } = ctx.request.body;
      
          const clinicalConditions = await Promise.all(
            data.clinical_conditions.map((condition: string) =>
              strapi.entityService.create('api::clinical-condition.clinical-condition', {
                data: { name: condition },
              })
            )
          );
      
          const weightHistories = await Promise.all(
            data.weight_histories.map((history: string) =>
              strapi.entityService.create('api::weight-history.weight-history', {
                data: { name: history },
              })
            )
          );
      
          const patient = await strapi.entityService.create('api::patient.patient', {
            data: {
              ...data,
              clinical_conditions: clinicalConditions.map((item) => item.id),
              weight_histories: weightHistories.map((item) => item.id),
            },
          });
      
          return patient;
        } catch (error) {
          ctx.throw(400, `Error creating patient: ${error.message}`);
        }
      },
  }));