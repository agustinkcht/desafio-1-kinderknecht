import __dirname from "../../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TechNode API",
      description: "Documentation of TechNode API",
    },
  },
  apis: [__dirname + "/src/docs/*.yaml"],
};

export default swaggerOptions;


