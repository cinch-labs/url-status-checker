import Ajv, {JSONSchemaType} from 'ajv';
const ajv = new Ajv()

export interface Link {
  url: string
  statusCode: number
  method: 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'PATCH' | 'HEAD'
  body?: string
}

export interface LinksFile {
  links: Link[]
}

const schema: JSONSchemaType<LinksFile> = {
  type: "object",
  definitions: {
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
            type: "string"
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
    links: {$ref: "#/definitions/links"}
  },
  additionalProperties: false,
  required: ["links"]
}

const validateSchema = ajv.compile(schema)

export const isInputFileValid = (data: any) => {
  return !!validateSchema(data);
}
