const { connection } = require("../DataBase/db");
const { promisify } = require("util");

exports.getAllSales = (req, res, next) => {
  const sql = `SELECT v.cod_ventas, v.cod_usuario, u.identificacion, v.numero_factura, CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario, v.producto, v.pantalla, 
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
         WHEN v.producto = 'directv' THEN ap.correo
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
         WHEN v.producto = 'directv' THEN ap.contrasena
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
LEFT JOIN directv ap ON v.cod_producto = ap.id
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
  const sql = `SELECT v.cod_ventas, v.cod_usuario,u.identificacion, v.numero_factura, CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario, v.producto, v.pantalla, 
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
         WHEN v.producto = 'directv' THEN ap.correo
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
         WHEN v.producto = 'directv' THEN ap.contrasena
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
LEFT JOIN directv ap ON v.cod_producto = ap.id
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
    const dateString = date.toISOString().slice(0, 19).replace("T", " "); // Formato ISO para la fecha y hora

    const { cod_usuario, producto, pantalla, costo, estado } = req.body;

    // Obtener el último número de factura registrado en la tabla ventas
    const getLastInvoiceNumberQuery =
      "SELECT COALESCE(MAX(numero_factura), 0) AS lastInvoice FROM ventas";
    const lastInvoiceNumberResult = await promisify(connection.query).call(
      connection,
      getLastInvoiceNumberQuery
    );
    const numero_factura = lastInvoiceNumberResult[0].lastInvoice + 1;

    const selectProductQuery = `SELECT * FROM ${producto} WHERE pantalla != 'usado'`;
    const selectProductResults = await promisify(connection.query).call(
      connection,
      selectProductQuery
    );
    const selectedProduct = selectProductResults.find((product) => {
      const screenInt = parseInt(pantalla);
      const screenUsed = product.usado ? parseInt(product.usado) : 0;
      return screenInt + screenUsed <= 4;
    });

    if (!selectedProduct) {
      return res.status(404).send("No available accounts found");
    }

    const cod_producto = selectedProduct.id;
    const screenInt = parseInt(pantalla);
    const screenUsed = selectedProduct.usado
      ? parseInt(selectedProduct.usado)
      : 0;
    const screenUpdate = screenInt + screenUsed;
    const screenFinally = screenUpdate.toString();
    const cod_productoString = cod_producto.toString();

    const updateProductQuery = `UPDATE ${producto} SET usado = ? WHERE id = ?`;
    await promisify(connection.query).call(connection, updateProductQuery, [
      screenFinally,
      cod_producto,
    ]);

    let perfilFinal = "";
    for (let i = 0; i < screenInt; i++) {
      let perfil = screenUsed + i + 1;
      perfilFinal += perfil + ", ";
    }
    let savePerfil;

    if (producto === "directv") {
      savePerfil = "1,2";
    } else if (producto === "spotify" || producto === "youtube") {
      savePerfil = "1";
    } else {
      savePerfil = perfilFinal.slice(0, -2);
    }

    const createSaleQuery =
      "INSERT INTO ventas (numero_factura, cod_usuario, producto, pantalla, perfil, cod_producto, costo, estado, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
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

    const createSaleResult = await promisify(connection.query).call(
      connection,
      createSaleQuery,
      createSaleValues
    );
    const createdSale = {
      numero_factura,
      cod_usuario,
      producto,
      pantalla,
      perfil: savePerfil,
      cod_producto: cod_productoString,
      costo,
      estado,
      fecha: dateString,
    };

    res.json(createdSale);
  } catch (error) {
    console.error("Error creating sale: ", error);
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
    const sql = `UPDATE ventas 
                 SET numero_factura = IFNULL(?, numero_factura), 
                     cod_usuario = IFNULL(?, cod_usuario), 
                     producto = IFNULL(?, producto), 
                     pantalla = IFNULL(?, pantalla), 
                     cod_producto = IFNULL(?, cod_producto), 
                     costo = IFNULL(?, costo), 
                     estado = IFNULL(?, estado), 
                     fecha = IFNULL(?, fecha) 
                 WHERE cod_ventas = ?`;

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

    const result = await promisify(connection.query).call(
      connection,
      sql,
      values
    );

    if (result.affectedRows === 0) {
      res.status(404).send("Sale not found");
    } else {
      res.send("Sale updated successfully");
    }
  } catch (error) {
    console.error("Error updating Sale: ", error);
    res.status(500).send("Error en el servidor");
    next(error);
  }
};

exports.deleteSale = async (req, res, next) => {
  try {
    const { cod_ventas } = req.params;

    // Obtener los datos de la venta que se va a eliminar
    const getSaleQuery = `SELECT * FROM ventas WHERE cod_ventas = ?`;
    const saleResults = await promisify(connection.query).call(
      connection,
      getSaleQuery,
      [cod_ventas]
    );

    if (saleResults.length === 0) {
      // No se encontró la venta
      return res.status(404).send("Sale not found");
    }

    const sale = saleResults[0];
    const { pantalla, cod_producto } = sale;

    // Actualizar la tabla del servicio
    const updateServiceQuery = `UPDATE ${sale.producto} SET usado = usado - ? WHERE id = ?`;
    const updateServiceValues = [pantalla, cod_producto];

    await promisify(connection.query).call(
      connection,
      updateServiceQuery,
      updateServiceValues
    );

    // Eliminar la venta de la tabla de ventas
    const deleteSaleQuery = `DELETE FROM ventas WHERE cod_ventas = ?`;
    await promisify(connection.query).call(connection, deleteSaleQuery, [
      cod_ventas,
    ]);

    res.send("Sale deleted");
  } catch (error) {
    console.error("Error deleting sale: ", error);
    next(error);
  }
};
