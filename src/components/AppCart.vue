<template>
    <div class="cart">
        <div v-if="addedParts.length > 0">
            <h4>Добавленные детали</h4>
            <div v-for="(part, i) in addedParts" :key="i" class="cart__item">
                <div class="cart__part_code">{{i+1}}. {{part.name}}</div>
                <span class="cart__part_remove" @click="del(part.code)">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                        <path d="M1064.4,193l2.32,2.315a0.987,0.987,0,0,1,0,1.4,1,1,0,0,1-1.41,0L1063,194.4l-2.31,2.315a1,1,0,0,1-1.41,0,0.987,0.987,0,0,1,0-1.4L1061.6,193l-2.32-2.314a0.989,0.989,0,0,1,0-1.4,1,1,0,0,1,1.41,0l2.31,2.315,2.31-2.315a1,1,0,0,1,1.41,0,0.989,0.989,0,0,1,0,1.4Z" transform="translate(-1059 -189)"></path>
                    </svg>
                </span>
            </div>
            <h5>Информация для связи</h5>
            <app-field v-for="(field, i) in formFields"
                :key="field.name+i"
                :name="field.name"
                :value="field.value"
                :label="field.label"
                :required="field.required"
                :placeholder="field.placeholder"
                :valid="field.valid"
                @input="onInput(i, $event)"
            ></app-field>

            <button type="button" class="btn btn-default btn-cart" @click="sendForm" :disabled="!fieldsIsValid">Заказать</button>
        </div>
        <div v-else-if="orderSuccess">
            <h4>Ваш заказ успешно отправлен!</h4>
            <p v-if="orderedParts.length > 1">Запчасти:</p><p v-else>Запчасть:</p>
                <ul v-for="part in orderedParts" :key="part.code">
                    <li>{{part.code}} - {{part.name}}</li>
                </ul>    
            <h5>Менеджер свяжется с Вами в ближайшее время по указанным контактным данным:</h5>
            <div v-for="field in formFields" :key="field.name">
                <p v-show="field.value">{{field.label}}: {{field.value}}</p>
            </div>
        </div>
        <div v-else class="cart__start_text">
            <p v-if="showCart">Выберите запчасти и оформите заявку</p>
            <p v-else>Введите VIN и нажмите кнопку поиска. Регистр символов не важен.</p>
        </div>
    </div>
</template>
<script>
import AppField from '@/components/AppField.vue'
export default {
    name: 'AppCart',
    components: {
        AppField,
    },
    props: {
        addedParts: {
            type: Array
        },
        vin: '',
        showCart: Boolean,
        orderSuccess: Boolean
    },
    emits:{
        del: null,
        sendForm: null
    },
    data: () => ({
        formFields: [
            {
                name: 'NAME',
                value: '',
                placeholder: 'Имя',
                label: 'Имя',
                pattern: /^[ЁёА-я\w\d\s-]{2,30}$/,
                required: true,
            },
            {
                name: 'PHONE',
                value: '',
                placeholder: '+7 (999) 999-99-99',
                label: 'Телефон',
                pattern: /^\+?\d{1,3}\s?-?\(?\d{3}\)?-?\s?\d{3}(-?\d{2}){2}$/,
                required: true,
            },
            {
                name: 'EMAIL',
                value: '',
                placeholder: 'your@mail.ru',
                label: 'E-mail',
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                required: false,
            },
        ],
        orderedParts: [],
    }),
    emits: {
        
    },
    computed: {
         fieldsIsValid(){
            //  let result = true;
            //  for (const field of this.formFields) {
            //      result &&= field.pattern.test(field.value);
            //  }
            //  return result;
            return this.formFields.reduce((t, field) => {
                if (field.required) {
                    t &&= field.valid;
                }
                return t;
                }, true);
         },
    },
    created() {
        return this.formFields.forEach(field => {
            this.$set(field, 'valid', field.pattern.test(field.value))
        });
    },
    methods: {
        onInput(i, e){
            let field = this.formFields[i];
            field.value = e.value.trim();
            field.valid = (field.pattern.test(field.value));
        },
        isVal(i){
            // this.formFields[i].value += e.data;
            this.formFields[i].valid = this.formFields[i].pattern.test(this.formFields[i].value);
        },
        del(code){
            this.$emit('del', {code: code});
        },
        sendForm(){
            // this.formFields.forEach(field => {console.log(field.name, field.value)});
            // this.addedParts.forEach(part => {console.log(part.name, part.code)});

            let formData = new FormData();
            this.formFields.forEach(field => {formData.append(field.name, field.value)});
            let partString = this.addedParts.reduce((total, part) => {
                return total + (part.code +' - '+ part.name+'\n')
                }, '');
            formData.set('vin', this.vin);
            formData.set('parts', partString);

            this.orderedParts = this.addedParts;
            
            this.$emit('send', {formData: formData});
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
    align-items: center;
    border-bottom: 1px solid #eee;
}
.btn-cart{
    margin-top: 20px;
}
.cart__part_code{
    width: calc(100% - 36px);
    text-align: left;
    padding: 5px 0px;
}
.cart__part_remove {
    position: relative;
    width: 36px;
    height: 36px;
    cursor: pointer;
}
.cart__start_text{
    min-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>