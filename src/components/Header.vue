<template>
    <div>
        <div class="header">
            <div class="left">
                <h1>Welcome to My Easyfairs</h1>
            </div>

            <div class="right">

                <stepper v-if="displayStepper"></stepper>
                <img v-else src="static/step_0_image.png" alt="Easyfairs">
            </div>


        </div>
    </div>
</template>


<script>
    import Stepper from '@/components/Stepper'
    export default {
        name: 'wex-header',
        props: ['displayStepper'],
        components: {Stepper}
    }
</script>


<style scoped>
    .header{
        display: flex;
        justify-content: space-between;
        align-items:  center;

        border-bottom: 1px solid #D5DDE1;
        padding:10px 60px 0;
        background-color: #fff;
    }
</style>
