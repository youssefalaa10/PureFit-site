import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://fit-pro-app.glitch.me";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const foodId = params.id;
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/foods/${foodId}`, {
      method: "PUT",
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
        errorData = { message: errorText || "Failed to edit food" };
      }
      return NextResponse.json(
        { error: errorData.message || "Failed to edit food" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error editing food:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
