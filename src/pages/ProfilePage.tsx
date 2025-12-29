import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, Mail, Phone, MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import { formatCurrency, formatDate } from '@/lib/utils/helpers';
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  status: string;
  createdAt: number;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, register, logout, updateProfile } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    province: user?.address?.province || '',
    postalCode: user?.address?.postalCode || ''
  });

  // Get orders from localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('fashionx_orders') || '[]');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = await login(authForm.email, authForm.password);
      if (success) {
        setAuthForm({ name: '', email: '', password: '' });
      }
    } else {
      if (!authForm.name || !authForm.email || !authForm.password) {
        toast({
          title: 'Data Tidak Lengkap',
          description: 'Mohon isi semua field',
          variant: 'destructive'
        });
        return;
      }
      const success = await register(authForm.name, authForm.email, authForm.password);
      if (success) {
        setAuthForm({ name: '', email: '', password: '' });
      }
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      address: {
        street: profileForm.street,
        city: profileForm.city,
        province: profileForm.province,
        postalCode: profileForm.postalCode
      }
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-md mx-auto">
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-blue mx-auto mb-4 flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <h1 className="font-display text-2xl font-bold">
                  {isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
                </h1>
                <p className="text-muted-foreground text-sm mt-2">
                  {isLogin
                    ? 'Masuk untuk melihat pesanan dan kelola akun'
                    : 'Buat akun untuk mulai berbelanja'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full btn-primary h-12">
                  {isLogin ? 'Masuk' : 'Daftar'}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Daftar' : 'Masuk'}
                </button>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">{user?.name}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Pesanan</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Pengaturan</span>
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <h2 className="font-display text-xl font-semibold">Riwayat Pesanan</h2>
              
              {orders.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Belum ada pesanan</p>
                  <Button asChild>
                    <Link to="/products">Mulai Belanja</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="glass-card p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(new Date(order.createdAt))}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-neon-success/20 text-neon-success text-sm font-medium">
                            {order.status === 'confirmed' ? 'Dikonfirmasi' : order.status}
                          </span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Detail
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Detail Pesanan #{order.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex gap-3">
                                    <img src={item.image} alt="" className="w-16 h-20 rounded object-cover" />
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">{item.size} / {item.color}</p>
                                      <p className="text-sm">{item.quantity} x {formatCurrency(item.price)}</p>
                                    </div>
                                  </div>
                                ))}
                                <div className="border-t pt-4 space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(order.subtotal)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Ongkir</span>
                                    <span>{order.shipping === 0 ? 'Gratis' : formatCurrency(order.shipping)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Pajak</span>
                                    <span>{formatCurrency(order.tax)}</span>
                                  </div>
                                  <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{formatCurrency(order.total)}</span>
                                  </div>
                                </div>
                                <Button asChild className="w-full">
                                  <Link to={`/invoice/${order.id}`}>Lihat Invoice</Link>
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {order.items.slice(0, 4).map((item, idx) => (
                          <div key={idx} className="w-16 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-16 h-20 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                            <span className="text-sm text-muted-foreground">+{order.items.length - 4}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">{order.items.length} item</span>
                        <span className="font-semibold">{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <h2 className="font-display text-xl font-semibold mb-4">Wishlist</h2>
              <div className="glass-card p-8 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Wishlist kosong</p>
                <Button asChild>
                  <Link to="/products">Jelajahi Produk</Link>
                </Button>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <h2 className="font-display text-xl font-semibold mb-4">Pengaturan Akun</h2>
              
              <form onSubmit={handleUpdateProfile} className="glass-card p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileName">Nama Lengkap</Label>
                    <Input
                      id="profileName"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input id="profileEmail" value={profileForm.email} disabled className="opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profilePhone">Telepon</Label>
                    <Input
                      id="profilePhone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Alamat Pengiriman</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Alamat</Label>
                      <Input
                        id="street"
                        value={profileForm.street}
                        onChange={(e) => setProfileForm({ ...profileForm, street: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Provinsi</Label>
                      <Input
                        id="province"
                        value={profileForm.province}
                        onChange={(e) => setProfileForm({ ...profileForm, province: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        value={profileForm.postalCode}
                        onChange={(e) => setProfileForm({ ...profileForm, postalCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="btn-primary">
                  Simpan Perubahan
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
