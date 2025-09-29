import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Calendar, BarChart3, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const statsCards = [
    {
      title: 'Campeonatos Ativos',
      value: '3',
      description: 'Em andamento',
      icon: Trophy,
      color: 'text-primary',
    },
    {
      title: 'Times Cadastrados',
      value: '24',
      description: 'Participando',
      icon: Users,
      color: 'text-secondary',
    },
    {
      title: 'Jogos da Rodada',
      value: '8',
      description: 'Próximos jogos',
      icon: Calendar,
      color: 'text-accent-foreground',
    },
    {
      title: 'Partidas Disputadas',
      value: '156',
      description: 'Total geral',
      icon: BarChart3,
      color: 'text-muted-foreground',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard dos Campeonatos
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo dos seus campeonatos.
          </p>
        </div>

        {/* Quick Actions for Admins */}
        {isAdmin && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/championships/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Campeonato
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/teams/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Cadastrar Time
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/games/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Jogo
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/championships">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Campeonatos</span>
                </CardTitle>
                <CardDescription>
                  Gerencie campeonatos, configure formatos e acompanhe o progresso
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/teams">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-secondary" />
                  <span>Times</span>
                </CardTitle>
                <CardDescription>
                  Cadastre times, jogadores e gerencie escalações
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/games">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-accent-foreground" />
                  <span>Jogos</span>
                </CardTitle>
                <CardDescription>
                  Agende partidas, registre resultados e acompanhe a tabela
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/reports">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <span>Relatórios</span>
                </CardTitle>
                <CardDescription>
                  Estatísticas, artilheiros e análises detalhadas
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
