import { Express, Request, Response } from "express";
import {
  createProductHander,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middlewares/requireUser";
import validateResource from "./middlewares/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schemas/product.schema";
import { createSessionSchema } from "./schemas/session.schema";
import { createUserSchema } from "./schemas/user.schema";

function routes(app: Express) {
  /**
   * @openapi
   * tags:
   *   name: HealthCheck
   *   description:
   * /healthcheck:
   *   get:
   *     tags: [HealthCheck]
   *     summary:
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running.
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * tags:
   *   name: User
   *   description:
   * /api/users:
   *   post:
   *     tags: [User]
   *     summary:
   *     description: Register a User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateUserResponse'
   *       409:
   *         description: Conflict.
   *       400:
   *         description: Bad Request.
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHander
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  /**
   * @openapi
   * tags:
   *   name: Product
   *   description:
   * /api/products/{productId}:
   *   get:
   *     tags: [Product]
   *     summary:
   *     description: Get a single product by the productId
   *     parameters:
   *       - name: productId
   *         in: path
   *         description: The id of the product
   *         required: true
   *     responses:
   *       200:
   *         description: Success.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found.
   */
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
