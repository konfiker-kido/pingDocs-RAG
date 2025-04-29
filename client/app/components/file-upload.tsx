'use client'
import * as React from 'react'
import { FileUp } from 'lucide-react'

export const FileUploadComponent: React.FC = () => {
    const [fileName, setFileName] = React.useState('');
    const [uploading, setUploading] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleOnClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';

        input.addEventListener('change', async (e) => {
            const file = input.files?.[0];

            if (file) {
                setFileName(file.name);
                setUploading(true);
                setMessage('');

                const formData = new FormData();
                formData.append('pdf', file);

                try {
                    const response = await fetch('http://localhost:8000/upload/pdf', {
                        method: 'POST',
                        body: formData,
                    });

                    const result = await response.json();
                    console.log(" response message ===== ",result);
                    setMessage(result.message || 'Upload successful');
                } catch (err) {
                    console.error('Upload failed', err);
                } finally {
                    console.log("File uploaded !!");
                    setUploading(false);
                }
            }
            if(!file){
                setMessage('Upload failed');
            }
        });

        input.click();
    };

    return (
        <div
            className='bg-[#121212] mt-[50%] h-[20%] cursor-pointer p-7 flex flex-col justify-center items-center border-dotted border-2 rounded-3xl text-white'
            onClick={handleOnClick}
        >
            <FileUp size={48} strokeWidth={2.25} />
            <p className="mt-2">{fileName === '' ? 'Upload PDF file' : fileName}</p>
            {uploading && <p className="text-sm text-yellow-500">Uploading...</p>}
            {message && <p className="text-sm mt-1">{message}</p>}
        </div>
    );
};
