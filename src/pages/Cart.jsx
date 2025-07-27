import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Button from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import Navbar from '../components/Navbar';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "سماعات لاسلكية عالية الجودة",
      price: 299.99,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      quantity: 2
    },
    {
      id: 2,
      title: "هاتف ذكي حديث",
      price: 1299.99,
      image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
      quantity: 1
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={totalItems} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 animate-fade-in hover:bg-accent transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          العودة للتسوق
        </Button>

        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8 text-center">
            سلة التسوق
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-card p-8 rounded-xl shadow-card border border-border/50 max-w-md mx-auto">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                  السلة فارغة
                </h3>
                <p className="text-muted-foreground mb-6">
                  لم تقم بإضافة أي منتجات إلى السلة بعد
                </p>
                <Button onClick={() => navigate('/')}>
                  ابدأ التسوق
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden shadow-card border border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-background to-muted/20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-lg font-bold text-primary">
                            {item.price.toFixed(2)} ج.م
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="font-medium text-foreground min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-elegant border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">
                      ملخص الطلب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>عدد المنتجات:</span>
                      <span>{totalItems}</span>
                    </div>
                    
                    <div className="flex justify-between text-muted-foreground">
                      <span>المجموع الفرعي:</span>
                      <span>{totalPrice.toFixed(2)} ج.م</span>
                    </div>
                    
                    <div className="flex justify-between text-muted-foreground">
                      <span>الشحن:</span>
                      <span>مجاني</span>
                    </div>
                    
                    <hr className="border-border" />
                    
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>الإجمالي:</span>
                      <span className="bg-gradient-primary bg-clip-text text-transparent">
                        {totalPrice.toFixed(2)} ج.م
                      </span>
                    </div>
                    
                    <Button className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg">
                      إتمام الشراء
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/')}
                    >
                      متابعة التسوق
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;