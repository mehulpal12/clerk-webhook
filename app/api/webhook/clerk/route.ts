import { prisma } from '@/lib/prisma';
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    
if (evt.type === 'user.created') {
  console.log('userId:', evt.data.id)

  const user = evt.data as any;
     const email = user.email_addresses.find(
      (e: any) => e.id === user.primary_email_address_id
    )?.email_address;

    if (!email) {
      console.error("User created without email", user.id);
      return new Response("No email", { status: 200 });
    }

    await prisma.user.create({
      data: {
        clerkId: user.id,
        email,
        role: "USER",
      },
    });

    

}


    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    // console.log('Webhook payload:', evt.data)

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}