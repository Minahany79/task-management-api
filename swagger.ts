import { sanitizedConfig } from "./config";

export const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: sanitizedConfig.SERVICE_NAME,
    description: "Technical Task: Task Management API",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: sanitizedConfig.NODE_ENV == "prod" ? sanitizedConfig.DEPLOYMENT_HOST : `localhost:${sanitizedConfig.PORT}`,
  paths: {
    "/api/v1/Users/Login": {
      post: {
        tags: ["Users"],
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "Login",
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },

    "/api/v1/Users/Register": {
      post: {
        tags: ["Users"],
        summary: "Register User",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "Login",
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },

    "/api/v1/Users/": {
      delete: {
        tags: ["Users"],
        summary: "Delete my current user account",
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },

    "/api/v1/Users/current": {
      get: {
        tags: ["Users"],
        summary: "Get my current profile",
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update my current profile",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "update",
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },

    "/api/v1/Users/ChangePassword": {
      put: {
        tags: ["Users"],
        summary: "Update user password",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "ChangePassword",
            schema: {
              type: "object",
              required: ["oldPassword", "newPassword"],
              properties: {
                oldPassword: {
                  type: "string",
                },
                newPassword: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },

          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },

    "/api/v1/tasks/": {
      post: {
        tags: ["Tasks"],
        summary: "Create new task",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "CreateTask",
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
      get: {
        tags: ["Tasks"],
        summary: "Get all tasks",
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },

    "/api/v1/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Get task by id",
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Update task",
        consumes: ["application/json"],
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
          },
          {
            in: "body",
            name: "update",
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },

      delete: {
        tags: ["Tasks"],
        summary: "Delete task",
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },

    "/api/v1/tasks/{id}/complete": {
      patch: {
        tags: ["Tasks"],
        summary: "Mark task as completed",
        parameters: [
          {
            in: "path",
            name: "id",
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "ok",
          },
          "400": {
            description: "bad request",
          },
          "401": {
            description: "Un Authorized",
          },
          "403": {
            description: "Forbidden",
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "internal server error",
          },
        },
      },
    },
  },
  securityDefinitions: {
    bearerAuth: {
      name: "Authorization",
      in: "header",
      type: "apiKey",
      description: "JWT Authorization Header",
    },
  },
  security: [{ bearerAuth: [] }],
};
