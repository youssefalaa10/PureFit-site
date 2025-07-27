import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch("https://fit-pro-app.glitch.me/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Login failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
