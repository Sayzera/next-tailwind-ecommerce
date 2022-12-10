import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized Page">
      <h1 className="text-xl">Access Denied</h1>
      {message && <h2 className="mb-4 text-red-500">{message}</h2>}
    </Layout>
  );
}
