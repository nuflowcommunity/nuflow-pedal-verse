
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, MessageSquare, Image, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Comunidade = () => {
  // Sample data for community posts
  const posts = [
    {
      id: '1',
      author: {
        name: 'Marina Silva',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: 'Incrível trilha hoje no Pico do Jaraguá! Quem mais já fez essa rota? 25km de pura adrenalina! #MTBLife',
      image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=600',
      likes: 42,
      comments: 8,
      time: '2h atrás',
      location: 'Pico do Jaraguá, SP'
    },
    {
      id: '2',
      author: {
        name: 'Carlos Mendes',
        avatar: 'https://i.pravatar.cc/150?img=11',
      },
      content: 'Novo recorde pessoal! 100km em 3h20min com média de 30km/h. A preparação para o Gran Fondo está indo muito bem.',
      image: '',
      likes: 56,
      comments: 12,
      time: '5h atrás',
      location: 'Estrada dos Bandeirantes, RJ'
    },
    {
      id: '3',
      author: {
        name: 'Luiza Campos',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      content: 'Primeira vez no desafio Serra do Mar. Que visual incrível! Vale cada gota de suor.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600',
      likes: 78,
      comments: 15,
      time: '1 dia atrás',
      location: 'Serra do Mar, SP'
    },
    {
      id: '4',
      author: {
        name: 'Pedro Almeida',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      content: 'Alguém interessado em um pedal urbano neste fim de semana em São Paulo? Pensando em fazer uns 40km passando pelos principais parques.',
      image: '',
      likes: 23,
      comments: 30,
      time: '2 dias atrás',
      location: 'São Paulo, SP'
    }
  ];

  // Sample data for active clubs
  const clubs = [
    { id: '1', name: 'Mountain Riders SP', members: 237, location: 'São Paulo, SP' },
    { id: '2', name: 'Pedal Urbano', members: 312, location: 'Rio de Janeiro, RJ' },
    { id: '3', name: 'Gravel Gang', members: 156, location: 'Curitiba, PR' },
    { id: '4', name: 'Speed Team', members: 189, location: 'Belo Horizonte, MG' },
    { id: '5', name: 'Pedalada Noturna', members: 128, location: 'São Paulo, SP' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-nuflow-moss text-white py-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                Comunidade Nuflow
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Conecte-se com milhares de ciclistas, compartilhe experiências e 
                participe de challenges exclusivos
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90">
                  <Users className="mr-2" size={20} />
                  Entrar na Comunidade
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Explorar Clubs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Split into Feed and Sidebar */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2">
                {/* Create Post */}
                <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-nuflow-moss/20 flex items-center justify-center">
                      <Users size={20} className="text-nuflow-moss" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Compartilhe sua experiência..." 
                      className="ml-3 flex-grow px-4 py-2 bg-nuflow-sand rounded-full focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button className="flex items-center text-nuflow-charcoal/70 hover:text-nuflow-moss">
                      <Image size={18} className="mr-2" />
                      Foto
                    </button>
                    <button className="flex items-center text-nuflow-charcoal/70 hover:text-nuflow-moss">
                      <MapPin size={18} className="mr-2" />
                      Local
                    </button>
                    <Button size="sm" className="bg-nuflow-moss text-white hover:bg-nuflow-moss/90 px-6">
                      Publicar
                    </Button>
                  </div>
                </div>
                
                {/* Posts Feed */}
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {/* Post Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">{post.author.name}</h3>
                          <div className="flex items-center text-xs text-nuflow-charcoal/60">
                            <span>{post.time}</span>
                            {post.location && (
                              <>
                                <span className="mx-1">•</span>
                                <MapPin size={12} className="mr-1" />
                                <span>{post.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="text-nuflow-charcoal/40 hover:text-nuflow-moss">
                        •••
                      </button>
                    </div>
                    
                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="mb-4">{post.content}</p>
                      {post.image && (
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="Post" 
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-nuflow-mineral/10">
                      <button className="flex items-center text-nuflow-charcoal/70 hover:text-nuflow-moss">
                        <span className="mr-2">❤️</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center text-nuflow-charcoal/70 hover:text-nuflow-moss">
                        <MessageSquare size={18} className="mr-2" />
                        <span>{post.comments} comentários</span>
                      </button>
                      <button className="flex items-center text-nuflow-charcoal/70 hover:text-nuflow-moss">
                        Compartilhar
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="text-center mt-8">
                  <Button variant="outline" className="border-nuflow-moss text-nuflow-moss">
                    Ver mais posts
                  </Button>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Active Clubs */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-heading font-semibold mb-4">Clubs Ativos</h2>
                  <div className="space-y-4">
                    {clubs.map((club) => (
                      <div key={club.id} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{club.name}</h3>
                          <p className="text-sm text-nuflow-charcoal/70">{club.members} membros • {club.location}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-nuflow-moss hover:text-nuflow-moss">
                          Seguir
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="link" className="text-nuflow-moss">
                      Ver todos os clubs
                    </Button>
                  </div>
                </div>
                
                {/* Upcoming Challenges */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-heading font-semibold mb-4">Desafios da Semana</h2>
                  <div className="space-y-4">
                    <div className="bg-nuflow-sand p-4 rounded-lg">
                      <h3 className="font-medium">100K Challenge</h3>
                      <p className="text-sm text-nuflow-charcoal/70 mb-2">Pedale 100km em uma semana</p>
                      <div className="w-full bg-nuflow-mineral/20 rounded-full h-2">
                        <div className="bg-nuflow-lime h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>65/100 km</span>
                        <span>5 dias restantes</span>
                      </div>
                    </div>
                    
                    <div className="bg-nuflow-sand p-4 rounded-lg">
                      <h3 className="font-medium">King of the Hill</h3>
                      <p className="text-sm text-nuflow-charcoal/70 mb-2">Acumule 2000m de elevação</p>
                      <div className="w-full bg-nuflow-mineral/20 rounded-full h-2">
                        <div className="bg-nuflow-lime h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>600/2000 m</span>
                        <span>7 dias restantes</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-nuflow-moss hover:bg-nuflow-moss/90 text-white">
                    Participar de Desafios
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Comunidade;
