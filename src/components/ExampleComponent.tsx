import { apiService } from '../api/apiService';
import { useEffect, useState } from 'react';
import useKeycloak from '../hooks/useKeycloak';

const ExampleComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { authenticated } = useKeycloak();

  useEffect(() => {
    const fetchData = async () => {
      if (!authenticated) return;

      setLoading(true);
      try {
        const result = await apiService.getData('/some-endpoint');
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authenticated]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <div>Data: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default ExampleComponent;