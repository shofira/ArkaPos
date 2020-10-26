<template>
  <div class="home">
    <Header type="Users" />
    <div class="content">
      <Sidebar />
      <main>
        <div class="container">
          <b-card title="List Users" class="chart mt-5 mb-5">
            <b-table responsive :items="items" :fields="fields" class="mt-5"></b-table>
          </b-card>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default {
  name: 'Users',
  data () {
    return {
      fields: ['Invoice', 'Cashier', 'Date', 'Orders', 'Amount'],
      items: [
        { Invoice: '#0001', Cashier: 'Budi', Date: '02-09-2020', Orders: 'Chicken Teriyaki', Amount: '70000' },
        { Invoice: '#0001', Cashier: 'Budi', Date: '02-09-2020', Orders: 'Chicken Teriyaki', Amount: '70000' },
        { Invoice: '#0001', Cashier: 'Budi', Date: '02-09-2020', Orders: 'Chicken Teriyaki', Amount: '70000' }
      ],
      history: []
    }
  },
  components: {
    Header,
    Sidebar
  }
}
</script>

<style scoped>
main {
  flex: 3;
}
.chart {
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
@media (min-width: 768px) {
  .content {
    display: flex;
    justify-content: space-between;
  }
}
@media (max-width: 576px) {
  main {
    text-align: center;
  }
}
</style>
