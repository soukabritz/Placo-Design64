// Minimal test - no imports, no dependencies
export async function GET() {
  return new Response(JSON.stringify({
    message: "Minimal test works!",
    timestamp: new Date().toISOString(),
    nodeEnv: typeof process !== 'undefined' ? process.env?.NODE_ENV : 'unknown'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
