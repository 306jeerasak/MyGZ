import React from 'react';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-md overflow-hidden shadow-md">
          <img
            src={product.imageUrl} // หรือ imageUrl แทนที่ image ขึ้นอยู่กับการตั้งชื่อใน products
            alt={product.name}
            className="w-full h-48 object-cover" // ใช้ object-cover เพื่อให้ภาพไม่ผิดรูป
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.price} บาท</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              เพิ่มไปยังตะกร้า
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
