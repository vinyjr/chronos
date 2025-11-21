import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!baseUrl) {
      return Response.json(
        {
          statusCode: 500,
          error: "Base URL not configured",
        },
        { status: 500 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    if (body.cpf) {
      const cleanCPF = body.cpf.replace(/\D/g, "");
      if (cleanCPF.length < 11) {
        return Response.json(
          {
            statusCode: 400,
            error: "CPF deve ter exatamente 11 dígitos",
          },
          { status: 400 }
        );
      }
    }

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (body.arrivalTime && !timeRegex.test(body.arrivalTime)) {
      return Response.json(
        {
          statusCode: 400,
          error: "Horário de chegada deve estar no formato HH:MM",
        },
        { status: 400 }
      );
    }

    if (body.exitTime && !timeRegex.test(body.exitTime)) {
      return Response.json(
        {
          statusCode: 400,
          error: "Horário de saída deve estar no formato HH:MM",
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${baseUrl}/v1/employee/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.status === 404) {
      return Response.json(
        {
          statusCode: 404,
          error: "Funcionário não encontrado",
        },
        { status: 404 }
      );
    }

    if (response.status === 409) {
      return Response.json(
        {
          statusCode: 409,
          error: "Já existe um funcionário cadastrado com este CPF",
        },
        { status: 409 }
      );
    }

    if (response.status === 400) {
      return Response.json(
        {
          statusCode: 400,
          error: data.error || "Erro de validação dos dados",
        },
        { status: 400 }
      );
    }

    if (!response.ok) {
      return Response.json(
        {
          statusCode: response.status,
          error: "Erro ao atualizar funcionário",
        },
        { status: response.status }
      );
    }

    return Response.json(
      {
        statusCode: 200,
        data: data.data || data,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        statusCode: 500,
        error: "Erro no servidor",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    console.log(`${baseUrl}/v1/employee/${id}`)
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        {
          statusCode: 400,
          error: "ID inválido",
        },
        { status: 400 }
      );
    }

    const response = await fetch(`${baseUrl}/v1/employee/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 404) {
      return NextResponse.json(
        {
          statusCode: 404,
          error: "Funcionário não encontrado",
        },
        { status: 404 }
      );
    }
    
    if (!response.ok) {
      return NextResponse.json(
        {
          statusCode: response.status,
          error: "Erro ao excluir funcionário",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        statusCode: 200,
        message: "Funcionário excluído com sucesso",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        statusCode: 500,
        error: "Erro no servidor",
      },
      { status: 500 }
    );
  }
}
