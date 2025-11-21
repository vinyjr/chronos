'use client';

import { useState, useEffect } from 'react';
import { Employee } from '@/types/employee';

export function useEmployee() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                setLoading(true);
                const response = await fetch('/api/employees', {
                    method: 'GET',
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar colaboradores');
                }

                const data = await response.json();
                setEmployees(data.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
                setEmployees([]);
            } finally {
                setLoading(false);
            }
        }

        fetchEmployees();
    }, []);

    return { employees, setEmployees, loading, error };
}

