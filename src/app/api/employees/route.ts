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