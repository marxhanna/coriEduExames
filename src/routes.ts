import { Router } from "express";

import CefaleiaController from "./controller/cefaleiaController";
import UsersAuthMiddleware from "./middlewares/users";
import LombalgiaController from "./controller/lombalgiaController";
import DoresAbdominaisController from "./controller/doresAbdominaisController";
import IvasController from "./controller/ivasController";

const routes = Router();

const usersController = new UsersController();
const cefaleiaController = new CefaleiaController();
const lombalgiaController = new LombalgiaController();
const doresAbdominaisController = new DoresAbdominaisController();
const ivasController = new IvasController();

const usersMiddleware = new UsersAuthMiddleware();

routes.get("/users", usersController.index);
routes.post("/users", usersController.store);
routes.post("/users/login", usersController.login);

routes.get("/cefaleia", usersMiddleware.index, cefaleiaController.sinais);
routes.post(
  "/cefaleia/diagnostico",
  usersMiddleware.index,
  cefaleiaController.diagnostico
);
routes.post("/cefaleia/exame", usersMiddleware.index, cefaleiaController.exame);

routes.get("/lombalgia", usersMiddleware.index, lombalgiaController.sinais);
routes.post(
  "/lombalgia/diagnostico",
  usersMiddleware.index,
  lombalgiaController.diagnostico
);
routes.post(
  "/lombalgia/exame",
  usersMiddleware.index,
  lombalgiaController.exame
);

routes.get("/dores", usersMiddleware.index, doresAbdominaisController.sinais);
routes.get(
  "/dores/quadrante",
  usersMiddleware.index,
  doresAbdominaisController.quadrantes
);
routes.post(
  "/dores/sintomas",
  usersMiddleware.index,
  doresAbdominaisController.sintomas
);
routes.post(
  "/dores/exame",
  usersMiddleware.index,
  doresAbdominaisController.exame
);
routes.post(
  "/dores/diagnostico",
  usersMiddleware.index,
  doresAbdominaisController.diagnostico
);

routes.get("/ivas", usersMiddleware.index, ivasController.sinais);
routes.post(
  "/ivas/diagnostico",
  usersMiddleware.index,
  ivasController.diagnostico
);
routes.post("/ivas/exame", usersMiddleware.index, ivasController.exame);

export = routes;
