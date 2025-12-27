import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import { APP_NAME } from '@/data/constants';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';

export default function Navbar() {
  const location = useLocation();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const itemCount = getItemCount();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="font-display text-2xl md:text-3xl font-bold tracking-tight text-gradient"
            >
              {APP_NAME}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/') && location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive('/products') ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                Shop All
              </Link>
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hidden md:flex"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hidden md:flex"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-blue text-xs font-medium flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-muted-foreground hover:text-foreground"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80 bg-background border-border">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      Shop All
                    </Link>
                    
                    <div className="h-px bg-border" />
                    
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Categories</p>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}

                    <div className="h-px bg-border" />

                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium"
                    >
                      Wishlist
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
