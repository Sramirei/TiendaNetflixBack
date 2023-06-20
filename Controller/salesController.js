const { connection } = require("../DataBase/db");

exports.getAllSales = (req, res, next) => {
  const sql = `SELECT v.cod_ventas, v.cod_usuario, v.numero_factura, CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario, v.producto, v.pantalla, 
       CASE 
         WHEN v.producto = 'netflix' THEN nf.correo
         WHEN v.producto = 'disney' THEN ds.correo
         WHEN v.producto = 'hbo' THEN hb.correo
         WHEN v.producto = 'crunchyroll' THEN cr.correo
         WHEN v.producto = 'plex' THEN px.correo
         WHEN v.producto = 'startplus' THEN sp.correo
         WHEN v.producto = 'paramount' THEN pm.correo
         WHEN v.producto = 'spotify' THEN sf.correo
         WHEN v.producto = 'youtube' THEN yt.correo
         WHEN v.producto = 'amazon' THEN am.correo
         WHEN v.producto = 'apple' THEN ap.correo
         ELSE NULL
       END AS correo_producto,
       CASE 
         WHEN v.producto = 'netflix' THEN nf.contrasena
         WHEN v.producto = 'disney' THEN ds.contrasena
         WHEN v.producto = 'hbo' THEN hb.contrasena
         WHEN v.producto = 'crunchyroll' THEN cr.contrasena
         WHEN v.producto = 'plex' THEN px.contrasena
         WHEN v.producto = 'startplus' THEN sp.contrasena
         WHEN v.producto = 'paramount' THEN pm.contrasena
         WHEN v.producto = 'spotify' THEN sf.contrasena
         WHEN v.producto = 'youtube' THEN yt.contrasena
         WHEN v.producto = 'amazon' THEN am.contrasena
         WHEN v.producto = 'apple' THEN ap.contrasena
         ELSE NULL
       END AS contrasena,
       v.costo, v.estado, v.fecha, v.perfil
FROM ventas v
JOIN usuario u ON v.cod_usuario = u.cod_usuario
LEFT JOIN netflix nf ON v.cod_producto = nf.id
LEFT JOIN disney ds ON v.cod_producto = ds.id
LEFT JOIN hbo hb ON v.cod_producto = hb.id
LEFT JOIN crunchyroll cr ON v.cod_producto = cr.id
LEFT JOIN plex px ON v.cod_producto = px.id
LEFT JOIN startplus sp ON v.cod_producto = sp.id
LEFT JOIN paramount pm ON v.cod_producto = pm.id
LEFT JOIN spotify sf ON v.cod_producto = sf.id
LEFT JOIN youtube yt ON v.cod_producto = yt.id
LEFT JOIN amazon am ON v.cod_producto = am.id
LEFT JOIN apple ap ON v.cod_producto = ap.id
ORDER BY v.cod_ventas DESC`;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send("No Sales found.");
      next();
    }
  });
};

exports.getOneSale = (req, res, next) => {
  const { cod_ventas } = req.params;
  const sql = `SELECT v.cod_ventas, v.cod_usuario, v.numero_factura, CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario, v.producto, v.pantalla, 
       CASE 
         WHEN v.producto = 'netflix' THEN nf.correo
         WHEN v.producto = 'disney' THEN ds.correo
         WHEN v.producto = 'hbo' THEN hb.correo
         WHEN v.producto = 'crunchyroll' THEN cr.correo
         WHEN v.producto = 'plex' THEN px.correo
         WHEN v.producto = 'startplus' THEN sp.correo
         WHEN v.producto = 'paramount' THEN pm.correo
         WHEN v.producto = 'spotify' THEN sf.correo
         WHEN v.producto = 'youtube' THEN yt.correo
         WHEN v.producto = 'amazon' THEN am.correo
         WHEN v.producto = 'apple' THEN ap.correo
         ELSE NULL
       END AS correo_producto,
       CASE 
         WHEN v.producto = 'netflix' THEN nf.contrasena
         WHEN v.producto = 'disney' THEN ds.contrasena
         WHEN v.producto = 'hbo' THEN hb.contrasena
         WHEN v.producto = 'crunchyroll' THEN cr.contrasena
         WHEN v.producto = 'plex' THEN px.contrasena
         WHEN v.producto = 'startplus' THEN sp.contrasena
         WHEN v.producto = 'paramount' THEN pm.contrasena
         WHEN v.producto = 'spotify' THEN sf.contrasena
         WHEN v.producto = 'youtube' THEN yt.contrasena
         WHEN v.producto = 'amazon' THEN am.contrasena
         WHEN v.producto = 'apple' THEN ap.contrasena
         ELSE NULL
       END AS contrasena,
       v.costo, v.estado, v.fecha, v.perfil
FROM ventas v
JOIN usuario u ON v.cod_usuario = u.cod_usuario
LEFT JOIN netflix nf ON v.cod_producto = nf.id
LEFT JOIN disney ds ON v.cod_producto = ds.id
LEFT JOIN hbo hb ON v.cod_producto = hb.id
LEFT JOIN crunchyroll cr ON v.cod_producto = cr.id
LEFT JOIN plex px ON v.cod_producto = px.id
LEFT JOIN startplus sp ON v.cod_producto = sp.id
LEFT JOIN paramount pm ON v.cod_producto = pm.id
LEFT JOIN spotify sf ON v.cod_producto = sf.id
LEFT JOIN youtube yt ON v.cod_producto = yt.id
LEFT JOIN amazon am ON v.cod_producto = am.id
LEFT JOIN apple ap ON v.cod_producto = ap.id
WHERE v.cod_ventas = ${cod_ventas}
ORDER BY v.cod_ventas DESC`;

  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send("No Sale found.");
      next();
    }
  });
};

