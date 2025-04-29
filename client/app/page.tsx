import { FileUploadComponent} from './components/file-upload'
import { InputWithButton} from './components/ChatBar'
import ChatComponent from './components/Chat'

export default async function Home() {

 return(
  <div>
      <div className="min-h-screen w-screen flex ">
        <div className="w-[30vw] min-h-screen  m-5" >   
               <FileUploadComponent/>
        </div>
        <div className="w-[100%] mt-6 min-h-screen border-l-2 pr-5">
            <ChatComponent/>
        </div>
      </div>
  </div>
 )
}
