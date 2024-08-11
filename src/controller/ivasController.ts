import { Request, Response } from "express";
import { Op, literal } from "sequelize";
import IvasSintomas from "../database/models/ivasSintomas";
import IvasTratamento from "../database/models/ivasTratamento";
import IvasEtiologia from "../database/models/ivasEtiologa";

export default class IvasController {
  async sinais(request: Request, response: Response) {
    try {
      const sinais = await IvasSintomas.findAll({
        attributes: ["SinalAlarme"]
      });
  
      return response.json(sinais.map(sinal => sinal.SinalAlarme));
    } catch (error) {
      return response.status(400).send("Internal Error");
    }
  }
  
  async diagnostico(request: Request, response: Response) {
    try {
      const sinais = request.body.sinais as string[];
  
      const diagnosticos = await IvasSintomas.findAll({
        attributes: [1,2,3,4].map(i => `Etiologia${i}`),
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
      .filter((item, pos, self) => self.indexOf(item) == pos)
      .filter((item) => item != null);

      console.log(uniqueDiagnosticos)
  
      return response.json(uniqueDiagnosticos);
    } catch (error) {
      return response.status(400).send("Internal Error");
    }
  }
  
  async exame(request: Request, response: Response) {
    try {
      const diganosticos = request.body.diganosticos as string[];
  
      const exames = await IvasEtiologia.findAll({
        attributes: ['Etiologia', 'Classificacao'],
        include: [
          {
            model: IvasTratamento,
            attributes: ['Tratamento', 'Descricao'],
          }
        ],
        where: {
          Etiologia: {
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