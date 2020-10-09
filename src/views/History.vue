<template>
  <div class="home">
    <Header type="history" />
    <div class="content">
      <Sidebar />
      <main>
        <div class="container">
          <!-- Card Info -->
          <b-card-group deck class="mt-5">
            <b-card class="card-left">
              <p>
                <b>Today's Income</b>
              </p>
              <h4 class="card-title">Rp. 1.000.000</h4>
              <p class="card-text">+2% Yesterday</p>
              <div class="ellipse ellipse-satu"></div>
              <div class="ellipse ellipse-dua"></div>
              <div class="ellipse ellipse-tiga"></div>
            </b-card>
            <b-card class="card-middle">
              <p>
                <b>Orders</b>
              </p>
              <h4 class="card-title">3.270</h4>
              <p class="card-text">+5% Last Week</p>
              <div class="ellipse ellipse-satu"></div>
              <div class="ellipse ellipse-dua"></div>
              <div class="ellipse ellipse-tiga"></div>
            </b-card>
            <b-card class="card-right">
              <p>
                <b>This Yesterday's Income</b>
              </p>
              <h4 class="card-title">Rp. 100.000.000.000</h4>
              <p class="card-text">+10% Last Year</p>
              <div class="ellipse ellipse-satu"></div>
              <div class="ellipse ellipse-dua"></div>
              <div class="ellipse ellipse-tiga"></div>
            </b-card>
          </b-card-group>

          <!-- Chart -->
          <b-card title="Revenue" class="chart mt-5">
            <canvas id="myChart"></canvas>
          </b-card>

          <!-- Table -->
          <b-card title="Recent Order" class="chart mt-5 mb-5">
            <b-table responsive :items="items" :fields="fields" class="mt-4"></b-table>
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
  name: 'History',
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
.card-left {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}
.card-middle {
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}
.card-right {
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}
.chart {
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.ellipse {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background: rgba(253, 211, 228, 0.3);
}
.ellipse-satu {
  left: 50%;
  top: 40px;
}
.ellipse-dua {
  left: 60%;
  top: 25px;
}
.ellipse-tiga {
  left: 70%;
  top: 10px;
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
