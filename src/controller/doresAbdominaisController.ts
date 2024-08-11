import { Request, Response } from "express";
import { Op, literal } from "sequelize";
import DoresAbdominaisSinaisAlarme from "../database/models/doresAbdominaisSinaisAlarme";
import DoresAbdominaisQSD from "../database/models/doresAbdominaisQSD";
import DoresAbdominaisDiagnostico from "../database/models/doresAbdominaisDiagnostico";
import DoresAbdominaisExame from "../database/models/doresAbdominaisExame";

const APP_SIGNATURE = `app_${process.env.APP_SIGNATURE}`;

export default class DoresAbdominaisController {
  async sinais(request: Request, response: Response) {
      try {
          const dores = await DoresAbdominaisSinaisAlarme.findAll();
          return response.json(dores.map(dores => dores.Sinal));
      } catch (error) {
          console.error(error);
          response.status(500).send("An error occurred");
      }
  }

  async diagnostico(request: Request, response: Response) {
      try {
          const sinais = request.body.sinais as string[];
          const diagnosticos = await DoresAbdominaisQSD.findAll({
              attributes: [1, 2, 3, 4].map(i => `Diagnostico${i}`),
              where: {
                  Sintomas: {
                      [Op.in]: sinais
                  }
              }
          });
          const uniqueDiagnosticos = diagnosticos.map(diagnostico => {
              const values = Object.values(diagnostico.dataValues);
              return values;
          })
          .flat(1)
          .filter((item, pos, self) => self.indexOf(item) == pos)
          .filter((item) => item != null);
          return response.json(uniqueDiagnosticos);
      } catch (error) {
          console.error(error);
          response.status(500).send("An error occurred");
      }
  }

  async quadrantes(request: Request, response: Response) {
      try {
          const quadrante = await DoresAbdominaisQSD.findAll({
              attributes: ["Quadrante"],
              group: ["Quadrante"]
          });
          return response.json(quadrante.map(q => q.Quadrante));
      } catch (error) {
          console.error(error);
          response.status(500).send("An error occurred");
      }
  }

  async sintomas(request: Request, response: Response) {
      try {
          const { quadrante } = request.body;
          const sintomas = await DoresAbdominaisQSD.findAll({
              where: {
                  Quadrante: quadrante
              }
          });
          return response.json(sintomas.map(s => s.Sintomas));
      } catch (error) {
          console.error(error);
          response.status(500).send("An error occurred");
      }
  }

  async exame(request: Request, response: Response) {
      try {
          const diganosticos = request.body.diganosticos as string[];
          const exames = await DoresAbdominaisDiagnostico.findAll({
              attributes: ['Diagnostico', 'Classificacao'],
              include: [
                  {
                      model: DoresAbdominaisExame,
                      attributes: ['Exame', 'Descricao'],
                  }
              ],
              where: {
                  Exame: {
                      [Op.in]: literal('(SELECT DISTINCT Exame FROM dorAbdominal_Diagnostico)')
                  },
                  Diagnostico: {
                      [Op.in]: diganosticos
                  },
                  Classificacao: {
                    [Op.lte]: 2 // Utiliza o operador 'menor ou igual a' para filtrar as classificações
                    }
              },
              order: [
                  ['Classificacao', 'ASC']
              ]
          });
          return response.json(exames);
      } catch (error) {
          console.error(error);
          response.status(500).send("An error occurred");
      }
  }
}