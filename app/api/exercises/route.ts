import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://fit-pro-app.glitch.me";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Get token from request headers
    const authHeader = request.headers.get("authorization");

    const response = await fetch(
      `${API_BASE_URL}/api/exercises/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
        },
      }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Failed to fetch exercises" }));
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch exercises" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching exercises:", error);
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

    console.log(
      "POST /api/exercises - Request body:",
      JSON.stringify(body, null, 2)
    );
    console.log(
      "POST /api/exercises - Auth header:",
      authHeader ? "Present" : "Missing"
    );

    const response = await fetch(`${API_BASE_URL}/api/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    });

    console.log("POST /api/exercises - Response status:", response.status);
    console.log("POST /api/exercises - Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("POST /api/exercises - Error response:", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText || "Failed to add exercise" };
      }

      return NextResponse.json(
        { error: errorData.message || "Failed to add exercise" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("POST /api/exercises - Success response:", data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error adding exercise:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
