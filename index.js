const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');
require('dotenv').config()

async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');

    // Quick start code goes here
    const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
  console.log(AZURE_STORAGE_CONNECTION_STRING);

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error("Azure Storage Connection string not found");
}

// Create the BlobServiceClient object which will be used to create a container client
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
// we will have to define containername and containerclient

const containerName = "files";
const containerClient = blobServiceClient.getContainerClient(containerName);

// we will also have to define blobname and blockblobclient

const blobName = "gap_uat_profile_extract_2022042001000203.csv";
const blockBlobClient = containerClient.getBlockBlobClient(blobName);


// (basically code to download blob)
// Get blob content from position 0 to the end 
// In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
// In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody


const downloadBlockBlobResponse = await blockBlobClient.download(0);
console.log("\nDownloaded blob content...");
console.log(
  "\t",
  await streamToText(downloadBlockBlobResponse.readableStreamBody)
);
// downloading blob ends

}


// Convert stream to text

async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}







main()
.then(() => console.log('Done'))
.catch((ex) => console.log(ex.message));