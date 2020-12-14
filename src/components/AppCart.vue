<template>
    <div class="cart">
        <div v-if="addedParts.length > 0">
            <h4>Добавленные детали</h4>
            <div v-for="(part, i) in addedParts" :key="i" class="cart__item">
                <div class="cart__part_code">{{i+1}}. {{part.code}}</div>
                <button type="button" class="btn btn-transparent btn-xs" @click="del(part.code)">
                    -
                </button>
            </div>
            <button type="button" class="btn btn-default btn-xs btn-cart">Заказать</button>
        </div>
        <div v-else>
            <p v-if="showCart">Выберите запчасти и оформите заявку</p>
            <p v-else>Введите VIN и нажмите кнопку поиска. Регистр символов не важен.</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppCart',
    props: {
        addedParts: {
            type: Array
        },
        vin: '',
        showCart: Boolean
    },
    emits:{
        del: null,
    },
    data: () => ({
        
    }),
    emits: {
        
    },
    computed: {
        
    },
    created() {
        
    },
    methods: {
        del(code){
            this.$emit('del', {code: code});
        }
    }
}
</script>

<style scoped>
.cart {
    padding: 20px;
    border: 1px solid #03326C;
    margin: 0px 20px 0px 0px;
    height: fit-content;
}
.cart__item{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
}
.btn-cart{
    margin-top: 20px;
    width: 100%;
}
</style>