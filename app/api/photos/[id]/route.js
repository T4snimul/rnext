import { getPhotoById } from "@/lib/image-data";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const photoId = params.id;

  const data = await getPhotoById(photoId);

  return NextResponse.json(data);
}
