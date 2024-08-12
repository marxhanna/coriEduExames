"use strict";
const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const routes = require("./dist/routes");
const app = express();
const cors = require("cors");

const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "libs")));
app.use(cors());
app.use("/api/2", routes);

app.get("/", (req, res) => {
  res.render("paginaInicial"); // Não é necessário incluir a extensão .ejs
});
const cefaleiaConfig = {
  host: "corihealth.com.br",
  user: "u469350976_4health",
  password: "bundinha@@2020bB",
  database: "u469350976_cefaleia",
  connectionLimit: 10,
};

const dorAbdominalConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "dor_abdominal",
  connectionLimit: 10,
};

const cefaleiaPool = mysql.createPool(cefaleiaConfig);
const dorAbdominalPool = mysql.createPool(dorAbdominalConfig);

const dbConfigs = {
  cefaleia: cefaleiaPool,
  dorAbdominal: dorAbdominalPool,
};

function queryDatabase(pool, sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, values, (queryError, results) => {
        connection.release();

        if (queryError) {
          reject(queryError);
          return;
        }

        resolve(results);
      });
    });
  });
}

//******************************************************************************************************* */

app.post("/api/receber_alarme", async (req, res) => {
  try {
    const results = await queryDatabase(
      cefaleiaPool,
      "SELECT * FROM sinais",
      []
    );

    res.render("sda", { dados: results });
  } catch (err) {
    console.error(`Error fetching alarm signal data for Cefaleia:`, err);
    return res.status(500).json({
      error: `Error fetching alarm signal data for Cefaleia`,
    });
  }
});

//******************************************************************************************************* */
let consultaResult = null;
let examesResult = null;

app.post("/api/receber_diagnostico", async (req, res) => {
  try {
    const selectedCheckboxes = req.body.sinais_selecionados;
    console.log(selectedCheckboxes);

    // Verifique se selectedCheckboxes é uma matriz; se não for, converta-o em uma matriz.
    const selectedCheckboxesArray = Array.isArray(selectedCheckboxes)
      ? selectedCheckboxes
      : [selectedCheckboxes];

    const placeholders = selectedCheckboxesArray.map(() => "?").join(",");
    const sql = `
      SELECT DISTINCT Diagnostico
      FROM (
          SELECT sinal_alarme, Diagnostico1 AS Diagnostico FROM sinais
          UNION ALL
          SELECT sinal_alarme, Diagnostico2 FROM sinais
          UNION ALL
          SELECT sinal_alarme, Diagnostico3 FROM sinais
          UNION ALL
          SELECT sinal_alarme, Diagnostico4 FROM sinais
          UNION ALL
          SELECT sinal_alarme, Diagnostico5 FROM sinais
          UNION ALL
          SELECT sinal_alarme, Diagnostico6 FROM sinais
          UNION ALL
          SELECT sinal_alarme, Diagnostico7 FROM sinais
          UNION ALL
          SELECT sinal_alarme, Diagnostico8 FROM sinais
         
      ) AS subquery
      WHERE Diagnostico IS NOT NULL
      AND sinal_alarme IN (${placeholders});
    `;

    const consultaResult = await queryDatabase(
      cefaleiaPool,
      sql,
      selectedCheckboxesArray
    );

    res.render("diagnostico", { data: consultaResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//******************************************************************************************************* */

// Remova a declaração de examesResult neste local

app.post("/api/receber_exame", async (req, res) => {
  try {
    const receivedData = req.body.sinais_selecionados;

    if (!Array.isArray(receivedData)) {
      throw new Error("Received data is not an array");
    }

    if (receivedData.length === 0) {
      throw Error("Received data array is empty");
    }

    const placeholders = receivedData.map(() => "?").join(",");
    const sql = `
      SELECT DISTINCT Exame
      FROM (
          SELECT DiagnosticoNome AS Diagnostico, Exame1 AS Exame FROM diagnostico
          UNION ALL
          SELECT DiagnosticoNome, Exame2 FROM Diagnostico
          UNION ALL
          SELECT DiagnosticoNome, Exame3 FROM Diagnostico
          UNION ALL
          SELECT DiagnosticoNome, Exame4 FROM Diagnostico
          UNION ALL
          SELECT DiagnosticoNome, Exame5 FROM Diagnostico
          UNION ALL
          SELECT DiagnosticoNome, Exame6 FROM Diagnostico
          UNION ALL
          SELECT DiagnosticoNome, Exame7 FROM Diagnostico
      ) AS subquery
      WHERE Exame IS NOT NULL
      AND Diagnostico IN (${placeholders});`;

    const values = receivedData;
    examesResult = JSON.parse(
      JSON.stringify(await queryDatabase(cefaleiaPool, sql, values))
    );

    // Extrair os valores Exame dos resultados da primeira consulta
    const exameValues = examesResult.map((item) => item.Exame);

    const sql_descricao = `SELECT DISTINCT Exame, Descricao
                FROM Exame
                WHERE Exame IN (?);
                `;

    const descricaoResult = {};

    for (const exame of exameValues) {
      const descricaoData = await queryDatabase(
        cefaleiaPool,
        sql_descricao,
        exame
      );
      if (descricaoData.length > 0) {
        descricaoResult[exame] = descricaoData[0].Descricao;
      }
    }

    // Junte os dados em um único JSON
    const combinedData = examesResult.map((item) => {
      return {
        Exame: item.Exame,
        Descricao: descricaoResult[item.Exame] || "Descrição não encontrada",
      };
    });

    res.render("exames", { data: combinedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//******************************************************************************************************* */

app.post("/api/receber_descricao", async (req, res) => {
  try {
    const dados = examesResult;

    if (!dados) {
      throw new Error("Received data is missing");
    }

    // Extract the diagnoses into an array of strings
    const exame = dados.map((item) => item.Exame);

    // Create placeholders for the parameter values in the query
    const placeholders = exame.map(() => "?").join(",");

    const sql = `SELECT DISTINCT Exame, Descricao
                FROM Exame
                WHERE Exame IN (?);
                `;

    const values = exame; // Use the array of Exame directly

    descricaoResult = JSON.parse(
      JSON.stringify(await queryDatabase(cefaleiaPool, sql, values))
    );
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//******************************************************************************************************* */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
