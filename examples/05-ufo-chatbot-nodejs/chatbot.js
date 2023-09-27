import { Metal } from "@getmetal/metal-sdk";
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();




const api_key = process.env.METAL_API_KEY;
const client_id = process.env.METAL_CLIENT_ID;

const metal = new Metal(api_key, client_id);


async function addDatasource(dataSourcePayload) {
  const response = await metal.addDatasource(dataSourcePayload);
  return response;
}


function handleResponse(response) {
  console.log(response);
  const id = response.id;
  createIndexWithDatasourceID(id);

  const folderPath = 'data';
  addDataEntities(id, folderPath);
}


async function createIndexWithDatasourceID(id) {
  const payload = {
    model: "text-embedding-ada-002",
    name: "AARO Index",
    datasource: id,
    indexType: "FLAT",
    dimensions: 1536,
  };

  const newIndex = await metal.addIndex(payload);
  console.log(newIndex);
}


async function addDataEntity(id, filePath) {
  const results = await metal.addDataEntity({
    datasource: id,
    filepath: filePath
  });
  console.log(results);
}


async function addDataEntities(id, folderPath) {
  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      await addDataEntity(id, filePath);
    }
  } catch (error) {
    console.error('Error in addDataEntities:', error);
  }
}


const dataSourcePayload = {
  name: "AARO Reports",
  sourcetype: "file",
  autoExtract: true,
  metadataFields: [
    {
      "name": "context",
      "type": "string",
      "description": "What is the name of the report?"
    }
  ]
};


async function main() {
  const response = await addDatasource(dataSourcePayload);
  handleResponse(response);
}

main();
