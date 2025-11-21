import { NextRequest } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!baseUrl) {
      return Response.json(
        { error: "Base URL not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;
    const employeeId = id;

    if (!employeeId) {
      return Response.json(
        { error: "ID do funcionário é obrigatório" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${baseUrl}/v1/card/activate/employee/${employeeId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return Response.json(
        { error: data.error || "Erro ao ativar cartão" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(
      { data: data.data || data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro ao ativar cartão:", err);
    return Response.json(
      { error: "Erro no servidor" },
      { status: 500 }
    );
  }
}
