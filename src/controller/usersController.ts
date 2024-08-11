import { Request, Response } from "express";
import { Users } from "../database";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import crypto from "crypto";

const APP_SIGNATURE = `app_${process.env.APP_SIGNATURE}`;

export default class UsersController {
    async index(request: Request, response: Response){
        return response.json({
            certo: "Sim"
        });
    }

    async store(request: Request, response: Response){
        const { ocupation } = request.body;
        try {
            const { 
                name, 
                email, 
                password, 
                birthdate, 
                phone, 
                work_institution 
            } = request.body;
            const salt = await bcrypt.genSalt(10);

            const existentUser = await Users.findOne({
                where: {
                    email
                }
            });

            if(existentUser){
                return response.status(400).json({
                    error: "Email já cadastrado"
                });
            }

            if(ocupation === "Médico"){
                const {
                    crm,
                    area
                } = request.body;
                const hash = await bcrypt.hash(password, salt);

                const user = await Users.create({
                    uuid: crypto.randomUUID(),
                    name,
                    email,
                    password: hash,
                    birthdate,
                    phone,
                    crm,
                    area,
                    work_institution
                });
                
                return response.json(user);
            }else if(ocupation === "Estudante"){
                const { 
                    institution, 
                    start_year,
                    area
                 } = request.body;

                 const hash = await bcrypt.hash(password, salt);

                 const user = await Users.create({
                    uuid: crypto.randomUUID(),
                    name,
                    email,
                    password: hash,
                    birthdate,
                    phone,
                    institution,
                    start_year,
                    area,
                    work_institution
                });

                return response.json(user);
            } else {
                return response.status(400).json({
                    error: "Ocupação inválida"
                });
            }
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;
    
        try {
            const user = await Users.findOne({
                where: {
                    email
                }
            });
    
            if (!user) {
                return response.status(400).json({ error: "Email inválido" });
            }
    
            const isSamePassword = await bcrypt.compare(password, user.password);
    
            if (!isSamePassword) {
                return response.status(400).json({ error: "Senha inválida" });
            }
    
            const token = Jwt.sign({
                uuid: user.id,
                role: user.crm ? "Médico" : "Estudante"
            }, APP_SIGNATURE as string);
    
            return response.json(token);
        } catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }
    
}