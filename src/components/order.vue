<template>
    <div class="book-order">
        <div class="row col-md-12">
              <el-table
                    :data="orders"
                    style="width: 100%">
                    <el-table-column type="expand">
                      <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="订单ID">
                            <span>{{ props.row.order_id }}</span>
                          </el-form-item>
                          <el-form-item label="支付金额">
                            <span>{{ props.row.pay_money}}</span>
                          </el-form-item>
                          <el-form-item label="下单时间">
                            <span>{{ props.row.create_time | timePraseDate }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="订单ID"
                      prop="order_id">
                    </el-table-column>
                    <el-table-column
                      label="支付金额"
                      prop="pay_money">
                    </el-table-column>
                    <el-table-column
                      label="下单时间"
                      prop="create_time">
                    </el-table-column>
                  </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'order',
        computed: {
            orders(){
                return this.$store.getters.getOrders
            }
        },
        mounted(){
            var _this = this;
            if(localStorage.isLogin) {
                _this.$store.dispatch('getOrdersAction')
                    .then(function(data){
                        _this.$store.commit('getOrdersMutation', data)
                    })
                    .catch(function(e){
                        _this.$notify({
                            title: '失败',
                            message: e.message || '请求失败',
                            type: 'error',
                            duration: 3000,
                        })
                    })
            } else {
                _this.$notify({
                    title: '失败',
                    message: '请先登录',
                    type: 'error',
                    duration: 3000,
                })
            }
        }
    }
</script>
