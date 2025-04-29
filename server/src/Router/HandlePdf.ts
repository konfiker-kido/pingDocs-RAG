import express from 'express';
import multer from 'multer';
import {
    uploadPDF,
    chat,
    chatWithOllma,
 } from '../Controller/HandlePDF.Controller'
import { chats} from '../Controller/ChatsController';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req:any, file:any, cb:any){
           cb(null,'./src/uploads/');
    },
    filename:function(req:any, file:any, cb:any){
        const uniqueSuffix =Date.now()+'-'+ Math.round(Math.random()* 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const upload = multer({storage: storage});  
console.log("====="); 
// router.post('/upload/pdf',upload.single('pdf'), uploadPDF);
// router.get('/chat', chatWithOllma);
router.post('/chat', chats);

export default router;