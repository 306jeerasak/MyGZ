import React, { useState } from 'react';
import ProductList from './ProductList';
import image1 from './images/G.png';



function App() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const shippingFee = 100;
  

  const products = [
    { id: 1, name: '(ฟอย)บลาสเตอร์ดาร์คทั้งหมด 4 ใบ', price: 120 , imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7qukw-leslsptvd5ox07.webp' },
    { id: 2, name: 'มาเจสตี้ ลอร์ด บลาสเตอร์ ฟอย จำนวน 4 ใบ', price: 140, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7qukw-leslsptv8xzl8b@resize_w450_nl.webp' },
    { id: 4, name: 'วิงกัล เบรฟ ฟอย ', price: 120, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7qul2-lhgadmc9fhr7ce@resize_w450_nl.webp' },
    { id: 5, name: 'รีเพลนิช เมจ V-PR/0541 ฟอย รอยัล พาลาดิน', price: 120, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7r992-lym19uby9295b5.webp' },
    { id: 6, name: 'ไมเดน ออฟ เนเพนทิส', price: 120, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7qul5-lgwgi7esyeb8be.webp' },
    { id: 7, name: 'V-PR(การ์ดจากงานแข่ง) ฟอย ดราโกนิค โอเวอร์ลอร์ด เดอะ เทิร์นอะเบาท์ Vanguard แคลน คาเงโร่', price: 150, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7r990-ln51q443t8k320.webp' },
    { id: 8, name: 'สตีมเมเดน ริบบุล(ฟอย texture foil (มีเคลือบนูนพิเศษ) ) เกียร์โครนิเคล V-PR', price: 180, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7qul1-lgwgi7esvl6c6d.webp' },
    { id: 9, name: 'โล่ประกายแสง อิโซลเด้ v-bt01/015th vanguard แวนการ์ด', price: 120, imageUrl: 'https://down-th.img.susercontent.com/file/sg-11134201-22100-1g8qki46y9hvbb.webp' },
    { id: 10, name: 'V-PR (ฟอย) เพอร์ซูท แอสซอลท์ vanguard อควอฟอร์ซ ', price: 120, imageUrl: 'https://down-th.img.susercontent.com/file/th-11134207-7r98x-lrgmh0zx98l904@resize_w450_nl.webp' },
  ];
  

  const couponCodes = {
    'DISCOUNT10': 10,
    'DISCOUNT20': 20,
    // เพิ่มคูปองเพิ่มเติมที่นี่
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    ));
  };

  const applyCoupon = () => {
    if (couponCodes[coupon]) {
      setDiscount(couponCodes[coupon]);
    } else {
      setDiscount(0);
      alert('คูปองไม่ถูกต้อง');
    }
    setCoupon('');
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalAfterDiscount = subtotal - (subtotal * discount / 100);
    return totalAfterDiscount + (cart.length > 0 ? shippingFee : 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('กรุณาเพิ่มสินค้าในตะกร้าก่อนทำการชำระเงิน'); // Alert if cart is empty
    } else {
      // Proceed to payment logic here
      alert(`Total amount to pay: ${calculateTotal()} บาท`); // Example action
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold my-8 text-center">MyGZ</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Sidebar: Shopping Cart */}
          <div className="col-span-1 bg-white p-4 shadow-lg rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">ตะกร้าสินค้า</h2>
            </div>

            {cart.length > 0 && (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="border-b py-2">
                      <div className="flex justify-between items-center">
                        <span>{item.name} - {item.price} บาท x {item.quantity}</span>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="bg-red-500 text-white px-2 py-1 rounded-md">-</button>
                          <button onClick={() => updateQuantity(item.id, 1)} className="bg-green-500 text-white px-2 py-1 rounded-md">+</button>
                          <button onClick={() => removeFromCart(item.id)} className="bg-gray-500 text-white px-2 py-1 rounded-md">ลบ</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Coupon Section */}
                <div className="mt-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ใส่คูปอง"
                    className="border p-2 rounded-md w-full"
                  />
                  <button onClick={applyCoupon} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    ใช้คูปอง
                  </button>
                </div>

                {/* Shipping Fee and Total Price */}
                <div className="mt-4">
                  <h2 className="text-xl">ค่าขนส่ง: {shippingFee} บาท</h2>
                  <h2 className="text-xl font-bold mt-4">ราคารวม: {calculateTotal()} บาท</h2>
                  <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    ชำระเงิน
                  </button>
                </div>
              </>
            )}
            <h2>รายการสินค้า</h2>
          </div>

          {/* Product List */}
          <div className="col-span-2">
            <ProductList products={products} addToCart={addToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;