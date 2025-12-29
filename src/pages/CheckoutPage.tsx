import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { formatCurrency } from '@/lib/utils/helpers';
import { generateOTP, verifyOTP } from '@/lib/crypto/otp';
import { generateEncryptedInvoice } from '@/lib/crypto/hillCipher';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST, TAX_RATE, PAYMENT_METHODS } from '@/data/constants';
import { toast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useUser();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    province: user?.address?.province || '',
    postalCode: user?.address?.postalCode || '',
    paymentMethod: 'bank-transfer'
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (step === 1) {
      // Validate shipping info
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
        toast({
          title: 'Data Tidak Lengkap',
          description: 'Mohon lengkapi semua field yang diperlukan',
          variant: 'destructive'
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Generate OTP and show modal
      const otp = generateOTP(formData.email);
      setGeneratedOTP(otp);
      setShowOTPModal(true);
      toast({
        title: 'Kode OTP Terkirim',
        description: `Kode OTP: ${otp} (simulasi - biasanya dikirim via SMS/Email)`
      });
    }
  };

  const handleVerifyOTP = async () => {
    if (!verifyOTP(formData.email, otpValue)) {
      toast({
        title: 'OTP Tidak Valid',
        description: 'Kode OTP yang dimasukkan salah atau sudah kadaluarsa',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    setShowOTPModal(false);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate encrypted invoice number
    const invoiceNumber = generateEncryptedInvoice();

    // Save order to localStorage
    const order = {
      id: invoiceNumber,
      items: items.map(i => ({
        productId: i.productId,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
        image: i.product.images[0]
      })),
      subtotal,
      shipping,
      tax,
      total,
      shippingInfo: formData,
      paymentMethod: formData.paymentMethod,
      status: 'confirmed',
      createdAt: Date.now()
    };

    const orders = JSON.parse(localStorage.getItem('fashionx_orders') || '[]');
    orders.push(order);
    localStorage.setItem('fashionx_orders', JSON.stringify(orders));

    // Clear cart
    clearCart();

    // Navigate to invoice
    navigate(`/invoice/${invoiceNumber}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Keranjang Kosong</h1>
          <Button asChild>
            <Link to="/products">Mulai Belanja</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Back Button */}
        <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Keranjang
        </Link>

        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
              1
            </div>
            <span className="hidden sm:inline">Pengiriman</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
              2
            </div>
            <span className="hidden sm:inline">Pembayaran</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="hidden sm:inline">Konfirmasi</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="h-5 w-5" />
                    <h2 className="font-display text-xl font-semibold">Informasi Pengiriman</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="08123456789"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Alamat Lengkap *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Jl. Contoh No. 123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Jakarta"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Provinsi</Label>
                      <Input
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        placeholder="DKI Jakarta"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Kode Pos</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-5 w-5" />
                    <h2 className="font-display text-xl font-semibold">Metode Pembayaran</h2>
                  </div>

                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                    className="space-y-3"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={method.id} />
                        <span className="font-medium">{method.name}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary">
                  <ShieldCheck className="h-5 w-5 text-neon-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Transaksi Aman</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pembayaran Anda dienkripsi menggunakan teknologi keamanan tingkat tinggi.
                      OTP akan dikirim untuk verifikasi tambahan.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Kembali
                </Button>
              )}
              <Button className="btn-primary flex-1" onClick={handleContinue}>
                {step === 2 ? 'Bayar Sekarang' : 'Lanjutkan'}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-6">Ringkasan Pesanan</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size} / {item.color}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border mb-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ongkos Kirim</span>
                  <span className={shipping === 0 ? 'text-neon-success' : ''}>
                    {shipping === 0 ? 'GRATIS' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pajak (PPN 11%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* OTP Modal */}
      <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Verifikasi OTP</DialogTitle>
            <DialogDescription className="text-center">
              Masukkan kode 6 digit yang dikirim ke email Anda untuk mengkonfirmasi pembayaran.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-4">
            <InputOTP
              value={otpValue}
              onChange={setOtpValue}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-xs text-muted-foreground">
              Demo OTP: <span className="font-mono font-bold">{generatedOTP}</span>
            </p>

            <Button
              className="w-full btn-primary"
              onClick={handleVerifyOTP}
              disabled={otpValue.length !== 6 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Konfirmasi Pembayaran'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
