<template>
    <div class="form-group animated-labels">
        <!-- <label :for="'POPUP_'+name" :class="setCls">{{label}}</label>-->
        <span v-if="required" class="required-star">*</span>
        <div class="input">
            <input type="text" class="form-control" :class="valid ? 'valid' : ''"
                :id="'POPUP_'+name"
                :name="name"
                :value="value"
                :placeholder="placeholder"
                @input="onInput"
            >
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppField',
    // components: {
    //     'v-icon': Icon
    // },
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            required: true
        },
        value: {
            type: String,
        }, 
        valid: {
            type: Boolean,
        }
    },
    emits: {
        input: null,
    },
    computed: {

    },
    methods: {
        onInput({target: {value}}){
            this.$emit('input', {value: value,});
        },
    },
}
</script>

<style>
    .form-group{
        position: relative;
    }
    .required-star {
        position: absolute;
        top: 12px;
        right: 14px;
        color: red;
    }
    .text-success{
        color: #1c8b12;
    }
    .text-danger{
        color: #b31c11;
    }
    .form-control.valid {
        border-bottom: 1px solid #1c8b12 !important;
    }
    .icon-enter-active{
        animation: iconIn 0.3s;
    }
    .icon-leave-active{
        animation: iconOut 0.3s;
    }
    .icon-appear-active{
        animation: iconFade 0.3s;
    }
</style>