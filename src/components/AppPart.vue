<template>
    <div class="part">
        <!-- <img src="image" alt="" width="50px"> -->
        <div class="part-cell code"><span class="label label-info">{{ code }}</span></div>
        <div class="part-cell name">{{ name }}</div> 
        <!-- <div class="part-cell count">{{ count }} {{ unit }}</div> -->
        <div class="part-cell add">
            <button type="button" class="btn btn-transparent btn-xs" @click="addToCart(name, code)" :disabled="isAdded">
                <img v-if="!isAdded" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxjaXJjbGUgY3g9IjM5NC42NjciIGN5PSI0NTguNjY3IiByPSI1My4zMzMiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPGNpcmNsZSBjeD0iMTgxLjMzMyIgY3k9IjQ1OC42NjciIHI9IjUzLjMzMyIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDcxLjQ2NywyMzYuOGMtMi4xMzMsMC02LjQsMC0xMC42NjcsMi4xMzNDNDQxLjYsMjQ5LjYsNDE4LjEzMywyNTYsMzk0LjY2NywyNTZDMzE3Ljg2NywyNTYsMjU2LDE5NC4xMzMsMjU2LDExNy4zMzMNCgkJCWMwLTYuNC00LjI2Ny0xMC42NjctMTAuNjY3LTEwLjY2N0g5Nkw4NS4zMzMsNTEuMmMtMi4xMzMtNC4yNjctNi40LTguNTMzLTEwLjY2Ny04LjUzM2gtNjRDNC4yNjcsNDIuNjY3LDAsNDYuOTMzLDAsNTMuMzMzDQoJCQlDMCw1OS43MzMsNC4yNjcsNjQsMTAuNjY3LDY0aDU1LjQ2N2w1MS4yLDI2MC4yNjdDMTI1Ljg2NywzNTguNCwxNTUuNzMzLDM4NCwxOTIsMzg0aDI0NS4zMzNjNi40LDAsMTAuNjY3LTQuMjY3LDEwLjY2Ny0xMC42NjcNCgkJCWMwLTYuNC00LjI2Ny0xMC42NjctMTAuNjY3LTEwLjY2N0gxOTJjLTE3LjA2NywwLTM0LjEzMy04LjUzMy00Mi42NjctMjMuNDY3TDQ2MC44LDI5Ni41MzNjNC4yNjcsMCw4LjUzMy00LjI2Nyw4LjUzMy04LjUzMw0KCQkJbDYuNC00MC41MzNDNDc1LjczMywyNDMuMiw0NzUuNzMzLDIzOC45MzMsNDcxLjQ2NywyMzYuOHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM5NC42NjcsMGMtNjQsMC0xMTcuMzMzLDUzLjMzMy0xMTcuMzMzLDExNy4zMzNzNTMuMzMzLDExNy4zMzMsMTE3LjMzMywxMTcuMzMzUzUxMiwxODEuMzMzLDUxMiwxMTcuMzMzDQoJCQlTNDU4LjY2NywwLDM5NC42NjcsMHogTTQzNy4zMzMsMTI4aC0zMnYzMmMwLDYuNC00LjI2NywxMC42NjctMTAuNjY3LDEwLjY2N1MzODQsMTY2LjQsMzg0LDE2MHYtMzJoLTMyDQoJCQljLTYuNCwwLTEwLjY2Ny00LjI2Ny0xMC42NjctMTAuNjY3YzAtNi40LDQuMjY3LTEwLjY2NywxMC42NjctMTAuNjY3aDMydi0zMmMwLTYuNCw0LjI2Ny0xMC42NjcsMTAuNjY3LTEwLjY2Nw0KCQkJczEwLjY2Nyw0LjI2NywxMC42NjcsMTAuNjY3djMyaDMyYzYuNCwwLDEwLjY2Nyw0LjI2NywxMC42NjcsMTAuNjY3QzQ0OCwxMjMuNzMzLDQ0My43MzMsMTI4LDQzNy4zMzMsMTI4eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
                <img v-else src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zOTQuNjY3LDBjLTY0LDAtMTE3LjMzMyw1My4zMzMtMTE3LjMzMywxMTcuMzMzczUzLjMzMywxMTcuMzMzLDExNy4zMzMsMTE3LjMzM1M1MTIsMTgxLjMzMyw1MTIsMTE3LjMzMw0KCQkJUzQ1OC42NjcsMCwzOTQuNjY3LDB6IE00NjcuMiw4My4ybC04NS4zMzMsODUuMzMzYy0yLjEzMywyLjEzMy02LjQsMi4xMzMtOC41MzMsMi4xMzNjLTIuMTMzLDAtNi40LDAtOC41MzMtMi4xMzNsLTQyLjY2Ny00Mi42NjcNCgkJCWMtNC4yNjctNC4yNjctNC4yNjctMTAuNjY3LDAtMTQuOTMzczEwLjY2Ny00LjI2NywxNC45MzMsMGwzNC4xMzMsMzQuMTMzbDc2LjgtNzYuOGM0LjI2Ny00LjI2NywxMC42NjctNC4yNjcsMTQuOTMzLDANCgkJCUM0NjkuMzMzLDcwLjQsNDY5LjMzMyw3OC45MzMsNDY3LjIsODMuMnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPGNpcmNsZSBjeD0iMzk0LjY2NyIgY3k9IjQ1OC42NjciIHI9IjUzLjMzMyIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8Y2lyY2xlIGN4PSIxODEuMzMzIiBjeT0iNDU4LjY2NyIgcj0iNTMuMzMzIi8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00NzEuNDY3LDIzNi44Yy0yLjEzMywwLTYuNCwwLTEwLjY2NywyLjEzM0M0NDEuNiwyNDkuNiw0MTguMTMzLDI1NiwzOTQuNjY3LDI1NkMzMTcuODY3LDI1NiwyNTYsMTk0LjEzMywyNTYsMTE3LjMzMw0KCQkJYzAtNi40LTQuMjY3LTEwLjY2Ny0xMC42NjctMTAuNjY3SDk2TDg1LjMzMyw1MS4yYy0yLjEzMy00LjI2Ny02LjQtOC41MzMtMTAuNjY3LTguNTMzaC02NEM0LjI2Nyw0Mi42NjcsMCw0Ni45MzMsMCw1My4zMzMNCgkJCUMwLDU5LjczMyw0LjI2Nyw2NCwxMC42NjcsNjRoNTUuNDY3bDUxLjIsMjYwLjI2N0MxMjUuODY3LDM1OC40LDE1NS43MzMsMzg0LDE5MiwzODRoMjQ1LjMzM2M2LjQsMCwxMC42NjctNC4yNjcsMTAuNjY3LTEwLjY2Nw0KCQkJYzAtNi40LTQuMjY3LTEwLjY2Ny0xMC42NjctMTAuNjY3SDE5MmMtMTcuMDY3LDAtMzQuMTMzLTguNTMzLTQyLjY2Ny0yMy40NjdMNDYwLjgsMjk2LjUzM2M0LjI2NywwLDguNTMzLTQuMjY3LDguNTMzLTguNTMzDQoJCQlsNi40LTQwLjUzM0M0NzUuNzMzLDI0My4yLDQ3NS43MzMsMjM4LjkzMyw0NzEuNDY3LDIzNi44eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
            </button>
        </div>
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
        code: {
            type: String,
            required: true
        },
        image: '',
        isAdded: Boolean
    },
    data: () => ({
        added: false,
    }),
    emits: {
        click: null,
    },
    computed: {
        cartIcon(){

        }
    },
    methods: {
        addToCart(name, code){
            this.added = true;
            this.$emit('tocart', {code: code, name: name});
        }
    }
}
</script>

<style scoped>
.part{
    display: flex;
    justify-content: space-between;
}
.part-cell{
    padding: 10px;
    border-bottom: 1px #eee solid;
}
.part-cell.name{
    flex-grow: 1;
    text-align: left;
}
.add button{
    width: 30px;
    height: 30px;
    padding: 2px;
}
</style>