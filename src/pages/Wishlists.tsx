
import React, { useState } from 'react';
import { Plus, Share2, Edit, Trash2, Eye, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useWishlists } from '@/hooks/marketplace/useWishlists';
import { useToast } from '@/hooks/use-toast';
import LoadingTransition from '@/components/ui/loading-transition';
import type { CreateWishlistData, UpdateWishlistData } from '@/services/marketplace/wishlist/types';

const Wishlists = () => {
  const { wishlists, loading, createWishlist, updateWishlist, deleteWishlist } = useWishlists();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingWishlist, setEditingWishlist] = useState<any>(null);
  const [formData, setFormData] = useState<CreateWishlistData>({
    name: '',
    description: '',
    is_public: false
  });

  const handleCreateWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWishlist(formData);
      setIsCreateOpen(false);
      setFormData({ name: '', description: '', is_public: false });
    } catch (error) {
      console.error('Error creating wishlist:', error);
    }
  };

  const handleUpdateWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWishlist) return;

    try {
      const updateData: UpdateWishlistData = {
        name: formData.name,
        description: formData.description,
        is_public: formData.is_public
      };
      await updateWishlist(editingWishlist.id, updateData);
      setEditingWishlist(null);
      setFormData({ name: '', description: '', is_public: false });
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleDeleteWishlist = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta lista de desejos?')) {
      try {
        await deleteWishlist(id);
      } catch (error) {
        console.error('Error deleting wishlist:', error);
      }
    }
  };

  const handleShareWishlist = async (wishlist: any) => {
    if (wishlist.share_token) {
      const shareUrl = `${window.location.origin}/wishlist/shared/${wishlist.share_token}`;
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copiado",
        description: "Link de compartilhamento copiado para a área de transferência"
      });
    }
  };

  const openEditDialog = (wishlist: any) => {
    setEditingWishlist(wishlist);
    setFormData({
      name: wishlist.name,
      description: wishlist.description || '',
      is_public: wishlist.is_public
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <LoadingTransition />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Minhas Listas de Desejos</h1>
              <p className="text-gray-600 mt-2">Organize e compartilhe seus produtos favoritos</p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-nuflow-moss text-white">
                  <Plus size={16} className="mr-2" />
                  Nova Lista
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Lista de Desejos</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateWishlist} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome da Lista</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Equipamentos de Ciclismo"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição (opcional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descreva sua lista de desejos..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_public"
                      checked={formData.is_public}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                    />
                    <Label htmlFor="is_public">Lista pública (visível para outros usuários)</Label>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">Criar Lista</Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {wishlists.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma lista criada</h3>
                <p className="text-gray-600 mb-6">
                  Crie sua primeira lista de desejos para organizar os produtos que você gostaria de comprar.
                </p>
                <Button onClick={() => setIsCreateOpen(true)} className="bg-nuflow-moss text-white">
                  <Plus size={16} className="mr-2" />
                  Criar Primeira Lista
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlists.map((wishlist) => (
                <Card key={wishlist.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1">{wishlist.name}</CardTitle>
                        {wishlist.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{wishlist.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        {wishlist.is_public && (
                          <Badge variant="secondary" className="text-xs">
                            <Globe size={10} className="mr-1" />
                            Pública
                          </Badge>
                        )}
                        {wishlist.is_shared && (
                          <Badge variant="outline" className="text-xs">
                            <Share2 size={10} className="mr-1" />
                            Compartilhada
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{wishlist.item_count || 0} {(wishlist.item_count || 0) === 1 ? 'item' : 'itens'}</span>
                      <span>Criada em {new Date(wishlist.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link to={`/wishlist/${wishlist.id}`}>
                          <Eye size={14} className="mr-1" />
                          Ver
                        </Link>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(wishlist)}
                      >
                        <Edit size={14} />
                      </Button>
                      
                      {wishlist.is_shared && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShareWishlist(wishlist)}
                        >
                          <Share2 size={14} />
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteWishlist(wishlist.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={!!editingWishlist} onOpenChange={() => setEditingWishlist(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Lista de Desejos</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateWishlist} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nome da Lista</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description">Descrição (opcional)</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-is_public"
                checked={formData.is_public}
                onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
              />
              <Label htmlFor="edit-is_public">Lista pública</Label>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">Salvar Alterações</Button>
              <Button type="button" variant="outline" onClick={() => setEditingWishlist(null)} className="flex-1">
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Wishlists;