exports.createdSale = async (req, res, next) => {
  try {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const dateString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    const { cod_usuario, producto, pantalla, costo, estado } = req.body;

    // Obtener el último número de factura registrado en la tabla ventas
    const getLastInvoiceNumberQuery =
      "SELECT numero_factura FROM ventas ORDER BY numero_factura DESC LIMIT 1";

    connection.query(getLastInvoiceNumberQuery, (error, results) => {
      if (error) {
        console.error("Error getting last invoice number: ", error);
        return next(error);
      }

      let numero_factura;
      if (results.length > 0) {
        const lastInvoiceNumber = results[0].numero_factura;
        numero_factura = lastInvoiceNumber + 1;
      } else {
        // Si no hay registros en la tabla ventas, el número de factura será 1
        numero_factura = 1;
      }

      const selectProductQuery = `SELECT * FROM ${producto} WHERE pantalla != 'usado'`;
      const selectProductValues = [];

      connection.query(
        selectProductQuery,
        selectProductValues,
        (selectError, selectResults) => {
          if (selectError) {
            console.error("Error selecting Product: ", selectError);
            return next(selectError);
          }

          let selectedProduct;

          if (selectResults.length > 0) {
            selectedProduct = selectResults.find((product) => {
              const screenInt = parseInt(pantalla);
              const screenUsed = product.usado ? parseInt(product.usado) : 0;
              return screenInt + screenUsed <= 4;
            });
          }

          if (selectedProduct) {
            const cod_producto = selectedProduct.id;
            const screenInt = parseInt(pantalla);
            const screenUsed = selectedProduct.usado
              ? parseInt(selectedProduct.usado)
              : 0;
            const screenUpdate = screenInt + screenUsed;
            const screenFinally = screenUpdate.toString();
            const cod_productoString = cod_producto.toString();

            const updateProductQuery = `UPDATE ${producto} SET usado = ? WHERE id = ?`;
            const updateProductValues = [screenFinally, cod_producto];

            connection.query(
              updateProductQuery,
              updateProductValues,
              (updateError) => {
                if (updateError) {
                  console.error("Error updating Product: ", updateError);
                  return next(updateError);
                }

                let perfilFinal = '';
                for (let i = 0; i < screenInt; i++) {
                  let perfil = screenUsed + i + 1;
                  perfilFinal += perfil + ', ';
                }
              
                const savePerfil = perfilFinal.slice(0, -2)
                //console.log(savePerfil);

                const createSaleQuery =
                  "INSERT INTO ventas (numero_factura, cod_usuario, producto, pantalla, perfil, cod_producto, costo, estado, fecha) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?)";
                const createSaleValues = [
                  numero_factura,
                  cod_usuario,
                  producto,
                  pantalla,
                  savePerfil,
                  cod_productoString,
                  costo,
                  estado,
                  dateString,
                ];

                connection.query(
                  createSaleQuery,
                  createSaleValues,
                  (createError, createResults) => {
                    if (createError) {
                      console.error("Error inserting Sale: ", createError);
                      return next(createError);
                    }

                    const createdSale = {
                      numero_factura,
                      cod_usuario,
                      producto,
                      pantalla,
                      perfil : savePerfil,
                      cod_producto: cod_productoString,
                      costo,
                      estado,
                      fecha: dateString,
                    };

                    res.json(createdSale);
                  }
                );
              }
            );
          } else {
            res.status(404).send("No available accounts found");
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateSale = async (req, res, next) => {
  const { cod_ventas } = req.params;

  const {
    numero_factura,
    cod_usuario,
    producto,
    pantalla,
    cod_producto,
    costo,
    estado,
    fecha,
  } = req.body;

  try {
    const sql = `UPDATE ventas SET numero_factura = IFNULL(?, numero_factura), cod_usuario = IFNULL(?, cod_usuario), producto = IFNULL(?, producto), pantalla = IFNULL(?, pantalla), cod_producto = IFNULL(?, cod_producto), costo = IFNULL(?, costo), estado = IFNULL(?, estado), fecha = IFNULL(?, fecha) WHERE cod_ventas = ?`;
    const values = [
      numero_factura,
      cod_usuario,
      producto,
      pantalla,
      cod_producto,
      costo,
      estado,
      fecha,
      cod_ventas,
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error updating Sale: ", error);
        res.status(500).send("Error en el server");
        return;
      }
      res.send("Sale updated successfully");
    });
  } catch (error) {
    res.send("Error: " + JSON.stringify(error)).status(500);
    console.error(error);
    next(error);
  }
};

exports.deleteSale = (req, res, next) => {
  try {
    const { cod_ventas } = req.params;
    const sql = `DELETE FROM ventas WHERE cod_ventas = ${cod_ventas}`;

    connection.query(sql, (error) => {
      if (error) throw error;
      res.send("Delete Sale");
    });
  } catch (error) {
    res.send("Error: " + JSON.stringify(error));
    console.error(error);
    next(error);
  }
};
