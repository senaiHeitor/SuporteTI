import { useState } from "react";

interface LoginProps {
  onLogin: (email: string, role: "client" | "it-executive") => void;
}

type UserRole = "client" | "it-executive";

export function Login({ onLogin }: LoginProps) {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("client");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      // Validação do cadastro
      if (!nome || !email || !password || !confirmPassword) {
        alert("Preencha todos os campos!");
        return;
      }
      
      if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }
      
      if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres!");
        return;
      }
    } else {
      // Validação do login
      if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
      }
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin(email, role);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    // Limpa os campos ao alternar entre modos
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={styles.container}>
      {/* Background Elements */}
      <div style={styles.backgroundGrid} />
      <div style={styles.purpleBlob} />
      <div style={styles.blueBlob} />
      
      {/* Login Card */}
      <div style={styles.card}>
        {/* Card Header */}
        <div style={styles.cardHeader}>
          {/* Logo */}
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <svg style={styles.logoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <h1 style={styles.title}>SuporteTI</h1>
          <p style={styles.subtitle}>
            {isRegistering ? "Crie sua conta" : "Entre no seu painel de suporte"}
          </p>
        </div>

        {/* Card Content */}
        <div style={styles.cardContent}>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Nome Field - Apenas no cadastro */}
            {isRegistering && (
              <div style={styles.field}>
                <label style={styles.label}>Nome Completo</label>
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setName(e.target.value)}
                    required={isRegistering}
                    disabled={isLoading}
                    style={styles.input}
                  />
                  <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Email Field */}
            <div style={styles.field}>
              <label style={styles.label}>E-mail</label>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  style={styles.input}
                />
                <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.field}>
              <label style={styles.label}>Senha</label>
              <div style={styles.inputContainer}>
                <input
                  type="password"
                  placeholder={isRegistering ? "Mínimo 6 caracteres" : "••••••••"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  style={styles.input}
                />
                <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Confirm Password Field - Apenas no cadastro */}
            {isRegistering && (
              <div style={styles.field}>
                <label style={styles.label}>Confirmar Senha</label>
                <div style={styles.inputContainer}>
                  <input
                    type="password"
                    placeholder="Digite novamente sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={isRegistering}
                    disabled={isLoading}
                    style={styles.input}
                  />
                  <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Role Selector */}
            <div style={styles.roleSection}>
              <label style={styles.label}>Tipo de Acesso</label>
              <div style={styles.roleGrid}>
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  style={{
                    ...styles.roleButton,
                    ...(role === "client" ? styles.roleButtonActive : styles.roleButtonInactive)
                  }}
                >
                  <div style={styles.roleButtonContent}>
                    <svg style={styles.roleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span style={styles.roleText}>Cliente</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole("it-executive")}
                  style={{
                    ...styles.roleButton,
                    ...(role === "it-executive" ? styles.roleButtonActive : styles.roleButtonInactive)
                  }}
                >
                  <div style={styles.roleButtonContent}>
                    <svg style={styles.roleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span style={styles.roleText}>Analista TI</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={styles.submitButton}
            >
              {isLoading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.spinner} />
                  {isRegistering ? "Cadastrando..." : "Entrando..."}
                </div>
              ) : (
                isRegistering ? "Cadastrar-se" : "Entrar no Sistema"
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div style={styles.links}>
            <div style={styles.toggleContainer}>
              <span style={styles.toggleText}>
                {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}
              </span>
              <button 
                type="button" 
                onClick={toggleMode}
                style={styles.toggleButton}
              >
                {isRegistering ? "Fazer Login" : "Cadastre-se"}
              </button>
            </div>
            
            {!isRegistering && (
              <a href="#" style={styles.link}>Esqueceu sua senha?</a>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    padding: '16px',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  backgroundGrid: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: '60px 60px'
  },
  purpleBlob: {
    position: 'absolute' as const,
    top: '25%',
    left: '25%',
    width: '288px',
    height: '288px',
    background: 'rgba(168, 85, 247, 0.1)',
    borderRadius: '50%',
    filter: 'blur(64px)',
    animation: 'pulse 2s infinite'
  },
  blueBlob: {
    position: 'absolute' as const,
    bottom: '25%',
    right: '25%',
    width: '288px',
    height: '288px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '50%',
    filter: 'blur(64px)',
    animation: 'pulse 2s infinite 1s'
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative' as const,
    zIndex: 10
  },
  cardHeader: {
    textAlign: 'center' as const,
    padding: '32px 32px 8px 32px'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  logo: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    color: 'white'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
    margin: '0'
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '14px',
    fontWeight: 300,
    margin: '0'
  },
  cardContent: {
    padding: '16px 32px 32px 32px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#d1d5db'
  },
  inputContainer: {
    position: 'relative' as const
  },
  input: {
    width: '100%',
    paddingLeft: '40px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none'
  },
  inputIcon: {
    position: 'absolute' as const,
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    color: '#9ca3af'
  },
  roleSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  roleButton: {
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid',
    transition: 'all 0.2s',
    cursor: 'pointer',
    outline: 'none'
  },
  roleButtonActive: {
    borderColor: '#3b82f6',
    background: 'rgba(59, 130, 246, 0.2)',
    color: 'white',
    boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.25)'
  },
  roleButtonInactive: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#9ca3af'
  },
  roleButtonContent: {
    textAlign: 'center' as const
  },
  roleIcon: {
    width: '24px',
    height: '24px',
    margin: '0 auto 8px'
  },
  roleText: {
    fontSize: '14px',
    fontWeight: 500,
    display: 'block'
  },
  submitButton: {
    width: '100%',
    height: '48px',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    color: 'white',
    borderRadius: '12px',
    fontWeight: 600,
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    marginTop: '8px'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  },
  links: {
    textAlign: 'center' as const,
    marginTop: '24px'
  },
  toggleContainer: {
    marginBottom: '16px'
  },
  toggleText: {
    color: '#9ca3af',
    fontSize: '14px',
    marginRight: '8px'
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#60a5fa',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'underline'
  },
  link: {
    fontSize: '14px',
    color: '#9ca3af',
    display: 'block',
    marginBottom: '12px',
    textDecoration: 'none'
  },
  helpText: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  helpLink: {
    color: '#60a5fa',
    textDecoration: 'none'
  }
};