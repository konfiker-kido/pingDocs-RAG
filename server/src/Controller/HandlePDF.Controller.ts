import { Queue } from 'bullmq';
import { connection } from '../app';
import OpenAI from 'openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from '@langchain/qdrant';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { ChatOllama } from '@langchain/community/chat_models/ollama';


const queue = new Queue('fileUploadQueue', {connection:connection});

export const uploadPDF = async(req:any, res:any)=>{
    
  try{

      await queue.add('',{
             destination: req.file.destination,
             path: req.file.path
       })
    
    
       return res.status(200).json({ 
            message: 'File uploaded',
            filename: req.file?.filename,
            path: req.file?.path
       });
  }catch(error){
    return res.status(401).json({ message: 'Internal server error' })
  }

}

// const client = new OpenAI({
//     apiKey: process.env.OPEN_AI_API_KEY,
// });

export const chat = async (req:any, res:any) => {
   
  //  try{
  //   const userQuery = req.query.message;
  
  //   const embeddings = new OpenAIEmbeddings({
  //     model: 'text-embedding-3-small',
  //     apiKey: '',
  //   });

  //   const vectorStore = await QdrantVectorStore.fromExistingCollection(
  //     embeddings,
  //     {
  //       url: 'http://localhost:6333',
  //       collectionName: 'langchainjs-testing',
  //     }
  //   );
  //   const ret = vectorStore.asRetriever({
  //     k: 2,
  //   });
  //   const result = await ret.invoke(userQuery);
  
  //   const SYSTEM_PROMPT = `
  //       You are helfull AI Assistant who answeres the user query based on the available context from PDF File.
  //       Context:
  //       ${JSON.stringify(result)}
  //   `;
  
  //   const chatResult = await client.chat.completions.create({
  //     model: 'gpt-4.1',
  //     messages: [
  //       { role: 'system', content: SYSTEM_PROMPT },
  //       { role: 'user', content: userQuery },
  //     ],
  //   });
  
  //   return res.json({
  //     message: chatResult.choices[0].message.content,
  //     docs: result,
  //   });
  //  }catch(error:any){
  //   return res.status(401).json({message: "Internal Server error"});
  //  }
   

 }



export const chatWithOllma = async (req: any, res: any) => {
  try {
    const userQuery = req.query.message;

    // 1. Free Embeddings
    const embeddings = new HuggingFaceInferenceEmbeddings({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
    });

    // 2. Vector store with Qdrant
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: 'http://localhost:6333',
      collectionName: 'langchainjs-testing',
    });

    const ret = vectorStore.asRetriever({ k: 2 });
    const result = await ret.invoke(userQuery);

    console.log("===== respons from vector store =====", result);
    // 3. System Prompt
    const SYSTEM_PROMPT = `
      You are a helpful AI Assistant who answers user queries based on context from a PDF file.
      Context:
      ${JSON.stringify(result)}
    `;

    // 4. Free LLM using Ollama (Mistral, LLaMA2, etc.)
    const model = new ChatOllama({
      baseUrl: 'http://localhost:11434',
      model: 'llama2', // or 'llama2', 'gemma', etc.
    });

    const response = await model.invoke([
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userQuery },
    ]);

   console.log("@@@@@@@@@@@", response);
    return res.json({
      message: response.content,
      docs: result,
    });
  } catch (error: any) {
    console.error('Chat Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

