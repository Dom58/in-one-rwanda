import { AppConfig } from '@/app/configs';
import Axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phoneNumber = searchParams.get('phoneNumber');

  if (!phoneNumber) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }
  const targetUrl = AppConfig.rssb.concat(`?phoneNumber=${phoneNumber}`);
  
  try {
    const response = await Axios.get(targetUrl);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from RSSB' }, { status: 500 });
  }
}
