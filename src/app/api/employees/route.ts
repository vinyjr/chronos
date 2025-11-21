const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//GET all employees 
export async function GET() {
  try {
    if (!baseUrl) {
      return Response.json({ error: 'Base URL not configured' }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/v1/employee?limit=10&skip=0`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch employees' }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

//POST new employee
export async function POST(request: Request) {
  try {
    if (!baseUrl) {
      return Response.json({ 
        statusCode: 500,
        error: 'Base URL not configured' 
      }, { status: 500 });
    }

    const body = await request.json();

    // Validar campos obrigatórios
    if (!body.name || body.name.trim() === '') {
      return Response.json({ 
        statusCode: 400,
        error: 'Nome é obrigatório' 
      }, { status: 400 });
    }

    // Validar CPF (deve ter no mínimo 11 caracteres)
    const cleanCPF = body.cpf?.replace(/\D/g, '') || '';
    if (cleanCPF.length < 11) {
      return Response.json({ 
        statusCode: 400,
        error: 'CPF deve ter exatamente 11 dígitos' 
      }, { status: 400 });
    }

    // Validar formato de hora (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    
    if (!body.arrivalTime || !timeRegex.test(body.arrivalTime)) {
      return Response.json({ 
        statusCode: 400,
        error: 'Horário de chegada deve estar no formato HH:MM' 
      }, { status: 400 });
    }

    if (!body.exitTime || !timeRegex.test(body.exitTime)) {
      return Response.json({ 
        statusCode: 400,
        error: 'Horário de saída deve estar no formato HH:MM' 
      }, { status: 400 });
    }

    const response = await fetch(`${baseUrl}/v1/employee`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Tratamento de erro 409 (Conflito - CPF já existe)
    if (response.status === 409) {
      return Response.json({ 
        statusCode: 409,
        error: 'Já existe um funcionário cadastrado com este CPF' 
      }, { status: 409 });
    }

    // Tratamento de erro 400 (Validação)
    if (response.status === 400) {
      return Response.json({ 
        statusCode: 400,
        error: data.error || 'Erro de validação dos dados' 
      }, { status: 400 });
    }

    // Tratamento de outros erros
    if (!response.ok) {
      return Response.json({ 
        statusCode: response.status,
        error: 'Erro ao criar funcionário' 
      }, { status: response.status });
    }

    // Sucesso 201
    return Response.json({ 
      statusCode: 201,
      data: data.data || data 
    }, { status: 201 });
  } catch (err) {
    return Response.json({ 
      statusCode: 500,
      error: 'Erro no servidor' 
    }, { status: 500 });
  }
}