// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// The API Route code will not be part of your client bundle, so you can safely write server-side code.
import { IncomingMessage, ServerResponse } from 'http';

export default function handler(req: IncomingMessage, res: ServerResponse) {
	res.status(200).json({ text: 'hello' })
}