import { Request, Response } from "express";
import { Op, literal } from "sequelize";
import CefaleiaExame from "../database/models/cefaleiaExame";
import CefaleiaSinaisAlarme from "../database/models/cefaleiaSinaisAlarme";
import CefaleiaDiagnostico from "../database/models/cefaleiaDiagnostico";

const APP_SIGNATURE = `app_${process.env.APP_SIGNATURE}`;

export default class CefaleiaController {
  async sinais(request: Request, response: Response) {
    try {
      const cefaleia = await CefaleiaSinaisAlarme.findAll();
      return response.json(cefaleia.map((cefaleia) => cefaleia.SinalAlarme));
    } catch (error) {
      // handle error here
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async diagnostico(request: Request, response: Response) {
    try {
      const sinais = request.body.sinais as string[];
      const diagnosticos = await CefaleiaSinaisAlarme.findAll({
        attributes: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `Diagnostico${i}`),
        where: {
          SinalAlarme: {
            [Op.in]: sinais,
          },
        },
      });
      const uniqueDiagnosticos = diagnosticos
        .map((diagnostico) => {
          const values = Object.values(diagnostico.dataValues);
          return values;
        })
        .flat(1)
        .filter((item, pos, self) => self.indexOf(item) == pos)
        .filter((item) => item != null);

      return response.json(uniqueDiagnosticos);
    } catch (error) {
      // handle error here
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async exame(request: Request, response: Response) {
    try {
      const diganosticos = request.body.diganosticos as string[];
      const exames = await CefaleiaDiagnostico.findAll({
        attributes: ["Diagnostico", "Classificacao"],
        include: [
          {
            model: CefaleiaExame,
            attributes: ["Exame", "Descricao"],
          },
        ],
        where: {
          Exame: {
            [Op.in]: literal(
              "(SELECT DISTINCT Exame FROM cefaleia_Diagnostico)"
            ),
          },
          Diagnostico: {
            [Op.in]: diganosticos,
          },
          Classificacao: {
            [Op.lte]: 2, // Utiliza o operador 'menor ou igual a' para filtrar as classificações
          },
        },
        order: [["Classificacao", "ASC"]],
      });
      return response.json(exames);
    } catch (error) {
      // handle error here
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
