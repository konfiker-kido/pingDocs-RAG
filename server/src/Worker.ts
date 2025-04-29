import { Worker } from 'bullmq';
import { connection } from './app';  
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {CharacterTextSplitter, TextSplitter} from  "langchain/text_splitter";
import { OpenAIEmbeddings } from '@langchain/openai';
import {QdrantClient} from '@qdrant/js-client-rest';
import { QdrantVectorStore } from '@langchain/qdrant';
import { VectorStore } from '@langchain/core/vectorstores';
// Initialize the worker
const worker = new Worker(
  'fileUploadQueue',  // Queue name
  async (job) => {
    console.log('Processing job:', job.id, job.data);
  /*
  
    Path: data.path
    read the pdf from the path
    chunk the pdf
    call the openai embedding model for every chunk,
    store the chunk in qudrantDB
   */

    const loader = new PDFLoader(job.data.path);
    const docs = await loader.load();


    const splitter = new CharacterTextSplitter({
        chunkSize: 300,
        chunkOverlap: 1,
      }); 
 
 
      const splitDocs = await splitter.splitDocuments(docs);
    // const output = await splitter.createDocuments([docs]);
    console.log("=====  spilt docesss ===== ", splitDocs);
    
    // const client = new QdrantClient({ url: 'http://localhost:6333' });
    const embedding = new OpenAIEmbeddings({
        model:'text-embedding-3-small',
        apiKey: process.env.OPEN_AI_API_KEY
     })

     const vectorStore = await QdrantVectorStore.fromExistingCollection(
         embedding,
         {
            url:'http://localhost:6333',
            collectionName:'pdf-docs'
         }

         );

        await vectorStore.addDocuments(docs);



  },
  { connection }   // Pass the Redis connection
);

console.log("here in the worker file ======="); 
worker.on('completed', (job) => {
  console.log(`Job ${job.id} has been completed!`);
});

worker.on('failed', (job, failedReason) => {
  console.log(`Job ${job?.id} failed with reason: ${failedReason}`);
});
