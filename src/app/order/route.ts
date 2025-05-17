import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const res = await fetch(`${process.env.DJANGO_API_URL}/orders/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${process.env.DJANGO_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: res.status });
  }

  return NextResponse.json({ message: 'Deleted' });
}
