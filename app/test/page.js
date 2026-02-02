// Minimal page - no imports, no dependencies
export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Test Page</h1>
      <p>If you can see this, basic Next.js routing works!</p>
      <p>Time: {new Date().toLocaleString()}</p>
    </div>
  );
}

export const metadata = {
  title: "Test Page",
};
