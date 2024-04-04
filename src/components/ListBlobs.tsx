import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export const config = {
  runtime: 'edge',
};

const ListBlobs = async ({folder}: {folder: string}) => {
    async function listBlobs(folder: string) {
        'use server';
        const blobs = await list({prefix: folder});
        console.log(blobs)
        return blobs;
    }

    const { blobs } = await list({prefix:folder})

    
    console.log(NextResponse.json(blobs))
}

export default ListBlobs