<template>
    <div class="lead">
        <h2>{{title}}</h2>
        <p>{{text}}</p>
    </div>
</template>


<script>
    export default {
        props: ['title', 'text']
    }
</script>

<style scoped>
    .lead{
        margin-bottom: 36px;
        margin-top: 36px;
        font-size:19px;
        line-height: 30px;
    }
</style>

