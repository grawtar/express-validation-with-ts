const path = require("path");
const tjs = require("typescript-json-schema");
const fs = require("fs");

const settings = {
  required: true,
};
const compilerOptions = {
  strictNullChecks: true,
};

const program = tjs.getProgramFromFiles([path.resolve("schema_definition.ts")], compilerOptions, "./");

const schema = tjs.generateSchema(program, "*", settings);
fs.writeFileSync(
  "_schema.ts",
  "const schema = " + JSON.stringify(schema) + " as const;\nexport default schema.definitions;"
);