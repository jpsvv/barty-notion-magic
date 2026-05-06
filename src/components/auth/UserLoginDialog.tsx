/**
 * UserLoginDialog — Pop-up com o mesmo formulário do app Barty (i.barty.fun)
 * Visual idêntico, mas ao submeter redireciona para o app real (backends distintos).
 */
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import { GoogleIcon } from "./GoogleIcon";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "register" | "forgot";

const APP_BASE = "https://i.barty.fun";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCpf = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

export function UserLoginDialog({ open, onOpenChange }: Props) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  const redirectToApp = (path: string, params: Record<string, string> = {}) => {
    setLoading(true);
    const url = new URL(path, APP_BASE);
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
    window.location.href = url.toString();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("barty-app-login", {
        body: { email, password },
      });
      if (error || !data?.access_token) {
        const msg = data?.error || error?.message || "E-mail ou senha inválidos.";
        toast({ title: "Erro no login", description: msg, variant: "destructive" });
        setLoading(false);
        return;
      }
      // Redireciona para o app com os tokens no hash — o supabase-js detecta e cria a sessão automaticamente.
      const hash = new URLSearchParams({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: String(data.expires_in ?? 3600),
        expires_at: String(data.expires_at ?? Math.floor(Date.now() / 1000) + Number(data.expires_in ?? 3600)),
        token_type: data.token_type ?? "bearer",
        type: "signup",
      }).toString();
      window.location.href = `${APP_BASE}/user/home#${hash}`;
    } catch (err) {
      toast({ title: "Erro no login", description: (err as Error).message, variant: "destructive" });
      setLoading(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    redirectToApp("/", {
      mode: "register",
      email,
      first_name: firstName,
      last_name: lastName,
      phone: phone.replace(/\D/g, ""),
      cpf: cpf.replace(/\D/g, ""),
    });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    redirectToApp("/", { mode: "forgot", email });
  };

  const handleGoogle = () => {
    redirectToApp("/", { provider: "google" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {mode === "login" && "Entrar na sua conta"}
            {mode === "register" && "Criar conta"}
            {mode === "forgot" && "Recuperar senha"}
          </DialogTitle>
          <DialogDescription>
            Acesse o app Barty para usar suas fichas, ingressos e consumo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {mode !== "login" && (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </button>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-email">E-mail</Label>
                <Input id="user-email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-password">Senha</Label>
                <div className="relative">
                  <Input
                    id="user-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                Entrar
              </Button>
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Esqueci minha senha
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
                <GoogleIcon />
                Entrar com Google
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <button type="button" onClick={() => setMode("register")} className="text-primary font-semibold hover:underline">
                  Cadastre-se
                </button>
              </p>
            </form>
          )}

          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome <span className="text-destructive">*</span></Label>
                  <Input id="firstName" placeholder="João" value={firstName} onChange={(e) => setFirstName(e.target.value)} required maxLength={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome <span className="text-destructive">*</span></Label>
                  <Input id="lastName" placeholder="Silva" value={lastName} onChange={(e) => setLastName(e.target.value)} required maxLength={50} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone <span className="text-destructive">*</span></Label>
                <Input id="phone" placeholder="(00) 00000-0000" value={formatPhone(phone)} onChange={(e) => setPhone(e.target.value)} required maxLength={15} inputMode="numeric" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF <span className="text-destructive">*</span></Label>
                <Input id="cpf" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} required maxLength={14} inputMode="numeric" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">E-mail <span className="text-destructive">*</span></Label>
                <Input id="reg-email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Senha <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use ao menos 8 caracteres, combinando letras maiúsculas, minúsculas, números e símbolos.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-confirm-password">Confirmar senha <span className="text-destructive">*</span></Label>
                <Input
                  id="reg-confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                Criar conta
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
                <GoogleIcon />
                Entrar com Google
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <button type="button" onClick={() => setMode("login")} className="text-primary font-semibold hover:underline">
                  Faça login
                </button>
              </p>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleForgot} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Informe seu e-mail e enviaremos um link para redefinir sua senha.
              </p>
              <div className="space-y-2">
                <Label htmlFor="forgot-email">E-mail</Label>
                <Input id="forgot-email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                Enviar link de recuperação
              </Button>
            </form>
          )}

          <p className="text-[11px] text-center text-muted-foreground/70 pt-2 border-t border-border/50">
            Você será direcionado ao app oficial para concluir o acesso.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}