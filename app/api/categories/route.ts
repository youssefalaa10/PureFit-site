import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      "https://fit-pro-app.glitch.me/api/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to fetch categories" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy categories GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get token from request headers
    const authHeader = request.headers.get("authorization");

    const response = await fetch(
      "https://fit-pro-app.glitch.me/api/categories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to add category" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy categories POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
