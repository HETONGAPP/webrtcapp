
import { DL_DIR } from '@/constants';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req: any) {
  const file = req.nextUrl.searchParams.get('file');
  const path = DL_DIR + "/" + file;
  if (fs.existsSync(path)){
    const stream: any = fs.createReadStream(path);
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=' + file
      },
    });  
  }
  return new NextResponse(null, {
    status: 404,
    statusText: 'File not found!'
  });  
}