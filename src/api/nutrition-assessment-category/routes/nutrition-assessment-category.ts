/**
 * nutrition-assessment-category router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::nutrition-assessment-category.nutrition-assessment-category", {
  config: {
    update: {
      auth: false, // Change to true if authentication is required
      policies: [],
    },
  },
});