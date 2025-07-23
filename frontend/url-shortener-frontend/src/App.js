import React, { useState } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlShortenerResults from './components/UrlShortenerResults';
import StatisticsPage from './components/StatisticsPage';
import { shortenUrls } from './api/urlShortenerApi';
import { LoggingProvider } from './components/LoggingProvider';
import { Container, Tabs, Tab } from '@mui/material';

function App() {
  const [results, setResults] = useState([]);
  const [tab, setTab] = useState(0);

  const handleShorten = async (urls) => {
    const res = await shortenUrls(urls);
    setResults(res);
  };

  return (
    <LoggingProvider>
      <Container>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Shortener" />
          <Tab label="Statistics" />
        </Tabs>
        {tab === 0 && (
          <>
            <UrlShortenerForm onSubmit={handleShorten} />
            <UrlShortenerResults results={results} />
          </>
        )}
        {tab === 1 && <StatisticsPage />}
      </Container>
    </LoggingProvider>
  );
}

export default App;
