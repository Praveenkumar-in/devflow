const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevFlow API",
      version: "1.0.0",
      description: "API Documentation for DevFlow Backend"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            full_name: {
              type: "string",
              example: "John Doe"
            },
            email: {
              type: "string",
              example: "john@example.com"
            },
            role: {
              type: "string",
              example: "Admin"
            }
          }
        },

        Project: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            name: {
              type: "string",
              example: "DevFlow"
            },
            description: {
              type: "string",
              example: "Project Management System"
            },
            status: {
              type: "string",
              example: "Active"
            }
          }
        },

        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 10
            },
            project_id: {
              type: "integer",
              example: 1
            },
            assigned_to: {
              type: "integer",
              example: 2
            },
            title: {
              type: "string",
              example: "Implement Login"
            },
            description: {
              type: "string",
              example: "Create JWT authentication"
            },
            priority: {
              type: "string",
              example: "High"
            },
            status: {
              type: "string",
              example: "Pending"
            },
            due_date: {
              type: "string",
              format: "date"
            }
          }
        },

        Team: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            team_name: {
              type: "string",
              example: "Backend Team"
            },
            description: {
              type: "string",
              example: "Handles backend APIs"
            }
          }
        },

        Bug: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            title: {
              type: "string",
              example: "Login API Error"
            },
            description: {
              type: "string",
              example: "JWT token not generated"
            },
            severity: {
              type: "string",
              example: "High"
            },
            status: {
              type: "string",
              example: "Open"
            }
          }
        },

        Notification: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            title: {
              type: "string",
              example: "Task Assigned"
            },
            message: {
              type: "string",
              example: "You have been assigned a new task."
            },
            is_read: {
              type: "boolean",
              example: false
            }
          }
        },

        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            message: {
              type: "string",
              example: "Unauthorized"
            }
          }
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsDoc(options);