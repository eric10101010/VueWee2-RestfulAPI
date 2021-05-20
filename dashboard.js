
const url = 'https://vue3-course-api.hexschool.io';
const path = 'item666';

const dashBoard = {
    data: {
      products: [],
    },
     
    getData() {
      axios.get(`${url}/api/${path}/admin/products`)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.data.products = res.data.products;
            console.log(this.data.products);
            this.render();
          }
        })
    },
    
    render() {
      const productListDom = document.querySelector('#productList');
      const productCountDom=document.querySelector('#productCount');
      //渲染產品清單
      const template = this.data.products.map(item => `
        <tr>
          <td><img src="${item.imageUrl}" alt=""></td>
          <td>${item.title}</td>
          <td>${item.category}</td>
          <td>${item.origin_price}</td>
          <td>${item.price}</td>
          <td >${item.is_enabled ? '啟用' : '未啟用'}</td>
          <td><button type="button" data-id="${item.id}" class="del btn btn-outline-danger">刪除</button></td>
        </tr>
      
      `).join(''); //清除空字串
      productListDom.innerHTML = template;
      //載入當前清單產品數量
      productCountDom.innerHTML = this.data.products.length;
      //監聽刪除按鈕
      const deleteBtn = document.querySelectorAll('.del');
      deleteBtn.forEach(btn => {
        //bind參照星期二直播,但其實不知道使用時機
        btn.addEventListener('click', this.deleteProduct.bind(this));
      })
    },
    
    deleteProduct(e) {
      const id = e.target.dataset.id;
      console.log(this);
      console.log('deleteProduct', e, id);
      axios.delete(`${url}/api/${path}/admin/product/${id}`)
        .then(res => {
          console.log(res);
          this.getData();
          return alert ('成功刪除商品');
        })
    },

    created() {
      // 取Cookie
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common['Authorization'] = token;

      this.getData();
    }
  }
  dashBoard.created();