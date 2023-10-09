import { NextResponse } from "next/server";
import sharp from "sharp";

// export const runtime = "edge";

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const width = parseInt(searchParams.get("width"));
  const quality = parseInt(searchParams.get("quality"));

  const imageBuffer = await fetch(src).then((res) => res.arrayBuffer());
  const resizedImageBuffer = await sharp(Buffer.from(imageBuffer))
    .resize(width)
    .jpeg({ quality })
    .toBuffer();

  return new NextResponse(resizedImageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}
