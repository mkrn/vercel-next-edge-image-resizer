import { NextApiResponse, NextApiRequest } from "next";
import sharp from "sharp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const width = parseInt(searchParams.get("width"));
  const quality = parseInt(searchParams.get("quality"));

  const imageBuffer = await fetch(src).then((res) => res.arrayBuffer());
  const resizedImageBuffer = await sharp(Buffer.from(imageBuffer))
    .resize(width)
    .jpeg({ quality })
    .toBuffer();

  res.status(200).setHeader("Content-Type", "image/jpeg");
  res.end(resizedImageBuffer);
}
