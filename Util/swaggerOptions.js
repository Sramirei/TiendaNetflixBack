const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Tramite Ya",
        version: "1.0",
        description:
          "Nuestra API de venta de plataformas de streaming es la solución perfecta para aquellos que buscan llevar sus contenidos a un público global. Con nuestra plataforma de venta, puedes ofrecer una amplia gama de opciones de streaming a tus usuarios, brindándoles acceso a sus películas, series y eventos deportivos favoritos en cualquier momento y lugar",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Sebastian Ramrez",
          url: "https://www.linkedin.com/in/sebasti%C3%A1n-ramirez-ibarra-101738133/",
          gitHub: "https://github.com/Sramirei",
          email: "sramirei@outlook.com",
        },
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
      ],
    },
    apis: ["./Routes/*.js"],
  };

  module.exports = { options }