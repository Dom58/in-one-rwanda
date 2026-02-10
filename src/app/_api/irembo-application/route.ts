import { AppConfig } from '@/app/configs';
import Axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationNumber = searchParams.get('applicationNumber');

    const headers = {
      Accept: 'application/json, text/plain, */*',
      "Access-Control-Allow-Origin": '*',
      'Applicationnumber': applicationNumber
    };

    if (!applicationNumber) {
      return NextResponse.json({ error: 'Application number is required' }, { status: 400 });
    }

    const targetUrl = AppConfig.irembo.application!;

    const response = await Axios.get(targetUrl, { headers });
    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from IREMBO' }, { status: 500 });
  }
}
