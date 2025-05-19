
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Upload, Info, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const NewAnnounce = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, you'd upload these to a server
    // For demo, we'll just create local URLs
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 6)); // Limit to 6 images
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Anúncio criado com sucesso!",
        description: "Seu anúncio está em análise e será publicado em breve.",
      });
    }, 1500);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Criar anúncio
            </h1>
            <p className="text-nuflow-charcoal/70 mb-8">
              Preencha os dados abaixo para anunciar seu produto na comunidade Nuflow
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Product Type */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-nuflow-mineral/10">
                <h2 className="text-xl font-heading font-semibold mb-4">Tipo do produto</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bike">Bicicleta</SelectItem>
                          <SelectItem value="component">Componente</SelectItem>
                          <SelectItem value="accessory">Acessório</SelectItem>
                          <SelectItem value="clothing">Vestuário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="brand">Marca</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a marca" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="specialized">Specialized</SelectItem>
                          <SelectItem value="trek">Trek</SelectItem>
                          <SelectItem value="cannondale">Cannondale</SelectItem>
                          <SelectItem value="scott">Scott</SelectItem>
                          <SelectItem value="giant">Giant</SelectItem>
                          <SelectItem value="other">Outra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="condition">Estado</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado do produto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Novo</SelectItem>
                        <SelectItem value="like-new">Usado - Como novo</SelectItem>
                        <SelectItem value="good">Usado - Bom estado</SelectItem>
                        <SelectItem value="fair">Usado - Estado razoável</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-nuflow-mineral/10">
                <h2 className="text-xl font-heading font-semibold mb-4">Detalhes do produto</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título do anúncio</Label>
                    <Input 
                      id="title" 
                      placeholder="Ex: Bicicleta Specialized Epic Expert Carbon 2022"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input 
                        id="price" 
                        type="number"
                        placeholder="0,00"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Input 
                        id="location" 
                        placeholder="Cidade, Estado"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva seu produto com o máximo de detalhes possível..."
                      className="mt-1 h-32"
                    />
                  </div>
                </div>
              </div>
              
              {/* Images */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-nuflow-mineral/10">
                <h2 className="text-xl font-heading font-semibold mb-4">Fotos do produto</h2>
                <p className="text-sm text-nuflow-charcoal/70 mb-4">
                  Adicione até 6 fotos do seu produto. A primeira foto será a capa do anúncio.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Image upload button */}
                  {images.length < 6 && (
                    <div className="relative h-40 border-2 border-dashed border-nuflow-mineral/30 rounded-lg flex flex-col items-center justify-center p-4 hover:border-nuflow-lime transition-colors">
                      <Upload size={24} className="mb-2 text-nuflow-charcoal/70" />
                      <p className="text-sm font-medium">Upload foto</p>
                      <p className="text-xs text-nuflow-charcoal/70">PNG, JPG até 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        multiple
                      />
                    </div>
                  )}
                  
                  {/* Uploaded images */}
                  {images.map((img, index) => (
                    <div key={index} className="relative h-40">
                      <img 
                        src={img} 
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-nuflow-moss text-white text-xs py-1 px-2 rounded-full">
                          Capa
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Terms */}
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" />
                <div>
                  <Label 
                    htmlFor="terms" 
                    className="font-normal"
                  >
                    Li e concordo com os <a href="#" className="text-nuflow-moss underline">Termos de uso</a> e <a href="#" className="text-nuflow-moss underline">Política de privacidade</a>
                  </Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-nuflow-moss text-white hover:bg-nuflow-moss/90"
                >
                  {loading ? "Publicando..." : "Publicar anúncio"}
                  {!loading && <ArrowRight size={16} className="ml-2" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewAnnounce;
