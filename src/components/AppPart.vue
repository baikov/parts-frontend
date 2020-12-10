<template>
    <div class="part">
        <!-- <img src="image" alt="" width="50px"> -->
        <div class="part-cell code"><span class="label label-info">{{ code }}</span></div>
        <div class="part-cell name">{{ name }}</div> 
        <div class="part-cell count">{{ count }} {{ unit }}</div>
        <div class="part-cell add"><button type="button" class="btn btn-transparent btn-xs"><i class="fa fa-cart"></i></button></div>
    </div>
</template>
<script>
export default {
    name: 'AppPart',
    props: {
        name: {
            type: String,
            required: true
        },
        count: {
            type: String,
            required: true
        }, 
        code: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        image: ''
    },
    emits: {
        addToCart: null,
    },
}
</script>

<style scoped>
.part{
    display: flex;
    justify-content: space-between;
}
.part-cell{
    padding: 10px;
}
.part-cell.name{
    flex-grow: 1;
    text-align: left;
}
</style>