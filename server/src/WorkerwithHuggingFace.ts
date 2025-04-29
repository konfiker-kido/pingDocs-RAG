import { Worker } from 'bullmq';
import { connection } from './app';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { QdrantVectorStore } from '@langchain/qdrant';

// Worker setup
const worker = new Worker(
  'fileUploadQueue',
  async (job) => {
    console.log('Processing job:', job.id, job.data);

    // 1. Load PDF
    const loader = new PDFLoader(job.data.path);
    const docs = await loader.load();

    // 2. Split into chunks
    const splitter = new CharacterTextSplitter({
      chunkSize: 300,
      chunkOverlap: 1,
    });
    const splitDocs = await splitter.splitDocuments(docs);
    console.log('===== Split Documents =====', splitDocs.length);

    // 3. Use FREE HuggingFace Embeddings
    const embedding = new HuggingFaceInferenceEmbeddings({
      model: 'sentence-transformers/all-MiniLM-L6-v2', // fast & small
    });

    // 4. Connect to Qdrant and store vectors
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embedding, {
      url: 'http://localhost:6333',
      collectionName: 'pdf-docs',
    });

    await vectorStore.addDocuments(splitDocs); // Note: splitDocs instead of docs!
  },
  { connection }
);

console.log('Worker is running and listening...');

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, failedReason) => {
  console.error(`Job ${job?.id} failed:`, failedReason);
});
