import Ajv, {JSONSchemaType} from 'ajv';
import {HttpMethod} from "./link";

const ajv = new Ajv()

export interface Link {
  url: string
  statusCode: number
  method: HttpMethod
  body?: string
}

export interface LinksFile {
  baseUrl?: string
  links: Link[]
}

const schema: JSONSchemaType<LinksFile> = {
  type: "object",
  definitions: {
    baseUrl: {
      type: "string"
    },
    links: {
      type: "array",
      items: {
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          statusCode: {
            type: "number"
          },
          method: {
            type: "string",
          },
          body: {
            type: "string"
          }
        },
        additionalProperties: false,
        required: ["url", "statusCode", "method"]
      },
    }
  },
  properties: {
    baseUrl: {$ref: "#/definitions/baseUrl"},
    links: {$ref: "#/definitions/links"}
  },
  additionalProperties: false,
  required: ["links"]
}

const validateSchema = ajv.compile(schema)

export const isInputFileValid = (data: any) => {
  return !!validateSchema(data);
}
