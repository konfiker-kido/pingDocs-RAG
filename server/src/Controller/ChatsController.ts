
export const chats = async(req:any, res:any)=>{
      
    try{

            const requestMessage = req.body?.message; 
           console.log("request came==", req.body)
            const responseMessage = sampleQA.map((QA:any)=>{
                    if(QA.question===requestMessage?.trim()) return QA.answer;
            });
            return res.status(200).json({message:"Success message", responseMessage}); 
      }catch(error){
        return res.status(401).json({status: 'Failed', message:error})
      }
}

// data/sampleQA.ts

export const sampleQA = [
    {
      question: "What is Node.js?",
      answer: "Node.js is a runtime environment that allows you to run JavaScript code outside of a web browser. It is built on Chrome's V8 JavaScript engine."
    },
    {
      question: "What is Express.js?",
      answer: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
    },
    {
      question: "What is the MERN stack?",
      answer: "The MERN stack is a collection of technologies — MongoDB, Express.js, React.js, and Node.js — used to build full-stack web applications."
    },
    {
      question: "How do you handle errors in Express?",
      answer: "In Express, errors are handled using middleware with four parameters: (err, req, res, next). This allows centralized error handling."
    },
    {
      question: "How do you connect Node.js to MongoDB?",
      answer: "You can connect Node.js to MongoDB using libraries like Mongoose or the native MongoDB driver by providing a connection URI."
    },
    {
      question: "What is middleware in Express.js?",
      answer: "Middleware functions in Express are functions that have access to the request and response objects. They can execute code, modify requests/responses, and end the request-response cycle."
    },
    {
      question: "What is the purpose of Mongoose?",
      answer: "Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation in MongoDB."
    },
    {
      question: "How do you create a REST API using Express?",
      answer: "To create a REST API in Express, define endpoints (GET, POST, PUT, DELETE) and connect them to corresponding controller functions that handle business logic."
    },
    {
      question: "How is React used in the MERN stack?",
      answer: "In the MERN stack, React is used to build the frontend user interface of the application, interacting with the backend APIs built with Express and Node.js."
    },
    {
      question: "What is the use of CORS in Node.js applications?",
      answer: "CORS (Cross-Origin Resource Sharing) allows your server to specify who can access its resources. It’s used to enable or restrict resources on a web server accessed from different domains."
    },
  ];
  