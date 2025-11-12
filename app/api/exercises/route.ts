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

    // Log request details (remove in production if needed)
    if (process.env.NODE_ENV === "development") {
      console.log(
        "POST /api/exercises - Request body:",
        JSON.stringify(body, null, 2)
      );
      console.log(
        "POST /api/exercises - Auth header:",
        authHeader ? "Present" : "Missing"
      );
    }

    // Ensure we have required fields
    if (!body.categoryId) {
      return NextResponse.json(
        { error: "categoryId is required" },
        { status: 400 }
      );
    }

    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    // Prepare the request body - match the format from the working example
    // The backend may need id as a number, so we'll generate one if not provided
    const requestBody: any = {
      categoryId: body.categoryId,
      name: body.name,
      equipment: body.equipment,
      target: body.target,
      gifUrl: body.gifUrl,
      secondaryMuscles: Array.isArray(body.secondaryMuscles)
        ? body.secondaryMuscles
        : [],
      instructions: Array.isArray(body.instructions) ? body.instructions : [],
    };

    // Add id if provided, otherwise generate a unique number
    if (body.id !== undefined && body.id !== null) {
      requestBody.id =
        typeof body.id === "number" ? body.id : parseInt(body.id);
    } else {
      // Generate a unique numeric ID (using timestamp + random number)
      requestBody.id =
        Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
    }

    // Only add _id if it's explicitly provided (backend will generate its own)
    if (body._id) {
      requestBody._id = body._id;
    }

    if (process.env.NODE_ENV === "development") {
      console.log(
        "POST /api/exercises - Prepared request body:",
        JSON.stringify(requestBody, null, 2)
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(requestBody),
    });

    if (process.env.NODE_ENV === "development") {
      console.log("POST /api/exercises - Response status:", response.status);
      console.log("POST /api/exercises - Response ok:", response.ok);
    }

    if (!response.ok) {
      const errorText = await response.text();

      if (process.env.NODE_ENV === "development") {
        console.log("POST /api/exercises - Error response:", errorText);
      }

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

    if (process.env.NODE_ENV === "development") {
      console.log("POST /api/exercises - Success response:", data);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error adding exercise:", error);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      {
        error: `Internal server error: ${error.message || "Unknown error"}`,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
