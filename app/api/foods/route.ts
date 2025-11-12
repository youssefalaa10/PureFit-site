import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://fit-pro-app.glitch.me";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    const response = await fetch(`${API_BASE_URL}/api/foods`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText || "Failed to fetch foods" };
      }
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch foods" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText || "Failed to add food" };
      }
      return NextResponse.json(
        { error: errorData.message || "Failed to add food" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error adding food:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
