/**
 * barty-app-login — Autentica no Supabase do BARTY APP usando email/senha
 * e retorna os tokens da sessão para o frontend redirecionar com auto-login.
 */
const BARTY_APP_URL = "https://tfpedmjsecjgguibzxzu.supabase.co";
const BARTY_APP_ANON = Deno.env.get("BARTY_APP_SUPABASE_ANON_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function translateAuthError(raw: string): string {
  const s = (raw || "").toLowerCase();
  if (s.includes("invalid login credentials")) return "Senha incorreta ou e-mail não cadastrado.";
  if (s.includes("email not confirmed")) return "E-mail ainda não confirmado. Verifique sua caixa de entrada.";
  if (s.includes("user not found")) return "Conta não encontrada. Verifique o e-mail.";
  if (s.includes("too many requests") || s.includes("rate")) return "Muitas tentativas. Aguarde um instante e tente novamente.";
  return raw || "E-mail ou senha inválidos.";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email e senha obrigatórios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(`${BARTY_APP_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: BARTY_APP_ANON,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      const raw = data.error_description || data.msg || data.error || "";
      // Detecta conta criada apenas via Google (sem senha definida)
      if (raw && raw.toLowerCase().includes("invalid login credentials")) {
        // Verifica se o e-mail existe via signInWithOtp dry-run não é confiável; mantemos mensagem clara
      }
      return new Response(
        JSON.stringify({ error: translateAuthError(raw) }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Valida que é uma conta de USUÁRIO (cliente). Bloqueia BKO/Admin no pop-up.
    const userId = data.user?.id;
    if (userId) {
      const rolesRes = await fetch(
        `${BARTY_APP_URL}/rest/v1/user_roles?select=role&user_id=eq.${userId}`,
        {
          headers: {
            apikey: BARTY_APP_ANON,
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );
      const roles: Array<{ role: string }> = rolesRes.ok ? await rolesRes.json() : [];
      const roleNames = roles.map((r) => r.role);
      const isCliente = roleNames.length === 0 || roleNames.includes("cliente");
      if (!isCliente) {
        return new Response(
          JSON.stringify({
            error:
              "Esta conta é de Estabelecimento ou Administrador. Acesse pelo painel do app: https://i.barty.fun",
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    return new Response(
      JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        expires_at: data.expires_at,
        token_type: data.token_type,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});