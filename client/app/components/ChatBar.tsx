'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from 'react'

export function InputWithButton() {
    const [message, setMessage]  = React.useState('');

    
  return (
    <div className="min-h-screen flex flex-col justify-end items-center pb-[5%]">
      <div className="fixed flex w-[600]  items-center space-x-5"> 
        <Input type="text" placeholder="Ask anything from your pdf" value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
        <Button type="submit" disabled={!message}>Send</Button> 
      </div>
    </div>
  )
}
