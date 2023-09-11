const payBtn = document.querySelector('.btn-buy');

payBtn.addEventListener('click', ()=>{
     // Kiểm tra xem localStorage có giỏ hàng hay không
     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    
     if (!cartItems || cartItems.length === 0) {
         alert('Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
         return; // Không gửi yêu cầu nếu giỏ hàng trống
     }
    fetch('/stripe-checkout',{
        method:'post',
        headers: new Headers({'Content-Type': 'application/Json'}),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cartItems')),
        }),
    })
    .then((res)=>res.json())
    .then((url)=>{
        location.href=url;
        clearCart();
    })
    .catch((err)=> console.log(err));
});
