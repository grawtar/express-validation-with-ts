import express, { Request, Response, NextFunction } from "express";
import _schema from "./_schema";
import { UserPostRequest } from "./schema_definition";
import Ajv from "ajv";

const app = express();
app.use(express.json());

const ajv = new Ajv();

// validation middleware
function validateBody(schema: object) {
  // compile schema
  const validate = ajv.compile(schema);
  // middleware that returns error if schema is not ok
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.body)) return res.status(400).json(validate.errors);
    return next();
  };
}

// helper type
type RequestBody<T> = Request<{}, {}, T>;

// dummy function
function addUser(name: string) {}

app.post("/user", validateBody(_schema.UserPostRequest), (req: RequestBody<UserPostRequest>, res: Response) => {
  return addUser(req.body.name); // name will never be undefined
});

app.listen(3000);
