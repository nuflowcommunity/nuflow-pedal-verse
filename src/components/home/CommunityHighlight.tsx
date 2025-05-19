
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunityHighlight = () => {
  // Sample club data
  const clubs = [
    {
      id: '1',
      name: 'Mountain Riders SP',
      members: 237,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600'
    },
    {
      id: '2',
      name: 'Pedal Urbano',
      members: 312,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600'
    },
    {
      id: '3',
      name: 'Gravel Gang',
      members: 156,
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-nuflow-moss to-nuflow-moss/90 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Una-se à Comunidade
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Conecte-se com ciclistas que compartilham sua paixão, 
            participe de clubs locais e compartilhe suas experiências
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {clubs.map((club) => (
            <Link to={`/comunidade/clubs/${club.id}`} key={club.id} className="block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={club.image} 
                    alt={club.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-xl mb-2">{club.name}</h3>
                  <p className="text-white/70">{club.members} membros</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90">
            Explorar Comunidade
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlight;
