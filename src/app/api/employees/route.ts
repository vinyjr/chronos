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
      return Response.json({ error: 'Base URL not configured' }, { status: 500 });
    }

    const body = await request.json();

    const response = await fetch(`${baseUrl}/v1/employee`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return Response.json({ error: 'Failed to create employee' }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data, { status: 201 });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}