export const db = {
  rooms: [
    { id:'r1', name:'Standard Room', number:'101', type:'Standard', capacity:2, price:1500, available:true, status:'ACTIVE', description:'Cozy room with garden view.', amenities:['Air conditioning','Wi-Fi','TV','Private bathroom'] },
    { id:'r2', name:'Deluxe Room', number:'201', type:'Deluxe', capacity:3, price:2500, available:true, status:'ACTIVE', description:'Spacious room with a balcony and sea view.', amenities:['Air conditioning','Wi-Fi','TV','Private bathroom','Breakfast available'] },
    { id:'r3', name:'Family Suite', number:'301', type:'Suite', capacity:5, price:4200, available:true, status:'ACTIVE', description:'Two bedrooms and a living area for families.', amenities:['Air conditioning','Wi-Fi','TV','Kitchenette','Breakfast available'] },
    { id:'r4', name:'Ocean Villa', number:'401', type:'Villa', capacity:4, price:6500, available:false, status:'ACTIVE', description:'Private villa steps from the beach.', amenities:['Air conditioning','Wi-Fi','Private pool'] },
  ],
  addons: [
    { id:'a1', name:'Breakfast', category:'Food', description:'Continental breakfast', price:250, stock:40, min:10 },
    { id:'a2', name:'Dinner', category:'Food', description:'Three-course dinner', price:450, stock:6, min:10 },
    { id:'a3', name:'Coffee', category:'Drinks', description:'Brewed coffee', price:90, stock:0, min:10 },
    { id:'a4', name:'Soft drinks', category:'Drinks', description:'Assorted cans', price:60, stock:50, min:10 },
    { id:'a5', name:'Family package', category:'Bundles', description:'Breakfast + dinner for 4', price:1500, stock:12, min:5 },
  ],
  bookings: [
    { id:'BK-1001', userId:'u1', customer:'Maria Santos', roomId:'r2', room:'Deluxe Room', checkIn:'2026-10-12', checkOut:'2026-10-14', guests:2, type:'Online', method:'Online', total:5000, paid:2500, paymentStatus:'Partially Paid', status:'Confirmed', created:'2026-10-01', addons:[] },
    { id:'BK-0990', userId:'u1', customer:'Maria Santos', roomId:'r1', room:'Standard Room', checkIn:'2026-08-02', checkOut:'2026-08-04', guests:2, type:'Online', method:'Cash', total:3000, paid:3000, paymentStatus:'Paid', status:'Completed', created:'2026-07-20', addons:[{name:'Breakfast',qty:2,price:250}] },
    { id:'BK-1002', userId:'u2', customer:'Juan Dela Cruz', roomId:'r3', room:'Family Suite', checkIn:'2026-10-05', checkOut:'2026-10-07', guests:4, type:'Walk-in', method:'Cash', total:8400, paid:0, paymentStatus:'Pending', status:'Pending', created:'2026-10-02', addons:[] },
  ],
  payments: [
    { id:'PAY-1', bookingId:'BK-1001', customer:'Maria Santos', amount:2500, method:'Online', type:'Down Payment', proof:'receipt-1001.jpg', status:'Pending Verification', date:'2026-10-01' },
  ],
  users: [
    { id:'u1', name:'Maria Santos', email:'maria@example.com', phone:'0917 000 1111', role:'USER', active:true, created:'2026-06-01' },
    { id:'u2', name:'Juan Dela Cruz', email:'juan@example.com', phone:'0917 000 2222', role:'USER', active:true, created:'2026-07-15' },
  ],
}
