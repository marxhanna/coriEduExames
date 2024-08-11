import { Request, Response } from "express";
import { Op, literal } from "sequelize";
import LombalgiaSinaisAlarme from "../database/models/lombalgiaSinaisAlarme";
import LombagiaDiagnostico from "../database/models/lombalgiaDiagnostico";
import LombalgiaExame from "../database/models/lombalgiaExame";


const APP_SIGNATURE = `app_${process.env.APP_SIGNATURE}`;

export default class LombalgiaController {
    async sinais(request: Request, response: Response){
      try {
        const lombalgia = await LombalgiaSinaisAlarme.findAll();

        return response.json(lombalgia.map(lombalgia => lombalgia.SinalAlarme));
      } catch (error) {
        return response.status(400).send("Internal Error");
      }
    }

    async diagnostico(request: Request, response: Response){
      try {
        const sinais = request.body.sinais as string[];

        const diagnosticos = await LombalgiaSinaisAlarme.findAll({
          attributes: [1,2,3,4].map(i => `Diagnostico${i}`),
          where: {
            SinalAlarme: {
              [Op.in]: sinais
            }
          }
        });
  
        const uniqueDiagnosticos = diagnosticos.map(diagnostico => {
          const values = Object.values(diagnostico.dataValues);
  
          return values
        })
        .flat(1)
        .filter((item, pos, self)=> self.indexOf(item) == pos)
        .filter((item) => item != null);
  
        return response.json(uniqueDiagnosticos);
      } catch (error) {
        return response.status(400).send("Internal Error");
      }
    }

    async exame(request: Request, response: Response){
      try {
        const diganosticos = request.body.diganosticos as string[];

        const exames = await LombagiaDiagnostico.findAll({
          attributes: ['Diagnostico', 'Classificacao'],
          include: [
            {
              model: LombalgiaExame,
              attributes: ['Exame', 'Descricao'],
            }
          ],
          where: {
            Exame: {
              [Op.in]: literal('(SELECT DISTINCT Exame FROM lombalgia_Diagnostico)')
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
        return response.status(400).send("Internal Error");
      }
    }
}