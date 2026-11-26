import { Resend } from "resend";
import { EMAIL } from "@/data/contact";

type ContactInput = { email: string; message: string; website: string };

function parseContact(body: unknown): ContactInput | null {
  if (
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof body.email === "string" &&
    "message" in body &&
    typeof body.message === "string" &&
    "website" in body &&
    typeof body.website === "string"
  ) {
    return { email: body.email, message: body.message, website: body.website };
  }

  return null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const contactInput = parseContact(body);

  if (contactInput === null) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, message, website } = contactInput;

  // Honeypot: a bot filled the hidden field. Pretend it worked, send nothing.
  if (website !== "") {
    return Response.json({ ok: true });
  }

  // Check the input
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  if (cleanMessage === "" || cleanMessage.length > 5000) {
    return Response.json({ error: "Invalid message" }, { status: 400 });
  }

  // Send, and handle both kinds of failure
  try {
    // Created here, not at the top of the file: the build loads this file,
    // and Resend throws straight away when there's no key
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio website contact <onboarding@resend.dev>",
      to: EMAIL,
      replyTo: cleanEmail,
      subject: `New message from ${cleanEmail}`,
      text: cleanMessage,
    });

    // Resend said no (wrong key, wrong "to" address, limit reached...)
    if (error) {
      console.error(error);
      return Response.json({ error: "Could not send" }, { status: 500 });
    }
  } catch (err) {
    // The request to Resend itself failed (network down...)
    console.error(err);
    return Response.json({ error: "Could not send" }, { status: 500 });
  }

  // Good to send
  return Response.json({ ok: true });
}
