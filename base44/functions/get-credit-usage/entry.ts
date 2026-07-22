Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get("WORKSPACE_API_KEY");
    const workspaceId = Deno.env.get("WORKSPACE_ID");

    if (!apiKey || !workspaceId) {
      return Response.json(
        { error: "Missing WORKSPACE_API_KEY or WORKSPACE_ID secret" },
        { status: 500 }
      );
    }

    const url = `https://app.base44.com/api/v1/monitoring/analytics/${workspaceId}`;
    const res = await fetch(url, {
      headers: { api_key: apiKey },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Monitoring API error:", res.status, text);
      return Response.json(
        { error: "Failed to fetch credit data from Monitoring API" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const pool = data.credit_pool || {};

    const msgRemaining = pool.messages?.remaining ?? 0;
    const msgUsed = pool.messages?.used ?? 0;
    const intRemaining = pool.integration?.remaining ?? 0;
    const intUsed = pool.integration?.used ?? 0;

    return Response.json({
      balance: msgRemaining + intRemaining,
      using: msgUsed + intUsed,
      message_credits: { balance: msgRemaining, using: msgUsed },
      integration_credits: { balance: intRemaining, using: intUsed },
    });
  } catch (error) {
    console.error("get-credit-usage error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
