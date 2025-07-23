import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { getStatistics } from '../api/statisticsApi';

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getStatistics().then(setStats);
  }, []);

  return (
    <>
      <Typography variant="h6">Shortened URL Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Click Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.shortUrl}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
              <TableCell>{item.clickCount}</TableCell>
              <TableCell>
                {item.clicks.map((click, cidx) => (
                  <div key={cidx}>
                    {click.timestamp} - {click.source}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default StatisticsPage;