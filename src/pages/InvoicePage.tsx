import { useParams, Link } from 'react-router-dom';
import { Download, CheckCircle, Home, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatCurrency, formatDate } from '@/lib/utils/helpers';
import { verifyInvoice, hillDecrypt } from '@/lib/crypto/hillCipher';
import { APP_NAME } from '@/data/constants';

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
    paymentMethod: string;
  };
  status: string;
  createdAt: number;
}

export default function InvoicePage() {
  const { invoiceId } = useParams<{ invoiceId: string }>();

  // Find order in localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('fashionx_orders') || '[]');
  const order = orders.find(o => o.id === invoiceId);

  // Verify invoice authenticity using Hill Cipher
  const isValidInvoice = invoiceId ? verifyInvoice(invoiceId) : false;

  if (!order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Invoice Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-8">
            Invoice dengan nomor {invoiceId} tidak ditemukan dalam sistem.
          </p>
          <Button asChild>
            <Link to="/">Kembali ke Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Success Banner */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="glass-card p-8 text-center border-neon-success/30 bg-neon-success/5">
            <div className="w-16 h-16 rounded-full bg-neon-success/20 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-neon-success" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Pembayaran Berhasil!
            </h1>
            <p className="text-muted-foreground">
              Terima kasih telah berbelanja di {APP_NAME}. Pesanan Anda sedang diproses.
            </p>
          </div>
        </div>

        {/* Invoice */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-6 md:p-8 print:shadow-none print:border-0" id="invoice">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
              <div>
                <h2 className="font-display text-2xl font-bold text-gradient">{APP_NAME}</h2>
                <p className="text-sm text-muted-foreground mt-1">Invoice</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-muted-foreground">Invoice No:</p>
                <p className="font-mono font-bold">{order.id}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isValidInvoice ? (
                    <span className="text-neon-success">✓ Terverifikasi</span>
                  ) : (
                    <span className="text-destructive">✗ Tidak Valid</span>
                  )}
                </p>
              </div>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Dikirim Kepada:</p>
                <p className="font-medium">{order.shippingInfo.name}</p>
                <p className="text-sm text-muted-foreground">{order.shippingInfo.email}</p>
                <p className="text-sm text-muted-foreground">{order.shippingInfo.phone}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {order.shippingInfo.address}<br />
                  {order.shippingInfo.city}, {order.shippingInfo.province} {order.shippingInfo.postalCode}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-muted-foreground mb-2">Tanggal Pesanan:</p>
                <p className="font-medium">{formatDate(new Date(order.createdAt))}</p>
                <p className="text-sm text-muted-foreground mt-4 mb-2">Status:</p>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neon-success/20 text-neon-success text-sm font-medium">
                  <Package className="h-4 w-4" />
                  Dikonfirmasi
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="mb-8">
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground pb-3 border-b border-border">
                <div className="col-span-6">Produk</div>
                <div className="col-span-2 text-center">Harga</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {order.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 py-4 border-b border-border/50 items-center">
                  <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.size} / {item.color}</p>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-2 text-center">
                    <span className="md:hidden text-xs text-muted-foreground">Harga: </span>
                    {formatCurrency(item.price)}
                  </div>
                  <div className="col-span-4 md:col-span-2 text-center">
                    <span className="md:hidden text-xs text-muted-foreground">Qty: </span>
                    {item.quantity}
                  </div>
                  <div className="col-span-4 md:col-span-2 text-right font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full md:w-72 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ongkos Kirim</span>
                  <span className={order.shipping === 0 ? 'text-neon-success' : ''}>
                    {order.shipping === 0 ? 'GRATIS' : formatCurrency(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pajak (PPN 11%)</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gradient">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Encryption Info */}
            <div className="mt-8 p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">
                <strong>Keamanan:</strong> Invoice ini diamankan menggunakan Hill Cipher encryption. 
                Nomor invoice terenkripsi untuk memastikan keaslian dan mencegah pemalsuan.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
            <Button onClick={handlePrint} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Cetak / Unduh
            </Button>
            <Button asChild className="flex-1">
              <Link to="/profile">
                <Package className="h-4 w-4 mr-2" />
                Lihat Pesanan Saya
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice, #invoice * { visibility: visible; }
          #invoice { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
