<template>
    <div>
        <Item :fatherName="t"></Item>
    </div>
</template>
<script>
import Item from '../item.vue';
export default {
    data(){
        return{
            t:'topic'
        }
    },
    components:{
        Item
    }
}
</script>
<style>
    
</style>