const orders = [
  {order_id:1,product_category:'Electronics',region:'North',order_date:'2025-01-10',total_amount:1200,quantity:2},
  {order_id:2,product_category:'Clothing',region:'South',order_date:'2025-01-12',total_amount:450,quantity:1},
  {order_id:3,product_category:'Electronics',region:'East',order_date:'2025-02-03',total_amount:2200,quantity:5},
  {order_id:4,product_category:'Books',region:'West',order_date:'2025-02-20',total_amount:120,quantity:3},
  {order_id:5,product_category:'Clothing',region:'North',order_date:'2025-03-11',total_amount:980,quantity:2},
  {order_id:6,product_category:'Electronics',region:'South',order_date:'2025-03-15',total_amount:3300,quantity:7}
]

const customers = [
  {customer_id:1,name:'Alice',country:'USA',lifetime_value:1200},
  {customer_id:2,name:'Bob',country:'Canada',lifetime_value:980},
  {customer_id:3,name:'Celine',country:'USA',lifetime_value:450},
  {customer_id:4,name:'David',country:'UK',lifetime_value:2200}
]

export default {orders, customers}
