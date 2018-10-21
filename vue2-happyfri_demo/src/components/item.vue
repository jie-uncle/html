<template>
    <div class="max_box">
        <div class="hint">
            <span v-if="fatherName == h" v-text="level"></span>
            <span v-if="fatherName == t" >第一题</span>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            h:'home',
            t:'topic'
        }
    },
    props:[
        'fatherName'
    ]
}
</script>
<style>
    .max_box{
        width:100%;
        height:100%;
        background:url('../assets/1-1.jpg') no-repact ;
    }
</style>
