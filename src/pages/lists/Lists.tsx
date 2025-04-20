import { useState } from 'react';
import { createApiService } from '../../api/apiService';
import useKeycloak from '../../hooks/useKeycloak';

const Lists = () => {
  const keycloak = useKeycloak();
  const getToken = () => keycloak.token || null;

  const authenticatedApiService = createApiService(getToken);

  const [lists, setLists] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLists = async () => {
    setLoading(true);
    try {
      const data = await authenticatedApiService.getData('/shopping-lists');
      setLists(data);
      console.log('Lists fetched:', data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lists'));
      console.error('Error fetching lists:', err);
    } finally {
      setLoading(false);
    }
  };

  return <div>
    <span className="landingPage__content--login" onClick={fetchLists}>
          Shopping Lists
        </span>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {lists && (
      <div>
        <h3>Your Lists:</h3>
        <pre>{JSON.stringify(lists, null, 2)}</pre>
      </div>
    )}
  </div>;
};

export default Lists;